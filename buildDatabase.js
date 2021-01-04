const fs = require("fs-extra");
const path = require("path");
const fg = require("fast-glob");

async function start() {
  const jsonPaths = await fg([path.join(process.cwd(), "dist", "*.json")]);

  let data = [];
  for (const jsonPath of jsonPaths) {
    let datum = await fs.readJson(jsonPath);
    data = data.concat(datum);
  }
  await fs.outputJson("database.json", data);
}
start();
