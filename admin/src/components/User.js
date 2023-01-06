import * as React from "react";
import Table from "./Table";
let url = "http://localhost:5000/api/user/getall";

export default function Order() {
React.useEffect(()=>{},[])


  const arr = [
    "_id",
    "f_name",
    "username",
    "password",
    "email",
    "address",
    "gold",
    "isAdmin",
    "createdAt",

  ]
  return (
    <Table
      title={'User'}
      arr={arr}
      url={url}
    ></Table>
  );
}
