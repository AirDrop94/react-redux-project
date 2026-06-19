import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import CategoryFilter from '../components/products/CategoryFilter';
import ProductList from '../components/products/ProductList';
import ProductSearch from '../components/products/ProductSearch';
import ProductSort from '../components/products/ProductSort';
import { PRODUCT_CATEGORIES } from '../constants/products';
import { SORT_OPTIONS } from '../constants/sort';
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from '../features/products/selectors';
import { fetchProducts } from '../features/products/productsThunks';

function ProductsPage() {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(
    PRODUCT_CATEGORIES.ALL,
  );
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState(SORT_OPTIONS.DEFAULT);

  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === PRODUCT_CATEGORIES.ALL ||
        product.category === selectedCategory;

      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchValue.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });

    return [...filtered].sort((firstProduct, secondProduct) => {
      switch (sortValue) {
        case SORT_OPTIONS.PRICE_ASC:
          return firstProduct.price - secondProduct.price;

        case SORT_OPTIONS.PRICE_DESC:
          return secondProduct.price - firstProduct.price;

        case SORT_OPTIONS.TITLE_ASC:
          return firstProduct.title.localeCompare(secondProduct.title);

        case SORT_OPTIONS.TITLE_DESC:
          return secondProduct.title.localeCompare(firstProduct.title);

        default:
          return 0;
      }
    });
  }, [products, selectedCategory, searchValue, sortValue]);

  const handleRetry = () => {
    dispatch(fetchProducts());
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <section>
      <h1>Products Page</h1>
      <p>Products are loaded from an external API.</p>

      {products.length > 0 ? (
        <>
          <ProductSearch
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />

          <ProductSort 
            sortValue={sortValue} 
            onSortChange={setSortValue} 
          />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {filteredProducts.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <p>No products found.</p>
          )}
        </>
      ) : (
        <p>No products found.</p>
      )}
    </section>
  );
}

export default ProductsPage;