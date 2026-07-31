import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductExperience } from "@/components/produto/product-experience";
import { ProductGrid } from "@/components/produto/product-grid";
import { listarProdutosRelacionados, obterProdutoPublico } from "@/services/catalogo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const produto = await obterProdutoPublico(slug).catch(() => null);
  if (!produto) return { title: "Produto não encontrado" };
  const imagem = produto.cores.flatMap((cor) => cor.imagens)[0] ?? produto.imagensGerais[0];
  return {
    title: produto.nome,
    description: produto.descricao ?? `Conheça ${produto.nome} na Cristã Modesta.`,
    openGraph: {
      title: produto.nome,
      description: produto.descricao ?? `Conheça ${produto.nome} na Cristã Modesta.`,
      images: imagem ? [imagem.url] : [],
    },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  const [produto, relacionados] = await Promise.all([
    obterProdutoPublico(slug).catch(() => null),
    listarProdutosRelacionados(slug).catch(() => []),
  ]);
  if (!produto) notFound();

  return (
    <>
      <main className="page-container product-page-main">
        <ProductExperience produto={produto} />
      </main>
      {relacionados.length > 0 ? (
        <section className="page-container related-products-section">
          <header className="editorial-section-heading centered"><span>Você também pode gostar</span><h2>Outras escolhas da coleção.</h2></header>
          <ProductGrid produtos={relacionados} />
        </section>
      ) : null}
    </>
  );
}
