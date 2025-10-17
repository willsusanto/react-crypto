interface SearchInputProps {
  search: string;
  setSearch: (e: string) => void;
}

const SearchInput = ({ search, setSearch }: SearchInputProps) => {
  return (
    <div className="filter">
      <input type="text" value={search}
      placeholder="Filter by coin name"
      onChange={(e) => setSearch(e.currentTarget.value)} />
    </div>
  )
}

export default SearchInput 