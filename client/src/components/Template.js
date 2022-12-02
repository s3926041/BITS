import { useState, useEffect } from "react";
import axios from "axios";
import Pagnition from "./Pagnition";
import { MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import SelectForm from "./SelectForm";
import { toast } from "react-toastify";
export default function Template({ url }) {
  const defaultSort = (a, b) => {
    return 0;
  };
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
  const notify = () =>
    toast.success("🦄 Added to cart!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const arrOfFunction = [ascAlphabet, desAlphabet, ascPrice, desPrice];
  const { cartGlobal } = useContext(AuthContext);
  const { cart, setCart } = cartGlobal;
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState({
    sort: 0,
    curPage: 1,
  });
  const changeRequest = (value, value2) => {
    setRequest({ sort: value, curPage: value2 });
  };
  const itemPerPage = 12;
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
        console.log(response.data)
        // setLoading(false);
      });
  }, [request]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [request]);
  return (
    <div className="p-5 d-flex flex-column justify-content-center align-items-center">
      <div className="d-md-flex w-100 justify-content-between m-3 align-items-center">
        {" "}
        <h5>
          {data.length} Results - Page {request.curPage}
        </h5>
        <SelectForm sort={request.sort} setRequest={changeRequest}></SelectForm>
      </div>

      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 w-100">
        {curData.map((item, i) => {
          let price = "";
          item.price === 0 ? (price = "Contact us") : (price = item.price);
          return (
            <div className="border">
              <div
                className="col p-3 d-flex flex-column justify-content-center align-items-center"
                key={i}
              >
                <a href={`/book/${item._id}`}>
                  <img
                    src={item.img}
                    className="cardimg m-3 book_img"
                    alt="book_img"
                  ></img>
                </a>
                <MDBCardBody>
                  <MDBCardTitle className="limit_txt my-3">
                    {item.title}
                  </MDBCardTitle>
                  <div className="d-flex justify-content-between align-items-center">
                    {" "}
                    <h5 className="price">
                      {price === "Contact us" ? price : `${price / 1000}$`}
                    </h5>
                    <button class="button-9" onClick={() => {
                    if (localStorage.getItem("group100_cart") === null) {
                      localStorage.setItem("group100_cart", JSON.stringify({}));
                    }
                    let arr = JSON.parse(localStorage.getItem("group100_cart"));
                    let id = item._id;
                    console.log(id);
                    if (id in arr) {
                      arr[id].quantity += 1;
                    } else {
                      arr[id] = {
                        quantity: 1,
                        img: item.img,
                        title: item.title,
                        price: item.price,
                        author: item.author
                      };
                    }
                    setCart(cart + 1);
                    localStorage.setItem("group100_cart", JSON.stringify(arr));
                    notify()
                  }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-cart"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>
                    </button>
                  </div>
                </MDBCardBody>
              </div>
            </div>
          );
        })}
      </div>
      <div className="m-3">
        <Pagnition
          sort={request.sort}
          itemPerPage={itemPerPage}
          totalItem={data.length}
          setRequest={changeRequest}
          curPage={request.curPage}
        ></Pagnition>
      </div>
    </div>
  );
}
