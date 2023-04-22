import { withRouter } from "./with-router";
import compose from "compose-function";
import { withStore } from "./with-store";

export const withProviders = compose(withRouter, withStore);
