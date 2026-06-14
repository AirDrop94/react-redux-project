import { useSelector } from "react-redux";

import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import ProductList from "../components/products/ProductList";


function ProductsPage() {
  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const error = useSelector((state) => state.products.error);

  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section>
      <h1>Products Page</h1>
      <p>Here will display products from an external API.</p>

      <ProductList products={products}/>
    </section>
  );
}

export default ProductsPage;