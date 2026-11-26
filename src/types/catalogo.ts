export type CatalogoPromocao = { campanhaNome: string | null; precoOriginal: number; precoPromocional: number };

export type CatalogoCorResumo = {
  id: string;
  nome: string;
  codigoHex: string | null;
  principal: boolean;
};

export type CatalogoProduto = {
  id: string;
  slug: string;
  nome: string;
  codigo: string | null;
  descricao: string | null;
  categoriaId: string | null;
  categoriaNome: string | null;
  precoMinimo: number;
  precoMaximo: number;
  possuiPrecosDiferentes: boolean;
  promocao: CatalogoPromocao | null;
  imagemCapa: string | null;
  imagemOferta: string | null;
  corOferta: string | null;
  tamanhoOferta: string | null;
  destaque: boolean;
  cores: CatalogoCorResumo[];
};

export type CatalogoImagem = {
  id: string;
  url: string;
  nomeArquivo: string | null;
  principal: boolean;
  ordem: number;
};

export type CatalogoTamanho = {
  variacaoId: string;
  tamanho: string;
  preco: number;
  promocao: CatalogoPromocao | null;
  disponivel: boolean;
};

export type CatalogoCorDetalhe = CatalogoCorResumo & {
  imagens: CatalogoImagem[];
  tamanhos: CatalogoTamanho[];
  precoMinimo: number;
  precoMaximo: number;
  possuiPrecosDiferentes: boolean;
};

export type CatalogoProdutoDetalhe = {
  id: string;
  slug: string;
  nome: string;
  codigo: string | null;
  descricao: string | null;
  categoriaId: string | null;
  categoriaNome: string | null;
  precoMinimo: number;
  precoMaximo: number;
  possuiPrecosDiferentes: boolean;
  destaque: boolean;
  imagensGerais: CatalogoImagem[];
  cores: CatalogoCorDetalhe[];
};

export type CatalogoCategoria = {
  id: string;
  nome: string;
  quantidadeProdutos: number;
};
