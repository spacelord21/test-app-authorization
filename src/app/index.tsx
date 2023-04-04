import { Routing } from "../pages/index";
import { withProviders } from "./providers";
import styles from "./app.module.scss";

const App = () => {
  return (
    <div className={styles.app}>
      <Routing />
    </div>
  );
};

export default withProviders(App);
