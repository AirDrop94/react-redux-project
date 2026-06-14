import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link className="product-card__link" to={`/products/${product.id}`}>
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
        />

        <div className="product-card__content">
          <p className="product-card__category">{product.category}</p>

          <h3 className="product-card__title">{product.title}</h3>

          <p className="product-card__description">{product.description}</p>

          <div className="product-card__footer">
            <p className="product-card__price">${product.price}</p>

            {product.rating && (
              <p className="product-card__rating">
                Rating: {product.rating.rate} / 5
              </p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;