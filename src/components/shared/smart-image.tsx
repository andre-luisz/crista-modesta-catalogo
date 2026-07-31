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
  alt,
  ...props
}: SmartImageProps) {
  const [carregada, setCarregada] = useState(false);

  return (
    <span
      className={`smart-image ${carregada ? "is-loaded" : ""} ${containerClassName}`.trim()}
    >
      <span className="smart-image-skeleton" aria-hidden="true" />
      <Image
        {...props}
        alt={alt}
        className={`smart-image-element ${imageClassName}`.trim()}
        onLoad={(event) => {
          setCarregada(true);
          onLoad?.(event);
        }}
      />
    </span>
  );
}
