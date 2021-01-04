import axios from "axios";
import queryString from "query-string";
import React from "react";
import userPalette from "../../public/userPalette.json";
import Mainmenu from "../../components/mainmenu";
import Artbio from "../../components/artbio";
import Link from "next/link";

export default function Home() {
  const [results, setResults] = React.useState();
  const [loading, setLoading] = React.useState(false)
  const [colorPick, setColorPick] = React.useState("pink");
  const [imageSelect, setimageSelect] = React.useState("");


const submit = (color) => {
    console.log(color);
    setColorPick(color);
    const url = queryString.stringifyUrl({
      url: `/api/art`,
      query: {
        color,
      },
    });

    setLoading(true);

    axios.get(url).then((response) => {
      setResults(response.data.results),
      setLoading(false)
    }
    );
    console.log(results)
  };

  const Loader = () => {

  }

  return (
  (imageSelect === "") ?
  <Mainmenu colorpick={colorPick} submit={submit} results={results} colorPick={colorPick} loading={loading} setimageSelect={setimageSelect} />
  : <Artbio imageSelect={imageSelect} colorpick={colorPick} setLoading={setLoading}/>

  );
}
