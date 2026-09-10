import './CartSidebar.css';

export default function CartSidebar({
  cart, show, onClose, subtotal, discountVal, taxVal, totalVal, appliedDiscount,
  onRemove, onChangeQty, onApplyPromo, onCheckout
}) {
  return (
    <div className={`cart-sidebar ${show ? 'open' : ''}`}>
      <div className="cart-header">
        <h3><i className="fa-solid fa-bag-shopping"></i> Vaša korpa</h3>
        <button className="close-cart" onClick={onClose} aria-label="Zatvori korpu">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      {cart.length > 0 ? (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={`${item.id}-${item.option}`}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <div className="cart-item-option">{item.option}</div>
                  <div className="cart-item-price">{item.price.toFixed(2)} KM</div>
                </div>
                <div className="cart-item-actions">
                  <button className="remove-item" onClick={() => onRemove(item.id, item.option)} aria-label={`Ukloni ${item.name}`}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <div className="quantity-control">
                    <button className="qty-btn" onClick={() => onChangeQty(item.id, item.option, -1)} aria-label="Smanji količinu">
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => onChangeQty(item.id, item.option, 1)} aria-label="Povećaj količinu">
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="promo-code-container">
              <input type="text" id="promoInput" placeholder="Promo kod (npr. COFFEE10)" />
              <button className="btn btn-secondary" onClick={() => {
                const input = document.getElementById('promoInput');
                onApplyPromo(input.value);
                input.value = '';
              }}>Primijeni</button>
            </div>
            <div className="cart-summary">
              <div className="summary-line"><span>Međuzbir:</span><span>{subtotal.toFixed(2)} KM</span></div>
              {appliedDiscount > 0 && (
                <div className="summary-line"><span>Popust ({appliedDiscount * 100}%):</span><span>-{discountVal.toFixed(2)} KM</span></div>
              )}
              <div className="summary-line"><span>Porez (17% PDV):</span><span>{taxVal.toFixed(2)} KM</span></div>
              <div className="summary-line total-line"><span>Ukupno za uplatu:</span><span>{totalVal.toFixed(2)} KM</span></div>
            </div>
            <button className="btn btn-primary btn-block" onClick={onCheckout}>Nastavi na plaćanje</button>
          </div>
        </>
      ) : (
        <div className="cart-empty">
          <i className="fa-solid fa-basket-shopping"></i>
          <p>Vaša korpa je trenutno prazna.</p>
          <button className="btn btn-secondary btn-block" onClick={onClose}>Započni kupovinu</button>
        </div>
      )}
    </div>
  );
}
