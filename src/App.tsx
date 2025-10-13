import { useEffect, useState } from "react";
import type Coin from "./types/Coin";
import CoinCard from "./components/CoinCard";
import PageSize from "./components/PageSize";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);

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

      <PageSize pageSize={pageSize} setPageSize={setPageSize}></PageSize>

      {isLoading && <h1>Loading...</h1>}
      {error && <div className="error">{error}</div>}

      {!isLoading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin}></CoinCard>
          ))}
        </main>
      )}
    </>
  );
};

export default App;
