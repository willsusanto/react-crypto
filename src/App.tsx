import { useEffect, useState } from "react";
import type Coin from "./types/Coin";
import CoinCard from "./components/CoinCard";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCoins = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            x_cg_demo_api_key: import.meta.env.VITE_API_KEY,
          },
          signal: abortController.signal,
        });

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
  }, []);

  return (
    <>
      <h1>React Crypto</h1>
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
