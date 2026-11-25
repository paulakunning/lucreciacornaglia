import { Icon } from "@/components/Icon";
import styles from "./Method.module.css";

const steps = [
  {
    title: "Nos conocemos",
    text: "Tenemos una primera charla sin costo para conversar sobre tu negocio y qué te gustaría analizar o mejorar.",
  },
  {
    title: "Definimos la propuesta",
    text: "Te explico qué podemos hacer, cómo lo vamos a desarrollar y qué incluye el servicio.",
  },
  {
    title: "Analizamos la información",
    text: "Reviso los datos de tu negocio, identifico aspectos relevantes y te presento recomendaciones concretas.",
  },
];

export function Method() {
  return (
    <section className="section" aria-labelledby="method-title">
      <div className="container">
        <h2 id="method-title">Cómo trabajo</h2>
        <p className={styles.intro}>
          No trabajo con fórmulas prearmadas. Dedico tiempo a conocer cada
          empresa y a trabajar junto a sus dueños y equipos.
        </p>
        <ol className={styles.steps}>
          {steps.map(({ title, text }, i) => (
            <li key={title} className={styles.step}>
              <span className={styles.number} aria-hidden="true">
                {i + 1}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <div className={styles.footer}>
          <div>
            <p>
              A partir de ese análisis, podemos seguir con la implementación de
              herramientas, la capacitación de tu equipo o revisiones
              posteriores.
            </p>
            <p>
              La modalidad es personalizada, presencial u online, según cada
              situación.
            </p>
          </div>
          <aside className={styles.note}>
            <Icon name="knot" className={styles.noteIcon} />
            <p>
              <strong>
                Mi consultoría complementa el trabajo de tu estudio contable, no
                lo reemplaza.
              </strong>{" "}
              Podemos colaborar para que cuentes con información útil para
              gestionar y tomar decisiones.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
