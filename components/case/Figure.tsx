import Image, { type StaticImageData } from "next/image";

import styles from "./case.module.css";

type Props = {
  number: number;
  src: StaticImageData;
  alt: string;
  caption: React.ReactNode;
  sizes?: string;
  /** Crop the screenshot into this CSS aspect ratio; otherwise show it whole. */
  crop?: { aspect: string; position: string };
  /** A tighter crop of the same screenshot, shown under 640 px. */
  small?: StaticImageData;
  className?: string;
  /** Load at once: for a lead figure above the fold. Ignored when there is a phone crop. */
  eager?: boolean;
  /** From 1024 px up, set the caption beside the frame instead of below it. */
  captionSide?: boolean;
};

export default function Figure({ number, src, alt, caption, sizes, crop, small, className, eager, captionSide }: Props) {
  const imageSizes = sizes ?? "(max-width: 1023px) 100vw, 960px";
  const loading = eager && !small ? "eager" : undefined;
  return (
    <figure className={`${styles.figure} ${captionSide ? styles.side : ""} ${className ?? ""}`}>
      <div
        className={`${styles.frame} ${crop ? styles.cropped : styles.natural} ${small ? styles.largeOnly : ""}`}
        style={crop ? ({ "--aspect": crop.aspect, "--pos": crop.position } as React.CSSProperties) : undefined}
      >
        {crop ? (
          <Image src={src} alt={alt} fill sizes={imageSizes} className={styles.img} loading={loading} />
        ) : (
          <Image src={src} alt={alt} sizes={imageSizes} className={styles.img} loading={loading} />
        )}
      </div>
      {small && (
        <div className={`${styles.frame} ${styles.natural} ${styles.smallOnly}`}>
          <Image src={small} alt={alt} sizes="100vw" className={styles.img} />
        </div>
      )}
      <figcaption className={`meta ${styles.caption}`}>
        Fig. {number}. {caption}
      </figcaption>
    </figure>
  );
}
