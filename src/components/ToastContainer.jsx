import './ToastContainer.css';

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div className={`toast ${toast.type}`} key={toast.id}>
          {toast.type === 'success'
            ? <i className="fa-solid fa-circle-check"></i>
            : <i className="fa-solid fa-circle-exclamation"></i>}
          <span>{toast.message}</span>
          <button className="toast-close" onClick={() => onRemove(toast.id)} aria-label="Zatvori obavještenje">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      ))}
    </div>
  );
}
