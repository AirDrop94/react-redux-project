import type { Product } from '../../types/product';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
};

function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;