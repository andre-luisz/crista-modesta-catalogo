import { Cross, Heart, Sparkles } from "lucide-react";

import { CategoryShowcase } from "@/components/home/category-showcase";
import { EditorialHero } from "@/components/home/editorial-hero";
import { EditorialStory } from "@/components/home/editorial-story";
import { ProductGrid } from "@/components/produto/product-grid";
import { CONTATO } from "@/lib/constants/contato";
import {
  listarCategoriasPublicas,
  listarProdutosPublicos,
} from "@/services/catalogo";

export const revalidate = 60;

export default async function Home() {
  const [produtos, categorias] = await Promise.all([
    listarProdutosPublicos({ limite: 36 }).catch(() => []),
    listarCategoriasPublicas().catch(() => []),
  ]);

  const destaque =
    produtos.find((produto) => produto.destaque && produto.imagemCapa) ??
    produtos.find((produto) => produto.imagemCapa);
  const historia =
    produtos.find(
      (produto) => produto.imagemCapa && produto.id !== destaque?.id,
    ) ?? destaque;

  return (
    <>
      <EditorialHero produto={destaque} />

      <section id="novidades" className="page-container intro-manifesto refined-manifesto">
        <span className="manifesto-kicker">
          <Cross size={14} aria-hidden="true" />
          Nossa essência
        </span>
        <h2>
          Vestir-se também pode expressar cuidado, dignidade e propósito.
        </h2>
        <p>
          A Cristã Modesta nasceu para servir mulheres que desejam unir beleza,
          feminilidade e modéstia. Trabalhamos com excelência porque cremos que
          tudo o que fazemos deve apontar para Deus.
        </p>

        <div className="brand-pillars">
          <article>
            <Heart aria-hidden="true" />
            <strong>Modéstia com beleza</strong>
            <span>Peças que valorizam sem perder a delicadeza.</span>
          </article>
          <article>
            <Sparkles aria-hidden="true" />
            <strong>Excelência nos detalhes</strong>
            <span>Cuidado na escolha, apresentação e atendimento.</span>
          </article>
          <article>
            <Cross aria-hidden="true" />
            <strong>Propósito cristão</strong>
            <span>Uma marca que deseja glorificar a Deus em tudo.</span>
          </article>
        </div>
      </section>

      <CategoryShowcase categorias={categorias} produtos={produtos} />
      <EditorialStory produto={historia} />

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
        <ProductGrid produtos={produtos} />
      </section>

      <section className="faith-banner-section">
        <div className="page-container faith-banner-content">
          <Cross aria-hidden="true" />
          <p>“A Ele seja a glória, agora e para sempre.”</p>
          <span>Uma marca de moda feita para servir com fé e excelência.</span>
        </div>
      </section>

      <section className="vip-editorial-section refined-vip-section">
        <div className="page-container vip-editorial-content">
          <span>Grupo VIP</span>
          <h2>Novidades, reposições e lançamentos em primeira mão.</h2>
          <p>
            Entre no nosso grupo e acompanhe de perto tudo que chega à Cristã
            Modesta.
          </p>
          <a href={CONTATO.grupoVip} target="_blank" rel="noreferrer">
            Entrar no grupo VIP
          </a>
        </div>
      </section>
    </>
  );
}
