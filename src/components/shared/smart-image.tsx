"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SmartImageProps = ImageProps & {
  containerClassName?: string;
  imageClassName?: string;
};

export function SmartImage({
  containerClassName = "",
  imageClassName = "",
  onLoad,
  onError,
  alt,
  ...props
}: SmartImageProps) {
  const [carregada, setCarregada] = useState(false);
  const [falhou, setFalhou] = useState(false);

  return (
    <span
      className={[
        "smart-image premium-smart-image",
        carregada ? "is-loaded" : "",
        falhou ? "has-error" : "",
        containerClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="smart-image-skeleton premium-image-skeleton" aria-hidden="true" />

      {falhou ? (
        <span className="premium-image-error" role="img" aria-label="Imagem indisponível">
          <span>CM</span>
          <small>Imagem indisponível</small>
        </span>
      ) : (
        <Image
          {...props}
          alt={alt}
          className={`smart-image-element premium-image-element ${imageClassName}`.trim()}
          onLoad={(event) => {
            setCarregada(true);
            onLoad?.(event);
          }}
          onError={(event) => {
            setFalhou(true);
            onError?.(event);
          }}
        />
      )}
    </span>
  );
}
