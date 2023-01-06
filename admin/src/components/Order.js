import * as React from "react";
import axios from "axios";
import Table from "./Table";
let url = "http://localhost:5000/api/order/generalAdmin";
// const h = [
//   {},
//   {
//     id: "calories",
//     numeric: true,
//     disablePadding: false,
//     label: "Calories",
//   },
//   {
//     id: "fat",
//     numeric: true,
//     disablePadding: false,
//     label: "Fat (g)",
//   },
//   {
//     id: "carbs",
//     numeric: true,
//     disablePadding: false,
//     label: "Carbs (g)",
//   },
//   {
//     id: "protein",
//     numeric: true,
//     disablePadding: false,
//     label: "Protein (g)",
//   },
// ];

export default function Order() {
React.useEffect(()=>{},[])


  const arr = [
    "_id",
    "userId",
    "address",
    "price",
    "status",
    "createdAt",
    "confirm"
  ]
  return (
    <Table
      title={'Orders'}
      arr={arr}
      url={url}
      urlverify = {   "http://localhost:5000/api/order/confirm/"}
    ></Table>
  );
}
