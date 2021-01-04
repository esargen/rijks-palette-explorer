import React from "react";
import userPalette from "../public/userPalette.json";
const tinycolor = require("tinycolor2");


const Colormenu = (props) => {
  const userPaletteArray = Object.keys(userPalette);
  const [active, setActive] = React.useState("");
  const [color, setColor] = React.useState("");

  const colorArray = (Array.isArray(userPaletteArray) === true) ?
    userPaletteArray.map((hue, index) =>
    <button
      value={hue}
      type="button"
      style={{ backgroundColor:hue }}
      className="color w-7 h-7 flex-shrink-0 border-4 border-white"
      onClick={() => setColor(hue)}
    ></button>)
    : ""


    const submitcolor = (event) => {
      event.preventDefault();
      props.submit(color);
      console.log(tinycolor.isReadable(color, "#fff"));
    }


  return (
    <form className="max-w-lg max-h-screen items-center" onSubmit={submitcolor}>
      <label>pick something hue-tiful</label>
      <div className="flex flex-wrap w-full">
      {colorArray}
      </div>
      <p className={"font-black p-2 my-2 w-56 text-center rounded-md"} style={{color:(((tinycolor.readability(color, "#fff")) >= 1.5) ? color : "black"), backgroundColor:(((tinycolor.readability(color, "#fff")) >= 1.5) ? "transparent " : color)}}>{color}</p>
      <button type="submit" style={{backgroundColor:color}} className="text-white p-2 text-bolded rounded-lg">Color me stoked!</button>
    </form>

  )
}

export default Colormenu;
