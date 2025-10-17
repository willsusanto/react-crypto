import { useEffect, useState } from "react";
import type Coin from "./types/Coin";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("priceAsc");

  const filteredCoins =
    search === ""
      ? coins
      : coins.filter((coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase())
        );

  const orderedByCoins = (() => {
    switch (orderBy) {
      case "priceAsc":
        return [...filteredCoins].sort(
          (a, b) => a.current_price - b.current_price
        );
      case "priceDesc":
        return [...filteredCoins].sort(
          (a, b) => b.current_price - a.current_price
        );
      case "marketAsc":
        return [...filteredCoins].sort((a, b) => a.market_cap - b.market_cap);
      case "marketDesc":
        return [...filteredCoins].sort((a, b) => b.market_cap - a.market_cap);
      default:
        return filteredCoins;
    }
  })();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${pageSize}&page=1&sparkline=false`,
          {
            method: "GET",
            signal: abortController.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status`);
        }

        const data = await response.json();
        setCoins(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(error.message);
          console.error("Error fetching coins:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoins();

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, [pageSize]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            pageSize={pageSize}
            setPageSize={setPageSize}
            search={search}
            setSearch={setSearch}
            error={error}
            orderedByCoins={orderedByCoins}
            isLoading={isLoading}
          ></HomePage>
        }
      ></Route>
    </Routes>
  );
};

export default App;
