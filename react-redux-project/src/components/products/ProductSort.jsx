import { SORT_OPTIONS } from '../../constants/sort';

function ProductSort({ sortValue, onSortChange }) {
  return (
    <div className="product-sort">
      <label className="product-sort__label" htmlFor="product-sort">
        Sort products
      </label>

      <select
        className="product-sort__select"
        id="product-sort"
        value={sortValue}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value={SORT_OPTIONS.DEFAULT}>Default</option>
        <option value={SORT_OPTIONS.PRICE_ASC}>Price: low to high</option>
        <option value={SORT_OPTIONS.PRICE_DESC}>Price: high to low</option>
        <option value={SORT_OPTIONS.TITLE_ASC}>Title: A-Z</option>
        <option value={SORT_OPTIONS.TITLE_DESC}>Title: Z-A</option>
      </select>
    </div>
  );
}

export default ProductSort;