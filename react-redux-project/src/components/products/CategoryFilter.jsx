import { PRODUCT_CATEGORIES } from '../../constants/products';

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <button
        className={
          selectedCategory === PRODUCT_CATEGORIES.ALL
            ? 'category-filter__button category-filter__button--active'
            : 'category-filter__button'
        }
        type="button"
        onClick={() => onCategoryChange(PRODUCT_CATEGORIES.ALL)}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          className={
            selectedCategory === category
              ? 'category-filter__button category-filter__button--active'
              : 'category-filter__button'
          }
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;