import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import ProductList from "../components/products/ProductList";

const products = [
  {
    id: 1,
    title: 'Backpack',
    price: 49.99,
    category: 'bags',
    image: 'https://placehold.co/300x300?text=Backpack',
  },
  {
    id: 2,
    title: 'T-Shirt',
    price: 19.99,
    category: 'clothes',
    image: 'https://placehold.co/300x300?text=T-Shirt',
  },
  {
    id: 3,
    title: 'Sneakers',
    price: 89.99,
    category: 'shoes',
    image: 'https://placehold.co/300x300?text=Sneakers',
  },
];

function ProductsPage() {
  const isLoading = false;
  const error = null;

  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <ErrorMessage message= 'Failed to load products'/>;
  }

  return (
    <section>
      <h1>Products Page</h1>
      <p>Here we will display products from an external API.</p>

      <ProductList products={products}/>
    </section>
  );
}

export default ProductsPage;