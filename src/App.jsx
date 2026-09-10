import { useState } from 'react';
import './App.css';

import useProducts from './hooks/useProducts.js';
import useCart from './hooks/useCart.js';
import useToasts from './hooks/useToasts.js';

import PromoBanner from './components/PromoBanner.jsx';
import Header from './components/Header.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import FilterBar from './components/FilterBar.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import CartSidebar from './components/CartSidebar.jsx';
import ProductModal from './components/ProductModal.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import SuccessModal from './components/SuccessModal.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [promoVisible, setPromoVisible] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  const { products, loading, filters, setFilters, filteredProducts, resetFilters } = useProducts();
  const cart = useCart();
  const { toasts, addToast, removeToast } = useToasts();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowCart(false);
  };

  const handleAddToCart = (product, option) => {
    const added = cart.addToCart(product, option);
    if (added) {
      addToast(`Dodato u korpu: ${product.name} (${option})`);
      setShowCart(true);
    } else {
      addToast(`Maksimalna količina u zalihama je dostignuta za ${product.name}!`, 'error');
    }
  };

  const handleRemoveFromCart = (id, option) => {
    const item = cart.cart.find(i => i.id === id && i.option === option);
    cart.removeFromCart(id, option);
    if (item) addToast(`Uklonjeno iz korpe: ${item.name}`, 'success');
  };

  const handleApplyPromo = (code) => {
    const result = cart.applyPromoCode(code);
    if (result.success) {
      addToast('Popust primijenjen!');
    } else {
      addToast('Nevažeći promo kod. Pokušajte sa COFFEE10.', 'error');
    }
  };

  const handleCheckoutSubmit = (formData) => {
    const orderPayload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      phone: formData.phone.trim(),
      items: cart.cart.map(item => ({
        id: item.id, name: item.name, option: item.option,
        quantity: item.quantity, price: item.price
      })),
      discount: cart.appliedDiscount,
      total: cart.cartTotalVal
    };

    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    })
      .then(res => { if (!res.ok) throw new Error('API order failed'); return res.json(); })
      .then(data => {
        if (data.success) {
          setOrderNumber(data.orderNumber);
          addToast('Narudžbina zavedena na backend serveru!', 'success');
        } else {
          throw new Error('API failure');
        }
      })
      .catch(() => {
        const localOrderId = `BC-L-${Math.floor(10000 + Math.random() * 90000)}`;
        setOrderNumber(localOrderId);
        addToast('Lokalna simulacija narudžbine (Backend nedostupan)', 'success');
      })
      .finally(() => {
        setShowCheckout(false);
        cart.clearCart();
        setShowSuccess(true);
      });
  };

  const faqItems = [
    { q: "Kako funkcioniše naručivanje?", a: "Dodajte željene proizvode u korpu. Klikom na dugme 'Završi kupovinu' u korpi, otvoriće se checkout forma. Nakon popunjavanja forme i validacije podataka, dobićete potvrdu o uspješnoj simulaciji narudžbine." },
    { q: "Odakle dolaze podaci o proizvodima?", a: "Svi podaci o proizvodima se učitavaju asinhrono iz lokalnog JSON fajla koji simulira spoljni REST API server. Pri svakom učitavanju namjerno je dodato kašnjenje kako bi se prikazao status učitavanja (loading spinner)." },
    { q: "Da li je ovo stvarna prodavnica?", a: "Ne, ovo je demonstracioni projekat u edukativne svrhe. Plaćanje je simulirano i ne vrši se stvarna novčana transakcija." }
  ];

  return (
    <>
      <PromoBanner visible={promoVisible} onClose={() => setPromoVisible(false)} />
      <Header activeTab={activeTab} onTabChange={handleTabChange}
        cartCount={cart.cartCountVal} onCartOpen={() => setShowCart(true)} />

      <main className="app-content">
        {activeTab === 'catalog' && (
          <>
            <HeroBanner />
            <section className="catalog-section" id="catalogSection">
              <div className="section-header">
                <h2>Naša Ponuda</h2>
                <p>Filtrirajte proizvode po kategoriji, regiji ili vrsti opreme.</p>
              </div>
              <FilterBar filters={filters} onFilterChange={setFilters} onReset={resetFilters} />
              <ProductGrid products={filteredProducts} loading={loading}
                onViewDetails={setSelectedProduct} onResetFilters={resetFilters} />
            </section>
          </>
        )}

        {activeTab === 'about' && (
          <section className="info-section">
            <div className="info-container">
              <div className="info-text">
                <h2>O BrewCraft projektu</h2>
                <p>BrewCraft je konceptualna e-commerce platforma kreirana kao praktični dio seminarskog rada iz predmeta <strong>Računarska praksa</strong>.</p>
                <p>Primarni fokus ovog projekta je demonstracija principa <strong>Interakcije čovjek-računar (HCI)</strong> kroz praktičnu primjenu 10 Nielsenovih heuristika upotrebljivosti u dizajnu korisničkog interfejsa.</p>
                <h3>Korišćene Tehnologije:</h3>
                <ul className="tech-list">
                  <li><i className="fa-brands fa-html5"></i> HTML5 (Semantika i pristupačnost)</li>
                  <li><i className="fa-brands fa-css3-alt"></i> CSS3 (Custom properties, grid/flexbox, animacije)</li>
                  <li><i className="fa-brands fa-react"></i> React JS (State Management, deklarativni UI)</li>
                </ul>
              </div>
              <div className="info-image">
                <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop" alt="Priprema kafe" />
              </div>
            </div>
          </section>
        )}

        {activeTab === 'faq' && (
          <section className="info-section">
            <div className="faq-container">
              <h2>Česta Pitanja (HCI: Pomoć i dokumentacija)</h2>
              {faqItems.map((item, index) => (
                <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => setActiveFaq(prev => prev === index ? null : index)}>
                    {item.q} <i className="fa-solid fa-chevron-down"></i>
                  </button>
                  {activeFaq === index && (
                    <div className="faq-answer" style={{ display: 'block' }}>
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <CartSidebar cart={cart.cart} show={showCart} onClose={() => setShowCart(false)}
        subtotal={cart.cartSubtotal} discountVal={cart.cartDiscountVal}
        taxVal={cart.cartTaxVal} totalVal={cart.cartTotalVal}
        appliedDiscount={cart.appliedDiscount}
        onRemove={handleRemoveFromCart} onChangeQty={cart.changeQuantity}
        onApplyPromo={handleApplyPromo}
        onCheckout={() => { setShowCart(false); setShowCheckout(true); }} />

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart} />

      <CheckoutModal show={showCheckout} total={cart.cartTotalVal}
        onClose={() => setShowCheckout(false)} onSubmit={handleCheckoutSubmit} />

      <SuccessModal show={showSuccess} orderNumber={orderNumber}
        onClose={() => setShowSuccess(false)} />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <Footer />
    </>
  );
}

export default App;
