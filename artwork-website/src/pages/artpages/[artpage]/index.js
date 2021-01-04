import axios from "axios";
import React from "react";
import queryString from "query-string";
import { useRouter } from 'next/router';


export default function Artpage({ query }) {

  const router = useRouter()
  const { artpage } = query;

  const [artistWork, setArtistWork] = React.useState();

  React.useEffect(() => {
    const url = queryString.stringifyUrl({
      url: `../../../api/collection`,
      query: query,
    });

    axios.get(url).then((response) => {
      setArtistWork(response.data.results),
      console.log(artistWork)
    })
  }
  ,[]);

  return (
    <div>
      {JSON.stringify(artistWork)}
    </div>
  )
}
