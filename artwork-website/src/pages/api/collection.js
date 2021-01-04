import axios from "axios";

const RIJKSMUSEUM_API_KEY = process.env.RIJKSMUSEUM_API_KEY;

export default async function artApiHandler2(req, res) {

  if (!req.query.artid) {
    return res.status(400).json({ error: "Bad Request" });
  }

  const artobject = req.query.artid;

  try {
    const result = await axios(
      `https://www.rijksmuseum.nl/api/nl/collection/${artobject}?key=${RIJKSMUSEUM_API_KEY}`
    )
    return res.status(200).json(result.data.artObject);

  } catch (error) {
    console.log("ERROR:", JSON.stringify(error));
    return res.status(400).json({ error: "Bad Request" });
  }


}

export function isProduction() {
  // check for `now dev` environment first
  // because `now dev` sets AWS_LAMBDA_FUNCTION_NAME
  if (process.env.NOW_REGION === "dev1") return false;

  return Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
}

export function getServerUrl() {
  return isProduction()
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:3000`;
}
