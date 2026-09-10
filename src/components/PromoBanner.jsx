import './PromoBanner.css';

export default function PromoBanner({ visible, onClose }) {
  if (!visible) return null;
  return (
    <div className="promo-banner" id="promoBanner">
      <span>🎉 Iskoristite promo kod <strong>COFFEE10</strong> za 10% popusta na prvu kupovinu!</span>
      <button className="close-promo" onClick={onClose} aria-label="Zatvori promociju">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}
