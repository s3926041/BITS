import { useState, useEffect } from "react";
import axios from "axios";
import Pagnition from "./Pagnition";
import SelectForm from "./SelectForm";
export default function Template({ url }) {
  const ascAlphabet = (a, b) => {
    return a.title.localeCompare(b.title);
  };
  const desAlphabet = (a, b) => {
    return -a.title.localeCompare(b.title);
  };
  const desPrice = (a, b) => {
    if (a.price > b.price) {
      return -1;
    }
    if (a.price < b.price) {
      return 1;
    }
    return 0;
  };
  const ascPrice = (a, b) => {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  };
  const arrOfFunction = [ascAlphabet, desAlphabet, ascPrice, desPrice];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [request,setRequest] = useState({
    sort:0,
    curPage:1
  })
  const itemPerPage = 4;
  const changeRequest = (value,value2) => {
    setRequest({sort:value,curPage:value2});
  };

  let indexOflast = request.curPage * itemPerPage;
  let indexOfFirst = indexOflast - itemPerPage;
  let curData = data.slice(indexOfFirst, indexOflast);
  let curSort = arrOfFunction[request.sort];
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        setData(response.data.sort(curSort));
        setLoading(false);
      });
  }, [request]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [request]);
  return (
    <div>
      <SelectForm sort={request.sort} setRequest={changeRequest}></SelectForm>
      {JSON.stringify(curData)}
      <Pagnition
        sort ={request.sort}
        itemPerPage={itemPerPage}
        totalItem={data.length}
        setRequest={changeRequest}
        curPage={request.curPage}
      ></Pagnition>
    </div>
  );
}
