import { useState } from 'react';
import './ProductModal.css';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [grindOption, setGrindOption] = useState('');
  if (!product) return null;

  const isCoffee = product.category === 'coffee';

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) onClose(); }}>
      <div className="modal-content modal-large">
        <button className="modal-close" onClick={onClose} aria-label="Zatvori detalje">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="product-details-view">
          <div className="details-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="details-meta">
            <span className="details-origin">{isCoffee ? product.origin : product.type}</span>
            <h2 className="details-title">{product.name}</h2>
            <div className="details-price">{product.price.toFixed(2)} KM</div>
            <p className="details-desc">{product.description}</p>
            {isCoffee ? (
              <div className="options-selector">
                <span className="options-label">Izaberite mljevenje (Obavezno):</span>
                <div className="grind-options">
                  {[
                    { label: 'U zrnu', value: 'U zrnu', icon: 'fa-circle' },
                    { label: 'Za Espresso', value: 'Mljevena za Espresso', icon: 'fa-coffee-bean' },
                    { label: 'Za Filter', value: 'Mljevena za Filter', icon: 'fa-filter' }
                  ].map(opt => (
                    <label className="option-item" key={opt.value}>
                      <input type="radio" name="grind" value={opt.value} className="grind-radio"
                        checked={grindOption === opt.value} onChange={() => setGrindOption(opt.value)} />
                      <span className="grind-card"><i className={`fa-solid ${opt.icon}`}></i> {opt.label}</span>
                    </label>
                  ))}
                </div>
                {!grindOption && (
                  <div className="selection-warning" style={{ display: 'block' }}>
                    Molimo izaberite opciju mljevenja prije dodavanja u korpu!
                  </div>
                )}
                <button className="btn btn-primary btn-block" style={{ marginTop: '20px' }}
                  disabled={!grindOption}
                  onClick={() => { onAddToCart(product, grindOption); onClose(); }}>
                  <i className="fa-solid fa-cart-plus"></i> Dodaj u korpu
                </button>
              </div>
            ) : (
              <div>
                <div className="details-spec-list">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div className="spec-row" key={key}>
                      <span className="spec-label">{key}</span>
                      <span className="spec-value">{val}</span>
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary btn-block"
                  onClick={() => { onAddToCart(product, 'Standard'); onClose(); }}>
                  <i className="fa-solid fa-cart-plus"></i> Dodaj u korpu
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
