import axios from "axios";
import React from "react";
import queryString from "query-string";
import { useRouter } from 'next/router';


export default function Thiscollection() {

  const router = useRouter()
  const { collection } = router.query;

  const [artistWork, setArtistWork] = React.useState();

  const collection = props.collection;
  console.log(props);
  React.useEffect(() => {
    const url = queryString.stringifyUrl({
      url: `/api/collection`,
      query: collection,
    });

    axios.get(url).then((response) =>
      setArtistWork(response.data.results)
    )
  }
  ,[]);

  return (
    <div>
      <img src={props.image} />
    </div>
  )
}
