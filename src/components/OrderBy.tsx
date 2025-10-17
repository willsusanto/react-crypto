interface OrderByProps {
  orderBy: string;
  setOrderBy: (e: string) => void;
}

const OrderBy = ({ orderBy, setOrderBy }: OrderByProps) => {
  return (
    <div className="controls">
      <label htmlFor="ddlOrderBy">Order By:</label>
      <select
        id="ddlOrderBy"
        value={orderBy}
        onChange={(e) => setOrderBy(e.target.value)}
      >
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="marketAsc">Market: Low to High</option>
        <option value="marketDesc">Market: High to Low</option>
      </select>
    </div>
  );
};

export default OrderBy;
