import { NextRequest, NextResponse } from "next/server";
import { listarProdutosPublicos } from "@/services/catalogo";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const offset = Number(params.get("offset") ?? 0);
  const categoriaId = params.get("categoria");
  if (!Number.isSafeInteger(offset) || offset < 0 || offset > 2147483626 || (categoriaId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(categoriaId))) return NextResponse.json({ erro: "Parâmetros inválidos" }, { status: 400 });
  try {
    const resultado = await listarProdutosPublicos({ busca: params.get("q")?.slice(0, 300), categoriaId, limite: 21, offset });
    return NextResponse.json({ produtos: resultado.slice(0, 20), temMais: resultado.length > 20 }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ erro: "Não foi possível carregar os produtos" }, { status: 503 });
  }
}
