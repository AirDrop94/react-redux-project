function ProductSearch({ searchValue, onSearchChange }) {
  return (
    <div className="product-search">
      <label className="product-search__label" htmlFor="product-search">
        Search products
      </label>

      <input
        className="product-search__input"
        id="product-search"
        type="text"
        placeholder="Search by product title..."
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default ProductSearch;