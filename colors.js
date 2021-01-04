const userPalette = require("./userPalette");
const fs = require("fs-extra");
const path = require("path");
const fg = require("fast-glob");
const parser = require("fast-xml-parser");
const isUrl = require("is-url");
const tinycolor = require("tinycolor2");
const ColorThief = require("colorthief");
const nearestColor = require("nearest-color").from(userPalette);

async function start() {
  const xmlFilePaths = await fg([
    path.join(process.cwd(), "SimpleOAIHarvester", "*.xml"),
  ]);

  xmlFilePaths.length = 1000;

  await fs.ensureDir(path.join(process.cwd(), "dist"));

  for (const xmlFilePath of xmlFilePaths) {
    const datum = await getArtworksData(xmlFilePath);
    const filePath = path.join(
      process.cwd(),
      "dist",
      `${path.parse(xmlFilePath).name}.json`
    );
    await fs.outputJson(filePath, datum);
  }
}
start();

async function getArtworksData(xmlFilePath) {
  const xmlBuffer = await fs.readFile(xmlFilePath);
  const xmlString = xmlBuffer.toString();

  const json = parser.parse(xmlString);

  const originalRecords = json["OAI-PMH"]["ListRecords"]["record"];

  let records = [];
  for (const record of originalRecords) {
    const artworkUrl = record["oai:metadata"]["oai_dc:dc"]["dc:format"][0];
    const id = record["oai:metadata"]["oai_dc:dc"]["dc:identifier"][1];

    if (isUrl(artworkUrl) && id) {
      const colors = await ColorThief.getPalette(artworkUrl, 5);

      const palette = colors.map((rgb) => {
        return tinycolor({ r: rgb[0], g: rgb[1], b: rgb[2] }).toHexString();
      });

      const nearestColorPalette = palette
        .map(nearestColor)
        .map((color) => color.name);

      console.log({
        artworkUrl,
        id,
        palette,
        nearestColorPalette,
      });
      records.push({
        artworkUrl,
        id,
        palette,
        nearestColorPalette,
      });
    }
  }
  return records;
}
