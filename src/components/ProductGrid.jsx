import ProductCard from './ProductCard.jsx';
import './ProductGrid.css';

export default function ProductGrid({ products, loading, onViewDetails, onResetFilters }) {
  if (loading) {
    return (
      <div className="loading-container" id="loadingContainer">
        <div className="coffee-cup-loader">
          <div className="cup">
            <div className="handle"></div>
            <div className="coffee"></div>
          </div>
          <div className="steam">
            <div className="steam-line"></div>
            <div className="steam-line"></div>
            <div className="steam-line"></div>
          </div>
        </div>
        <p>Učitavanje premium kafe i opreme...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <i className="fa-solid fa-magnifying-glass"></i>
        <p>Nema proizvoda koji odgovaraju zadatim filterima.</p>
        <button className="btn btn-secondary" onClick={onResetFilters}>Resetuj filtere</button>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
}
