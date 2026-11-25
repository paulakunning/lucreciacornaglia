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
        <h2 id="contact-title">¿Hablamos?</h2>
        <p className={styles.question}>
          ¿Vendés, trabajás, pero no tenés claro cuánto te queda realmente?
        </p>
        <p>
          Revisemos tus costos, precios y gastos para entender qué está pasando
          con tus resultados.
        </p>
        <p>Escribime y lo vemos juntos.</p>
        <div className={styles.actions}>
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
