import Link from "next/link";
import { Cross } from "lucide-react";

import { SmartImage } from "@/components/shared/smart-image";
import type { CatalogoProduto } from "@/types/catalogo";

type EditorialStoryProps = {
  produto?: CatalogoProduto;
};

export function EditorialStory({ produto }: EditorialStoryProps) {
  if (!produto?.imagemCapa) return null;

  return (
    <section className="editorial-story refined-editorial-story">
      <div className="editorial-story-image-wrap">
        <SmartImage
          src={produto.imagemCapa}
          alt={produto.nome}
          fill
          quality={92}
          sizes="(max-width: 1000px) 100vw, 62vw"
          containerClassName="editorial-story-image-fill"
          imageClassName="editorial-story-image"
        />
      </div>
      <div className="editorial-story-copy refined-story-copy">
        <span className="story-faith-label">
          <Cross size={13} aria-hidden="true" />
          Beleza com essência
        </span>
        <h2>Feminilidade, modéstia e delicadeza em harmonia.</h2>
        <p>
          Cada detalhe é escolhido para valorizar a mulher sem apagar aquilo
          que ela carrega por dentro: fé, dignidade e propósito.
        </p>
        <Link href={`/produto/${produto.slug}`}>Conhecer este look</Link>
      </div>
    </section>
  );
}
