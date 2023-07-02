import styles from "./page.module.css";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <main className={styles.main}>
      <NavBar/>
      <div className={styles.container}>
        <div className={styles.center}>
          <div className={styles.container1}>
            <h1 className={styles.title}>
              Welcome to <a href="/">TruecallerJS!</a>
            </h1>

            <p>
              A library for effortless retrieval of phone number details using
              the Truecaller API in Node.js, JavaScript, and TypeScript
              projects.
            </p>
          </div>
        </div>
        <div className={styles.grid}>
          <a href="/login" className={styles.button} target="_blank">
            Login
          </a>
          <a href="/docs" className={styles.button} target="_blank">
            Docs
          </a>
        </div>
      </div>
    </main>
  );
}
