import React from "react";
import Template from "../Book/Template";
import { useParams } from "react-router-dom";

export default function Search() {
  const { search } = useParams();
  const apiLink = `http://localhost:5000/api/product/search/${search}`
  return <Template url={apiLink}></Template>;
}
