import type { CatalogoProduto } from "@/types/catalogo";
import { ProductCard } from "./product-card";

export function ProductGrid({ produtos }: { produtos: CatalogoProduto[] }) {
  if (produtos.length === 0) {
    return (
      <div className="empty-editorial-state">
        <ImagePlaceholder />
        <h3>Novidades chegando</h3>
        <p>As peças disponíveis aparecerão aqui automaticamente.</p>
      </div>
    );
  }

  return (
    <div className="editorial-product-grid">
      {produtos.map((produto, indice) => (
        <ProductCard key={produto.id} produto={produto} prioridade={indice < 4} />
      ))}
    </div>
  );
}

function ImagePlaceholder() {
  return <span aria-hidden="true">CM</span>;
}
