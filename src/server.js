import { initializeApp } from "./app";
import { log } from "./utils/logging.js";

const app = initializeApp();

const port = process.env.PORT || 4001;
const host = "0.0.0.0";

const server = app.listen(port, host, () => {
  log.info(`App listening on port: ${server.address().port}`);
});
