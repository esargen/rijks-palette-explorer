import axios from 'axios';
import React from 'react';
import Image from 'next/image';
import queryString from "query-string";
import Link from "next/link";
import Router from 'next/router'


const Artbio = (props) => {
  const [artselect, setArtselect] = React.useState();
  const artid = props.imageSelect;
  console.log(artid);

  function reload() {
    Router.reload(window.location.pathname);
  }

  React.useEffect(() => {
      const url = queryString.stringifyUrl({
        url: `/api/collection`,
        query: {artid}
      });

      props.setLoading(true);

      axios.get(url).then((response) => {
        setArtselect(response)
        props.setLoading(false)
      }
      );
    }, []);

    return (
      <div style={{backgroundColor: props.colorpick}} className="md:flex flex-wrap w-screen h-96 md:min-h-screen block">
        <a className="bg-white absolute text-sm p-2 cursor-pointer m-4" onClick={reload}>Pick another</a>
        <div className="md:w-5/12 h-1/2 w-full md:h-full overflow-hidden">
          <img className="h-screen mx-auto max-w-screen-lg" src={artselect?.data.webImage.url} />
        </div>
        <div className="bg-white p-14 border-black w-full h-auto md:w-4/12 md:h-full shadow-xl relative z-10 overflow-hidden">
          <div className="mt-36">
            <div className="flex flex-wrap mb-8 max-w-8/12">
            {artselect?.data.colors.map((resultcolor, index) => (
              <div className="palettecolor w-14 h-8"style={{backgroundColor: resultcolor.hex}}>
                <p>{resultcolor.hex}</p>
              </div>
            ))}
            </div>
            <h1 className="font-thin text-6xl mb-4 uppercase">{artselect?.data.title}</h1>
            <p className="text-md text-gray-300 mb-14 font-bold text-2xl lowercase">{artselect?.data.principalMaker}</p>
            <p className="text-md text-gray-500">{artselect?.data.plaqueDescriptionEnglish}</p>
            <br />
            <a className="box-border g-white border-black border-2 rounded-sm p-2" target="blank_" href={"https://www.rijksmuseum.nl/nl/collectie/" + artselect?.data.objectNumber}>Learn more</a>
          </div>
        </div>
      </div>
    )
}

export default Artbio;
