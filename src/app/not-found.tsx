import Link from "next/link";
export default function NotFound() {
  return <main className="not-found-page"><span>CM</span><h1>Essa peça não está disponível.</h1><p>Ela pode ter saído do estoque ou sido removida da vitrine.</p><Link href="/">Voltar para a vitrine</Link></main>;
}
