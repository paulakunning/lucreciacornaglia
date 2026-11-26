import Image, { type StaticImageData } from "next/image";
import styles from "./BackgroundImage.module.css";

type BackgroundImageProps = {
  src: StaticImageData;
  /** CSS colour laid over the photo so text stays readable. */
  overlay: string;
  preload?: boolean;
};

/** Decorative full-bleed photo. The parent needs `position: relative; isolation: isolate`. */
export function BackgroundImage({
  src,
  overlay,
  preload,
}: BackgroundImageProps) {
  return (
    <div className={styles.root} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        preload={preload}
        className={styles.image}
      />
      <div className={styles.overlay} style={{ background: overlay }} />
    </div>
  );
}
