// API DOCS https://data.rijksmuseum.nl/object-metadata/api/
// Downloader https://github.com/Q42/SimpleOAIHarvester
// Example URL http://localhost:3000/api/art?color=6224CC

import axios from "axios";
import userPalette from "../../../public/userPalette.json";
import tinycolor from "tinycolor2";
import nearestColor from "nearest-color";

const RIJKSMUSEUM_API_KEY = process.env.RIJKSMUSEUM_API_KEY;
const getNearestColor = nearestColor.from(userPalette);

let database;

export default async function artApiHandler(req, res) {
  if (!database) {
    const response = await axios.get(`${getServerUrl()}/database.json`);
    database = response.data;
  }

  if (!req.query.color) {
    console.log("req.query.color", req.query.color);
    return res.status(400).json({ error: "Bad Request" });
  }

  const color = req.query.color;
  const artworks = database.filter((record) =>
    record?.nearestColorPalette?.includes(color)
  );

  artworks.length = 100;

  const results = [];
  for (const artwork of artworks) {
    if (artwork?.id && results.length <= 19) {
      try {
        const response = await axios.get(
          `https://www.rijksmuseum.nl/api/nl/collection/${artwork?.id}?key=${RIJKSMUSEUM_API_KEY}`
        );
        results.push(response.data);
      } catch (error) {
        console.log("ERROR", artwork?.id, JSON.stringify(error));
      }
    }
  }

  return res.status(200).json({ message: "OK", results: results });
}

/**
 * Utility functions
 */
export function isProduction() {
  // check for `now dev` environment first
  // because `now dev` sets AWS_LAMBDA_FUNCTION_NAME
  if (process.env.NOW_REGION === "dev1") return false;

  return Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
}

export function getServerUrl() {
  return isProduction()
    ? `https://rijks-palette-explorer.vercel.app`
    : `http://localhost:3000`;
}
