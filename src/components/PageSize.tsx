interface PageSizeProps {
  pageSize: number;
  setPageSize: (value: number) => void;
}

const PageSize = ({ pageSize, setPageSize }: PageSizeProps) => {
  return (
    <div className="controls">
      <label htmlFor="limit">Show Items:</label>
      <select
        id="limit"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.currentTarget.value))}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

export default PageSize;
