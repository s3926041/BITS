import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
const columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "condition", headerName: "Condition", width: 100 },
  { field: "result", headerName: "Result", width: 100 },
  {
    field: "gold",
    headerName: "Gold",
    type: "number",
    width: 90,
  },
  {
    field: "createdAt",
    headerName: "Time",
    type: "number",
    width: 300,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable({ id }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/api/sicbo/", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        });
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
}
