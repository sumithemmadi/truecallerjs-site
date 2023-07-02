import styles from '../page.module.css'

export default function NavBar() {
  return (
    <div className={styles.description}>
      <div>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>TruecallerJS</span>
        </a>
      </div>
      <div>
        <p>menu</p>
      </div>
    </div>
  );
}
