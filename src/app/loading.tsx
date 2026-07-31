export default function Loading() {
  return (
    <div className="premium-page-loading" aria-label="Carregando vitrine">
      <div className="premium-loading-hero">
        <div className="premium-loading-copy">
          <span />
          <strong />
          <strong />
          <p />
          <button />
        </div>
      </div>

      <div className="page-container premium-loading-section">
        <div className="premium-loading-heading" />
        <div className="premium-loading-grid">
          {Array.from({ length: 8 }).map((_, indice) => (
            <div key={indice} className="premium-loading-product">
              <div className="premium-loading-image" />
              <span />
              <strong />
              <small />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
