import {
  getImagemPublicaUrl,
  getPublicSupabaseClient,
} from "@/lib/supabase/public-client";
import type {
  CatalogoCategoria,
  CatalogoCorDetalhe,
  CatalogoCorResumo,
  CatalogoImagem,
  CatalogoProduto,
  CatalogoProdutoDetalhe,
  CatalogoTamanho,
} from "@/types/catalogo";

type Linha = Record<string, unknown>;

const texto = (valor: unknown) =>
  typeof valor === "string" ? valor : null;

const numero = (valor: unknown) => {
  const resultado = Number(valor ?? 0);
  return Number.isFinite(resultado) ? resultado : 0;
};

const booleano = (valor: unknown) => valor === true;

const lista = (valor: unknown): Linha[] =>
  Array.isArray(valor)
    ? valor.filter(
        (item): item is Linha =>
          typeof item === "object" && item !== null,
      )
    : [];

function normalizarCorResumo(linha: Linha): CatalogoCorResumo {
  return {
    id: texto(linha.id) ?? "",
    nome: texto(linha.nome) ?? "Cor",
    codigoHex: texto(linha.codigo_hex),
    principal: booleano(linha.principal),
  };
}

// Contrato público proposto: promoção efetiva calculada pelo ERP.
function normalizarPromocao(valor: unknown) {
  if (!valor || typeof valor !== "object") return null;
  const linha = valor as Linha;
  const precoOriginal = numero(linha.preco_original);
  const precoPromocional = numero(linha.preco_promocional);
  if (precoOriginal <= 0 || precoPromocional <= 0 || precoPromocional >= precoOriginal) return null;
  return { campanhaNome: texto(linha.campanha_nome), precoOriginal, precoPromocional };
}

function normalizarProduto(linha: Linha): CatalogoProduto {
  const caminho =
    texto(linha.imagem_capa_caminho) ??
    texto(linha.imagem_capa) ??
    texto(linha.imagem_capa_url) ??
    texto(linha.caminho_imagem);

  const precoMinimo = numero(
    linha.preco_minimo ?? linha.preco_venda ?? linha.preco,
  );
  const precoMaximo = numero(
    linha.preco_maximo ?? linha.preco_venda ?? linha.preco,
  );

  return {
    id: texto(linha.id) ?? "",
    slug: texto(linha.slug) ?? "",
    nome: texto(linha.nome) ?? "Produto",
    codigo: texto(linha.codigo),
    descricao: texto(linha.descricao),
    categoriaId: texto(linha.categoria_id),
    categoriaNome:
      texto(linha.categoria_nome) ?? texto(linha.categoria),
    precoMinimo,
    precoMaximo,
    possuiPrecosDiferentes:
      booleano(linha.possui_precos_diferentes) ||
      precoMinimo !== precoMaximo,
    promocao: normalizarPromocao(linha.promocao),
    imagemCapa: getImagemPublicaUrl(caminho),
    imagemOferta: getImagemPublicaUrl(texto(linha.imagem_oferta)),
    corOferta: texto(linha.cor_oferta),
    tamanhoOferta: texto(linha.tamanho_oferta),
    destaque:
      booleano(linha.destaque) ||
      booleano(linha.destaque_catalogo),
    cores: lista(linha.cores).map(normalizarCorResumo),
  };
}

function normalizarImagem(linha: Linha): CatalogoImagem | null {
  const url = getImagemPublicaUrl(texto(linha.caminho));
  if (!url) return null;

  return {
    id: texto(linha.id) ?? url,
    url,
    nomeArquivo: texto(linha.nome_arquivo),
    principal: booleano(linha.principal),
    ordem: numero(linha.ordem),
  };
}

function normalizarTamanho(linha: Linha): CatalogoTamanho {
  return {
    variacaoId: texto(linha.variacao_id) ?? "",
    tamanho: texto(linha.tamanho) ?? "Único",
    preco: numero(linha.preco),
    promocao: linha.disponivel === false ? null : normalizarPromocao(linha.promocao),
    disponivel: linha.disponivel !== false,
  };
}

