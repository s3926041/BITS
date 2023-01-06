import * as React from "react";
import Table from "./Table";
let url = "http://localhost:5000/api/blog/all";

export default function Blog() {
React.useEffect(()=>{},[])


  const arr = [
    "_id",
    "userId",
    "author",
    "title",
    "status",
    "createdAt",
    "confirm"
  ]
  return (
    <Table
      title={'Blog'}
      arr={arr}
      url={url}
      urlverify={   "http://localhost:5000/api/blog/confirm/"}
    ></Table>
  );
}
