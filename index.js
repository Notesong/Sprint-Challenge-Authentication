const server = require("./api/server.js");

if (!module.parent) {
  const PORT = process.env.PORT || 3300;
  server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
  });
}

module.exports = server;
