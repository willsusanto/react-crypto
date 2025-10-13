import type Coin from "../types/Coin";

interface CoinCardProps {
  coin: Coin;
}

const CoinCard = ({ coin }: CoinCardProps) => {
  return (
    <div className="coin-card" key={coin.id}>
      <div className="coin-header">
        <img src={coin.image} alt={coin.name} className="coin-image" />
        <div>
          <h2>{coin.name}</h2>
          <p className="symbol">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>

      <p>Price: ${coin.current_price.toLocaleString()}</p>
      {coin.price_change_percentage_24h && (
        <p
          className={
            coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
          }
        >
          {coin.price_change_percentage_24h?.toFixed(2)}%
        </p>
      )}
      <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinCard;
