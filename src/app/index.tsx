import { Routing } from "../pages/index";
import { withProviders } from "./providers";
import styles from "./app.module.scss";
import { Alert } from "@entities/alert/ui";

const App = () => {
  return (
    <div className={styles.app}>
      <Alert />
      <Routing />
    </div>
  );
};

export default withProviders(App);
