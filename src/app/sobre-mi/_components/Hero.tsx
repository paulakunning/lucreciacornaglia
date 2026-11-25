import { BackgroundImage } from "@/components/BackgroundImage";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";
import background from "@/assets/images/hero-bg.jpg";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`section ${styles.root}`}>
      <BackgroundImage
        src={background}
        overlay="rgb(255 248 232 / 0.58)"
        priority
      />
      <Icon name="isotype" className={styles.shape} />
      <div className={`container ${styles.content}`}>
        <div className={styles.bar}>
          <p className={styles.logo}>
            <span className="visually-hidden">
              Lucrecia Cornaglia, costos y rentabilidad
            </span>
            <Icon name="wordmark" />
          </p>
          <nav className={styles.nav} aria-label="Contacto">
            <a className={styles.navLink} href={site.instagramUrl}>
              Instagram
            </a>
            <Button
              href={site.whatsappUrl}
              variant="primary"
              size="sm"
              icon="whatsapp"
            >
              Hablemos por WhatsApp
            </Button>
          </nav>
        </div>
        <h1 className={styles.title}>
          <span>De entender los números</span> <span>a mejorar la gestión</span>
        </h1>
        <p className={styles.lead}>
          Acompaño a empresas y productores a analizar sus costos, precios y
          resultados <strong>para mejorar su gestión</strong>.
        </p>
        <Button href={site.whatsappUrl} variant="primary" icon="whatsapp">
          Hablemos por WhatsApp
        </Button>
      </div>
    </section>
  );
}
