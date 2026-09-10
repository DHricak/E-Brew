import './Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>BrewCraft</h3>
          <p>Praktični rad iz predmeta Računarska praksa. Razvoj e-commerce aplikacije sa fokusom na HCI principe.</p>
        </div>
        <div className="footer-meta">
          <p>&copy; 2026 BrewCraft E-Shop. Sva prava zadržana.</p>
          <p>Student: David | Profesor: Doc. dr Dalibor Drljača</p>
        </div>
      </div>
    </footer>
  );
}
