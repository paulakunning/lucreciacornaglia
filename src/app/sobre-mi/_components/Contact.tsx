import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section
      className={`section ${styles.root}`}
      aria-labelledby="contact-title"
    >
      <Icon name="growth" className={styles.shape} />
      <div className="container">
        <h2 id="contact-title" data-reveal>
          ¿Hablamos?
        </h2>
        <p className={styles.question} data-reveal>
          ¿Vendés, trabajás, pero no tenés claro cuánto te queda realmente?
        </p>
        <p data-reveal>
          Revisemos tus costos, precios y gastos para entender qué está pasando
          con tus resultados.
        </p>
        <p data-reveal>Escribime y lo vemos juntos.</p>
        <div className={styles.actions} data-reveal>
          <Button
            href={site.whatsappUrl}
            variant="primary"
            onDark
            icon="whatsapp"
          >
            Hablemos por WhatsApp
          </Button>
          <Button href={site.instagramUrl} onDark icon="instagram">
            Conoceme en Instagram
          </Button>
        </div>
      </div>
    </section>
  );
}
