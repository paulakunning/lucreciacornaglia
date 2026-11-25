import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/icon-names";
import styles from "./Services.module.css";

const services: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "donut",
    title: "Costos, precios y rentabilidad",
    text: "Calcular costos, determinar precios y conocer el margen de cada producto o servicio.",
  },
  {
    icon: "bars",
    title: "Balances de gestión",
    text: "Preparar e interpretar información económica y contable para conocer la situación real del negocio.",
  },
  {
    icon: "knot",
    title: "Procesos y controles internos",
    text: "Ordenar circuitos administrativos e implementar herramientas informáticas.",
  },
  {
    icon: "growth",
    title: "Capacitación",
    text: "Capacitar a dueños y equipos para utilizar las herramientas implementadas y dar continuidad a los procesos.",
  },
];

export function Services() {
  return (
    <section className="section" aria-labelledby="services-title">
      <div className="container">
        <h2 id="services-title">¿En qué puedo ayudarte?</h2>
        <ul className={styles.list}>
          {services.map(({ icon, title, text }) => (
            <li key={title} className={styles.item}>
              <Icon name={icon} className={styles.icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
