const app = require("./app");
const http = require("http");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(3003, () => {
  logger.info(`Server running on port 3003`);
});
