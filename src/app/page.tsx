import { CategoryShowcase } from "@/components/home/category-showcase";
import { EditorialHero } from "@/components/home/editorial-hero";
import { EditorialStory } from "@/components/home/editorial-story";
import { ProductGrid } from "@/components/produto/product-grid";
import { PremiumReveal } from "@/components/shared/premium-reveal";
import { CONTATO } from "@/lib/constants/contato";
import { listarCategoriasPublicas, listarProdutosPublicos } from "@/services/catalogo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [produtos, categorias] = await Promise.all([
    listarProdutosPublicos({ limite: 36 }).catch(() => []),
    listarCategoriasPublicas().catch(() => []),
  ]);

  const produtosColecoes = (await Promise.all(
    categorias.slice(0, 3).map(async (categoria) => {
      const existente = produtos.find(
        (produto) => produto.categoriaId === categoria.id && produto.imagemCapa,
      );
      if (existente) return [existente];
      return listarProdutosPublicos({ categoriaId: categoria.id, limite: 36 })
        .catch(() => []);
    }),
  )).flat();

  const ofertas = produtos.filter((produto) => produto.promocao);
  const destaque =
    produtos.find((produto) => produto.destaque && produto.imagemCapa) ??
    produtos.find((produto) => produto.imagemCapa);
  const historia =
    produtos.filter((produto) => produto.imagemCapa && produto.id !== destaque?.id)[0] ??
    destaque;

  return (
    <>
      <EditorialHero produto={destaque} />
      <nav className="page-container catalog-quick-nav" aria-label="Atalhos da vitrine">
        <a href="/buscar">Toda a coleção</a>
        {ofertas.length > 0 && <a href="#ofertas">Ofertas da vitrine</a>}
        <a href="#colecoes">Categorias</a>
      </nav>
      {ofertas.length > 0 && <section id="ofertas" className="page-container catalog-offers-section">
        <header className="editorial-section-heading"><div><span>Seleção especial</span><h2>Peças em oferta</h2></div></header>
        <ProductGrid produtos={ofertas} />
      </section>}

      <PremiumReveal>
        <section id="novidades" className="page-container intro-manifesto">
          <span>Nossa essência</span>
          <h2>Uma vitrine criada para mulheres que vestem beleza sem abrir mão de seus valores.</h2>
          <p>
            Descubra novidades, explore coleções e encontre peças disponíveis agora,
            com atendimento próximo pelo WhatsApp.
          </p>
        </section>
      </PremiumReveal>

      <PremiumReveal>
        <CategoryShowcase categorias={categorias} produtos={produtosColecoes} />
      </PremiumReveal>

      <PremiumReveal>
        <EditorialStory produto={historia} />
      </PremiumReveal>

      <PremiumReveal>
        <section id="produtos" className="page-container products-editorial-section">
          <header className="editorial-section-heading">
            <div>
              <span>Disponíveis agora</span>
              <h2>Peças para descobrir com calma.</h2>
            </div>
            <a href={CONTATO.instagram} target="_blank" rel="noreferrer">
              Acompanhar no Instagram
            </a>
          </header>
          <ProductGrid produtos={produtos.slice(0, 12)} />
          <div className="catalog-view-all"><a href="/buscar">Ver mais produtos →</a></div>
        </section>
      </PremiumReveal>

      <PremiumReveal>
        <section className="vip-editorial-section premium-vip-section">
          <div className="page-container vip-editorial-content">
            <span>Grupo VIP</span>
            <h2>Novidades, reposições e lançamentos em primeira mão.</h2>
            <p>Entre no nosso grupo e acompanhe de perto tudo que chega à Cristã Modesta.</p>
            <a href={CONTATO.grupoVip} target="_blank" rel="noreferrer">Entrar no grupo VIP</a>
          </div>
        </section>
      </PremiumReveal>
    </>
  );
}
