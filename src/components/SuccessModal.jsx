import './SuccessModal.css';

export default function SuccessModal({ show, orderNumber, onClose }) {
  if (!show) return null;
  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) onClose(); }}>
      <div className="modal-content success-content">
        <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
        <h3>Narudžbina uspješna!</h3>
        <p>Vaša narudžbina je uspješno obrađena u našem sistemu.</p>
        <div className="order-details-box">
          <p>Broj narudžbine: <span>#{orderNumber}</span></p>
          <p>Vrijeme isporuke: <span>2-3 radna dana</span></p>
        </div>
        <button className="btn btn-primary btn-block" onClick={onClose}>U redu</button>
      </div>
    </div>
  );
}
