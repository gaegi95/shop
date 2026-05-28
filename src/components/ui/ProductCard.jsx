import React, { useContext } from 'react';
import { DeskSetContext } from '../../context/DeskSetContext';

const ProductCard = ({ product }) => {
  const { openProductDetail } = useContext(DeskSetContext);
  
  return (
    <div className="product-card" onClick={() => openProductDetail(product.id)}>
      <div className="product-img-placeholder" style={{ background: product.color, color: 'white' }}>
        {product.emoji}
        {product.discountPercent > 0 && (
          <span className="product-badge sale">-{product.discountPercent}%</span>
        )}
      </div>
      <div className="product-card-body">
        <div className="product-brand">{product.brand}</div>
        <div className="product-name">{product.title}</div>
        <div className="product-rating">
          <span className="stars">
            {'★'.repeat(Math.round(product.rating))}
            {'☆'.repeat(5 - Math.round(product.rating))}
          </span>
          <span className="rating-num">({product.reviewCount})</span>
        </div>
        <div className="product-price-row">
          <span className="product-price">₩{product.price.toLocaleString()}</span>
          {product.discountPercent > 0 && (
            <>
              <span className="product-original">₩{product.originalPrice.toLocaleString()}</span>
              <span className="product-discount">SALE</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
