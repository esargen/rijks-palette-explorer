import Image from "next/image";
import React from "react";
import Colormenu from "./colormenu";



const Mainmenu = (props) => {

  return (
  <main style={{borderColor:props.colorpick}} className="pt-8 pl-14 min-h-screen block md:flex flex-wrap justify-between">
    <div className="max-w-6/12">
      <div className="mb-8">
        <h1 className="header font-black">palett<span className="italic font-semibold">able</span></h1>
        <p className="text-md text-justify text-gray-600 ml-8 max-w-sm">dispatches from the <a href="https://data.rijksmuseum.nl/object-metadata/api/" className="font-bold" target="blank_">Rijksmuseum API</a>. search for art objects by your favorite nonthreatening neutral color and find palette inspiration for your next big proj!</p>
      </div>
      <Colormenu submit={props.submit}/>
    </div>
    <div className="w-6/12 mr-10">
      {props.loading ?
        <div className="h-48 w-48 overflow-none relative">
          <Image src="/bnutman.gif" layout="fill"/>
        </div>
        :
        <div className="w-full mt-14">
          <div className="flex flex-wrap items-center">
          {props.results &&
            props.results.map((record) => (
              <div className="artobject" target="blank_" onClick={() => props.setimageSelect(record.artObject.objectNumber)}>
                <img
                  src={record.artObject.webImage.url}
                />
              <div className="flex">
              {record.artObject.colors.map((resultcolor, index) => (
                <div className="w-14 h-8"style={{backgroundColor: resultcolor.hex}}></div>
              ))}
              </div>
              </div>
            ))}
          </div>
      </div>
    }
    </div>
  </main>
  )
}


export default Mainmenu;
