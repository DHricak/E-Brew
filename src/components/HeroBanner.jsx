import './HeroBanner.css';

export default function HeroBanner() {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-subtitle">Izbor svetskih barista</span>
        <h1 className="hero-title">Izuzetna zrna. Profesionalna oprema.</h1>
        <p className="hero-desc">
          BrewCraft donosi pažljivo odabrana zrna specialty kafe direktno sa najpoznatijih farmi,
          kao i vrhunsku opremu za vaš kućni ili profesionalni bar.
        </p>
        <a href="#catalogSection" className="btn btn-primary btn-large">Istraži katalog</a>
      </div>
    </section>
  );
}
