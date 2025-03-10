import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { getProductImageUrl, createImageErrorHandler } from '../../utils/imageUtils';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/products/${product.slug}`}>
          <img 
            src={getProductImageUrl(product.slug)} 
            alt={product.name} 
            loading="lazy"
            onError={createImageErrorHandler(product.category?.toLowerCase() || 'kitchen')}
          />
        </Link>
        {product.isPopular && <span className="product-badge">Popular</span>}
      </div>
      <div className="product-info">
        <h3 className="product-title">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-description">{product.description.substring(0, 80)}...</p>
        <div className="product-price">${product.price.toFixed(2)}/week</div>
        <div className="product-actions">
          <Link to={`/products/${product.slug}`} className="btn btn-outline">View Details</Link>
          <button className="btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;