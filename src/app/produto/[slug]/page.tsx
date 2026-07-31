import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { ProductExperience } from "@/components/produto/product-experience";
import { ProductGrid } from "@/components/produto/product-grid";
import {
  listarProdutosRelacionados,
  obterProdutoPublico,
} from "@/services/catalogo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const produto = await obterProdutoPublico(slug).catch(() => null);

  if (!produto) {
    return { title: "Produto não encontrado" };
  }

  const imagem =
    produto.cores.flatMap((cor) => cor.imagens)[0] ??
    produto.imagensGerais[0];

  return {
    title: produto.nome,
    description:
      produto.descricao ??
      `Conheça ${produto.nome} na Cristã Modesta.`,
    openGraph: {
      title: produto.nome,
      description:
        produto.descricao ??
        `Conheça ${produto.nome} na Cristã Modesta.`,
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

  if (!produto) {
    notFound();
  }

  return (
    <>
      <nav
        className="page-container zara-product-breadcrumb-nav"
        aria-label="Navegação estrutural"
      >
        <Link href="/">
          <ChevronLeft size={16} aria-hidden="true" />
          Voltar para a vitrine
        </Link>

        <span aria-hidden="true">/</span>

        <span>{produto.categoriaNome ?? "Coleção"}</span>
      </nav>

      <main className="zara-product-page-main">
        <ProductExperience produto={produto} />
      </main>

      {relacionados.length > 0 ? (
        <section className="page-container zara-related-products">
          <header className="editorial-section-heading centered">
            <span>Continue descobrindo</span>
            <h2>Você também pode gostar.</h2>
            <p>
              Outras peças escolhidas com elegância, modéstia e
              propósito.
            </p>
          </header>

          <ProductGrid produtos={relacionados} />
        </section>
      ) : null}
    </>
  );
}
