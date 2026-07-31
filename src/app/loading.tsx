export default function Loading() {
  return <div className="page-container page-loading"><div className="loading-hero" /><div className="loading-grid">{Array.from({length:8}).map((_,i)=><div key={i} className="loading-card" />)}</div></div>;
}
