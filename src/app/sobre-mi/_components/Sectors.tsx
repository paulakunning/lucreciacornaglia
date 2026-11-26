import { BackgroundImage } from "@/components/BackgroundImage";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/icon-names";
import background from "@/assets/images/sectors-bg.jpg";
import styles from "./Sectors.module.css";

const sectors: { icon: IconName; name: string; focus: string }[] = [
  {
    icon: "sector-agro",
    name: "Agro y productores",
    focus: "Costos de producción y resultado por actividad.",
  },
  {
    icon: "sector-retail",
    name: "Comercios",
    focus: "Precios, margen por producto y gastos de estructura.",
  },
  {
    icon: "sector-services",
    name: "Servicios",
    focus: "Costo laboral, horas y tarifas.",
  },
  {
    icon: "sector-industry",
    name: "Producción e industrias",
    focus: "Costos de materiales, mano de obra y gastos indirectos.",
  },
  {
    icon: "sector-ecommerce",
    name: "E-commerce y Mercado Libre",
    focus: "Comisiones, envíos y margen real por venta.",
  },
];

export function Sectors() {
  return (
    <section
      className={`section ${styles.root}`}
      aria-labelledby="sectors-title"
    >
      <BackgroundImage src={background} overlay="rgb(166 212 174 / 0.42)" />
      <div className={`container ${styles.inner}`}>
        <h2 id="sectors-title" data-reveal>
          ¿Con quiénes trabajo?
        </h2>
        <dl>
          {sectors.map(({ icon, name, focus }) => (
            <div key={name} className={styles.sector} data-reveal>
              <dt>
                <span className={styles.icon}>
                  <Icon name={icon} />
                </span>
                {name}
              </dt>
              <dd>{focus}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
