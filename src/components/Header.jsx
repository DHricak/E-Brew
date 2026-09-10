import './Header.css';

export default function Header({ activeTab, onTabChange, cartCount, onCartOpen }) {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <a href="#" onClick={(e) => { e.preventDefault(); onTabChange('catalog'); }}>
            <span className="logo-icon"><i className="fa-solid fa-mug-hot"></i></span>
            <span className="logo-text">Brew<span>Craft</span></span>
          </a>
        </div>
        <nav className="main-nav">
          <ul>
            {[
              { key: 'catalog', label: 'Katalog' },
              { key: 'about', label: 'O nama' },
              { key: 'faq', label: 'Česta pitanja (FAQ)' }
            ].map(tab => (
              <li key={tab.key}>
                <a
                  href="#"
                  className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); onTabChange(tab.key); }}
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <button className="cart-trigger" onClick={onCartOpen} aria-label="Otvori korpu">
            <i className="fa-solid fa-bag-shopping"></i>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
