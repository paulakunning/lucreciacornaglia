import { Button } from "@/components/Button";
import { Isotype } from "@/components/Isotype";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <Isotype className={styles.isotype} />
      <h1 className={styles.title}>No encontramos esta página</h1>
      <Button href="/" variant="primary">
        Volver al inicio
      </Button>
    </main>
  );
}
