import Image, { type StaticImageData } from "next/image";
import { Icon } from "@/components/Icon";
import styles from "./About.module.css";

type AboutProps = {
  /** Portrait of Lucrecia. The figure stays out of the page until there is one. */
  photo?: StaticImageData;
};

export function About({ photo }: AboutProps) {
  return (
    <section className="section" aria-labelledby="about-title">
      <div
        className={`container ${styles.grid} ${photo ? styles.withPhoto : ""}`}
      >
        {photo && (
          <figure className={styles.photo}>
            <div className={styles.frame}>
              <Image
                src={photo}
                alt="Lucrecia Cornaglia"
                fill
                sizes="22rem"
                className={styles.image}
              />
            </div>
            <Icon name="donut" className={styles.donut} />
          </figure>
        )}
        {/* Without a photo the highlight takes the right column on desktop. */}
        <div className={photo ? undefined : styles.split}>
          <div>
            <h2 id="about-title">Un poco sobre mí</h2>
            <p>
              Soy Lucrecia Cornaglia, Contadora Pública y Especialista en
              Contabilidad Superior y Auditoría. Nací en Leones, vivo en Córdoba
              y hace más de 15 años trabajo con productores y empresas.
            </p>
            <p>
              Con mi experiencia en contabilidad, impuestos, cuestiones
              laborales y gestión puedo comprender cómo funciona cada negocio y
              las particularidades de su actividad.
            </p>
          </div>
          <p className={styles.highlight}>
            <strong>Mi trabajo va más allá de los números:</strong> busco
            comprometerme con cada negocio para aportar soluciones y mejoras.
          </p>
        </div>
      </div>
    </section>
  );
}
