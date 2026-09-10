import './ProductCard.css';

export default function ProductCard({ product, onViewDetails }) {
  return (
    <article className="product-card">
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
        <span className="product-tag">{product.category === 'coffee' ? 'Kafa' : 'Oprema'}</span>
      </div>
      <div className="product-info">
        {product.category === 'coffee' ? (
          <>
            <div className="product-origin">{product.origin}</div>
            <h3 className="product-title">{product.name}</h3>
            <div className="roast-meter" aria-label={`Stepen prženja ${product.roast}/5`}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '8px' }}>Prženje:</span>
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className={`fa-solid fa-seedling roast-grain ${i < product.roast ? 'active' : ''}`}></i>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="product-origin">{product.type}</div>
            <h3 className="product-title">{product.name}</h3>
            <div style={{ height: '12px', marginBottom: '12px' }}></div>
          </>
        )}
        <p className="product-desc">{product.description}</p>
        <div className="product-meta-bottom">
          <span className="product-price">{product.price.toFixed(2)} KM</span>
          <button
            className="btn btn-secondary btn-sm view-details-btn"
            onClick={() => onViewDetails(product)}
            aria-label={`Pogledaj detalje o ${product.name}`}
          >
            Detaljnije
          </button>
        </div>
      </div>
    </article>
  );
}
