import type { ChangeEvent } from 'react';

import { SORT_OPTIONS, type SortOption } from '../../constants/sort';

type ProductSortProps = {
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
};

function ProductSort({ sortValue, onSortChange }: ProductSortProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortOption);
  };

  return (
    <div className="product-sort">
      <label htmlFor="product-sort">Sort by:</label>

      <select id="product-sort" value={sortValue} onChange={handleChange}>
        <option value={SORT_OPTIONS.DEFAULT}>Default</option>
        <option value={SORT_OPTIONS.PRICE_ASC}>Price: Low to High</option>
        <option value={SORT_OPTIONS.PRICE_DESC}>Price: High to Low</option>
        <option value={SORT_OPTIONS.TITLE_ASC}>Title: A-Z</option>
        <option value={SORT_OPTIONS.TITLE_DESC}>Title: Z-A</option>
      </select>
    </div>
  );
}

export default ProductSort;