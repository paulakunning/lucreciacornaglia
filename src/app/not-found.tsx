import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Isotype } from "@/components/Isotype";
import { site } from "@/lib/site";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: `No encontramos esta página | ${site.name}`,
};

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
