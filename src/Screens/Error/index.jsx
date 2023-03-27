import { Link } from "react-router-dom";
import styles from "./error.module.css";
export default function Error() {
  return (
    <>
      <div className={styles.htmlDiv}>
        <div className={styles.boduDiv}>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.bubble}></div>
          <div className={styles.main}>
            <h1>404</h1>
            <p>
              It looks like you're lost...
              <br />
              That's a trouble?
            </p>
            <Link to="/" className={styles.btn}>
              Go back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
