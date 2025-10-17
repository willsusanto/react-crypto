import CoinCard from "../components/CoinCard";
import OrderBy from "../components/OrderBy";
import PageSize from "../components/PageSize";
import SearchInput from "../components/SearchInput";
import type Coin from "../types/Coin";

interface HomePageProps {
  orderBy: string;
  setOrderBy: (e: string) => void;
  pageSize: number;
  setPageSize: (e: number) => void;
  search: string;
  setSearch: (e: string) => void;
  error: string | null;
  orderedByCoins: Coin[];
  isLoading: boolean;
}

const HomePage = ({
  orderBy,
  setOrderBy,
  pageSize,
  setPageSize,
  search,
  setSearch,
  error,
  orderedByCoins,
  isLoading,
}: HomePageProps) => {
  return (
    <>
      <h1>React Crypto</h1>

      <OrderBy orderBy={orderBy} setOrderBy={setOrderBy}></OrderBy>

      <PageSize pageSize={pageSize} setPageSize={setPageSize}></PageSize>

      <SearchInput search={search} setSearch={setSearch}></SearchInput>

      {isLoading && <h1>Loading...</h1>}
      {error && <div className="error">{error}</div>}

      {!isLoading && !error && (
        <main className="grid">
          {orderedByCoins.length > 0 ? (
            orderedByCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin}></CoinCard>
            ))
          ) : (
            <p>No matching coins!</p>
          )}
        </main>
      )}
    </>
  );
};

export default HomePage;
