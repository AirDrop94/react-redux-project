import type { ChangeEvent } from 'react';

type ProductSearchProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

function ProductSearch({
  searchValue,
  onSearchChange,
}: ProductSearchProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="product-search">
      <input
        type="search"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search products..."
      />
    </div>
  );
}

export default ProductSearch;