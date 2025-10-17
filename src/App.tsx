import { useEffect, useState } from "react";
import type Coin from "./types/Coin";
import CoinCard from "./components/CoinCard";
import PageSize from "./components/PageSize";
import SearchInput from "./components/SearchInput";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("priceAsc");

  const filteredCoins =
    search === "" ? coins : coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));

  const orderedByCoins = (() => {
    switch (orderBy) {
      case "priceAsc":
        return [...filteredCoins].sort((a, b) => a.current_price - b.current_price);
      case "priceDesc":
        return [...filteredCoins].sort((a, b) => b.current_price - a.current_price);
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
    <>
      <h1>React Crypto</h1>

      <div className="controls">
        <label htmlFor="ddlOrderBy">Order By:</label>
        <select id="ddlOrderBy" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="marketAsc">Market: Low to High</option>
          <option value="marketDesc">Market: High to Low</option>
        </select>
      </div>

      <PageSize pageSize={pageSize} setPageSize={setPageSize}></PageSize>

      <SearchInput search={search} setSearch={setSearch}></SearchInput>

      {isLoading && <h1>Loading...</h1>}
      {error && <div className="error">{error}</div>}

      {!isLoading && !error && (
        <main className="grid">
          {orderedByCoins.length > 0 ? orderedByCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin}></CoinCard>
          )) : <p>No matching coins!</p>}
        </main>
      )}
    </>
  );
};

export default App;
