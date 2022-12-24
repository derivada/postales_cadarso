import React from "react";
import { useParams } from "react-router-dom";
import PostalDisplay from "../components/PostalDisplay";


export default function Postal() {
  const { key } = useParams();
  const postalRef = React.createRef();
  return (
    <React.Fragment>

      <PostalDisplay postal_key={key} ref={postalRef}/>
    </React.Fragment>
  );
}

