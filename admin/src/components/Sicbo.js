import * as React from "react";
import Table from "./Table";
let url = "http://localhost:5000/api/sicbo/all";

export default function Sicbo() {
React.useEffect(()=>{},[])


  const arr = [
    "_id",
    "userId",
    "gold",
    "dice1",
    "dice2",
    "dice3",
    "result",
    "condition",
    "createdAt",

  ]
  return (
    <Table
      title={'Sicbo'}
      arr={arr}
      url={url}
    ></Table>
  );
}
