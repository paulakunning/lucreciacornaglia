import type { Metadata } from "next";
import Link from "next/link";
import { BackgroundImage } from "@/components/BackgroundImage";
import { Icon } from "@/components/Icon";
import { Isotype } from "@/components/Isotype";
import { site } from "@/lib/site";
import background from "@/assets/images/linktree-bg.jpg";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Lucrecia Cornaglia | Costos y rentabilidad" },
};

/** Link-in-bio page: everyone lands here and goes on to the landing or to her channels. */
export default function Home() {
  return (
    <div className={styles.page}>
      <BackgroundImage src={background} overlay="rgb(14 86 66 / 0.8)" preload />
      <main className={styles.links}>
        <header className={styles.brand}>
          <Isotype className={styles.isotype} />
          <h1 className={styles.name}>
            <span className="visually-hidden">
              Lucrecia Cornaglia, costos y rentabilidad
            </span>
            <Icon name="wordmark" />
          </h1>
          <p className={styles.tagline}>
            De entender los números a mejorar la gestión
          </p>
        </header>

        <nav aria-label="Enlaces" className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <Link
                className={`${styles.tile} ${styles.tilePrimary}`}
                href="/sobre-mi"
              >
                Conocé mi trabajo
              </Link>
            </li>
            <li>
              <a
                className={`${styles.tile} ${styles.tileWhatsapp}`}
                href={site.whatsappUrl}
              >
                <Icon name="whatsapp" />
                Hablemos por WhatsApp
              </a>
            </li>
            <li>
              <a
                className={`${styles.tile} ${styles.tileInstagram}`}
                href={site.instagramUrl}
              >
                <Icon name="instagram" />
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}
