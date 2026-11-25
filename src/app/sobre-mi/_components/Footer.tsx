import { cacheLife } from "next/cache";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.root}>
      <div className={`container ${styles.grid}`}>
        <Link className={styles.seal} href="/">
          <span className="visually-hidden">Volver al inicio</span>
          <Icon name="seal" />
        </Link>
        <div>
          <p className={styles.name}>Lucrecia Cornaglia</p>
          <p>Contadora Pública · Córdoba</p>
        </div>
        <ul className={styles.social}>
          <li>
            <a href={site.whatsappUrl}>WhatsApp</a>
          </li>
          <li>
            <a href={site.instagramUrl}>Instagram</a>
          </li>
        </ul>
        <p className={styles.legal}>
          © <BuildYear /> Lucrecia Cornaglia
        </p>
      </div>
    </footer>
  );
}

/** Year of the last build: cached so the page stays static (prerendering bans a bare `new Date()`). */
async function BuildYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}
