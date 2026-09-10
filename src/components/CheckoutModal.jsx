import { useState } from 'react';
import './CheckoutModal.css';

export default function CheckoutModal({ show, total, onClose, onSubmit }) {
  const [form, setForm] = useState({ fullName: '', email: '', address: '', phone: '' });
  const [errors, setErrors] = useState({ fullName: false, email: false, address: false, phone: false });

  if (!show) return null;

  const validate = () => ({
    fullName: !form.fullName.trim(),
    email: !form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    address: !form.address.trim(),
    phone: !form.phone.trim() || !/^\+?[0-9\s\-]{6,15}$/.test(form.phone.trim())
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    onSubmit({ ...form, total });
    setForm({ fullName: '', email: '', address: '', phone: '' });
    setErrors({ fullName: false, email: false, address: false, phone: false });
  };

  const setField = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const fields = [
    { id: 'fullName', label: 'Ime i prezime *', placeholder: 'npr. Marko Marković', error: 'Ime i prezime je obavezno.' },
    { id: 'email', label: 'E-mail adresa *', placeholder: 'npr. marko@example.com', error: 'Unesite ispravnu e-mail adresu.' },
    { id: 'address', label: 'Adresa za isporuku *', placeholder: 'Ulica, broj, grad i poštanski broj', error: 'Adresa za isporuku je obavezna.' },
    { id: 'phone', label: 'Broj telefona *', placeholder: 'npr. +387 65 123 456', error: 'Unesite ispravan broj telefona.' }
  ];

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) onClose(); }}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Zatvori plaćanje">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h3><i className="fa-solid fa-credit-card"></i> Podaci za isporuku</h3>
        <p className="modal-subtitle" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Molimo popunite formu kako biste završili narudžbinu.
        </p>
        <form onSubmit={handleSubmit} noValidate>
          {fields.map(f => (
            <div key={f.id} className={`form-group ${errors[f.id] ? 'invalid' : ''}`}>
              <label htmlFor={f.id}>{f.label}</label>
              <input type={f.id === 'email' ? 'email' : f.id === 'phone' ? 'tel' : 'text'}
                id={f.id} placeholder={f.placeholder}
                value={form[f.id]} onChange={setField(f.id)} />
              <span className="error-message">{f.error}</span>
            </div>
          ))}
          <div className="checkout-summary-box">
            <span>Ukupno za plaćanje: <strong>{total.toFixed(2)} KM</strong></span>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Završi i plati</button>
        </form>
      </div>
    </div>
  );
}
