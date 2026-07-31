import Link from "next/link";

import { SmartImage } from "@/components/shared/smart-image";
import type { CatalogoProduto } from "@/types/catalogo";

type EditorialStoryProps = {
  produto?: CatalogoProduto;
};

export function EditorialStory({ produto }: EditorialStoryProps) {
  if (!produto?.imagemCapa) return null;

  return (
    <section className="editorial-story">
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
      <div className="editorial-story-copy">
        <span>Look da semana</span>
        <h2>Delicadeza que se revela nos detalhes.</h2>
        <p>
          Tecidos, caimentos e cores escolhidos para acompanhar diferentes
          momentos sem abrir mão da sua essência.
        </p>
        <Link href={`/produto/${produto.slug}`}>Conhecer este look</Link>
      </div>
    </section>
  );
}