function normalizarCorDetalhe(linha: Linha): CatalogoCorDetalhe {
  const precoMinimo = numero(linha.preco_minimo);
  const precoMaximo = numero(linha.preco_maximo);

  return {
    ...normalizarCorResumo(linha),
    imagens: lista(linha.imagens)
      .map(normalizarImagem)
      .filter((imagem): imagem is CatalogoImagem => imagem !== null),
    tamanhos: lista(linha.tamanhos).map(normalizarTamanho),
    precoMinimo,
    precoMaximo,
    possuiPrecosDiferentes:
      booleano(linha.possui_precos_diferentes) ||
      precoMinimo !== precoMaximo,
  };
}

export async function listarProdutosPublicos(opcoes?: {
  busca?: string | null;
  categoriaId?: string | null;
  somenteDestaques?: boolean;
  limite?: number;
  offset?: number;
}): Promise<CatalogoProduto[]> {
  const supabase = getPublicSupabaseClient();
  const { data, error } = await supabase.rpc(
    "catalogo_listar_produtos_v2",
    {
      p_busca: opcoes?.busca?.trim() || null,
      p_categoria_id: opcoes?.categoriaId || null,
      p_somente_destaques: opcoes?.somenteDestaques ?? false,
      p_limite: opcoes?.limite ?? 36,
      p_offset: opcoes?.offset ?? 0,
    },
  );

  if (error) throw new Error(error.message);

  return ((data ?? []) as Linha[])
    .map(normalizarProduto)
    .filter((produto) => produto.id && produto.slug);
}

export async function listarCategoriasPublicas(): Promise<
  CatalogoCategoria[]
> {
  const supabase = getPublicSupabaseClient();
  const { data, error } = await supabase.rpc(
    "catalogo_listar_categorias",
  );

  if (error) throw new Error(error.message);

  return ((data ?? []) as Linha[])
    .map((linha) => ({
      id: texto(linha.id) ?? "",
      nome: texto(linha.nome) ?? "Categoria",
      quantidadeProdutos: numero(linha.quantidade_produtos),
    }))
    .filter((categoria) => categoria.id);
}

export async function obterProdutoPublico(
  slug: string,
): Promise<CatalogoProdutoDetalhe | null> {
  const supabase = getPublicSupabaseClient();
  const { data, error } = await supabase.rpc(
    "catalogo_obter_produto_v2",
    { p_slug: slug },
  );

  if (error) throw new Error(error.message);
  if (!data || typeof data !== "object") return null;

  const linha = data as Linha;
  const categoria =
    linha.categoria && typeof linha.categoria === "object"
      ? (linha.categoria as Linha)
      : {};

  return {
    id: texto(linha.id) ?? "",
    slug: texto(linha.slug) ?? slug,
    nome: texto(linha.nome) ?? "Produto",
    codigo: texto(linha.codigo),
    descricao: texto(linha.descricao),
    categoriaId: texto(categoria.id),
    categoriaNome: texto(categoria.nome),
    precoMinimo: numero(linha.preco_minimo),
    precoMaximo: numero(linha.preco_maximo),
    possuiPrecosDiferentes:
      booleano(linha.possui_precos_diferentes),
    destaque: booleano(linha.destaque),
    imagensGerais: lista(linha.imagens_gerais)
      .map(normalizarImagem)
      .filter((imagem): imagem is CatalogoImagem => imagem !== null),
    cores: lista(linha.cores).map(normalizarCorDetalhe),
  };
}

export async function listarProdutosRelacionados(
  slug: string,
): Promise<CatalogoProduto[]> {
  const supabase = getPublicSupabaseClient();
  const { data, error } = await supabase.rpc(
    "catalogo_produtos_relacionados_v2",
    { p_slug: slug, p_limite: 6 },
  );

  if (error) throw new Error(error.message);
  return ((data ?? []) as Linha[])
    .map(normalizarProduto)
    .filter((produto) => produto.id && produto.slug);
}
