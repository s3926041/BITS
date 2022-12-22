import { useState, useEffect } from "react";
import axios from "axios";
import Pagnition from "./Pagnition";
// import { MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import SelectForm from "../SelectForm";
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
      position: "top-center",
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
    axios.get(url).then((response) => {
      setData(response.data.sort(curSort));
      // setLoading(false);
    });
  }, [request]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [request]);
  return (
    <div className="bg-white">
      <div className="">
        <div className="mx-auto max-w-2xl py-6  px-4 sm:px-6 lg:max-w-7xl lg:px-8 flex justify-between items-center">
          <div className="flex justify-between items-center w-full">
            <span>
              {data.length} Results - Page {request.curPage}
            </span>
            <div className="flex items-center "><span className="mr-4">Sort: </span> <SelectForm sort={request.sort} setRequest={changeRequest}></SelectForm></div>
           
          </div>
        </div>
        <div className="mx-auto max-w-2xl  px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">items</h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            {curData.map((item) => (
              <div key={item._id} className="group">
           
                <a href={`/book/${item._id}`}>

                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 ">
                  <img
                    src={item.img}
                    className="w-full object-cover object-center hover:opacity-75 cardimg"
                  />
                </div>
                </a>
                <h3 className="mt-4 text-sm text-gray-700 limit_txt">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center pt-2">
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {item.price}
                  </p>
                  <button
                   onClick={() => {
                    if (localStorage.getItem("group100_cart") === null) {
                      localStorage.setItem(
                        "group100_cart",
                        JSON.stringify({})
                      );
                    }
                    let arr = JSON.parse(
                      localStorage.getItem("group100_cart")
                    );
                    let id = item._id;
                    if (id in arr) {
                      arr[id].quantity += 1;
                    } else {
                      arr[id] = {
                        quantity: 1,
                        img: item.img,
                        title: item.title,
                        price: item.price,
                        author: item.author,
                      };
                    }
                    setCart(cart + 1);
                    localStorage.setItem(
                      "group100_cart",
                      JSON.stringify(arr)
                    );
                    notify();
                  }}
              type="submit"
              className="flex max-w-[100px] items-center justify-center rounded-md border border-transparent bg-indigo-600 mx-2  px-4 py-2  text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
            <ShoppingCartIcon></ShoppingCartIcon>
            </button>
     
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 w-100">
        {curData.map((item, i) => {
          let price = "";
          item.price === 0 ? (price = "Contact us") : (price = item.price);
          return (
            <div className="border" key={i}>
              <div className="col p-3 d-flex flex-column justify-content-center align-items-center">
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
                    <button
                      className="button-9"
                      onClick={() => {
                        if (localStorage.getItem("group100_cart") === null) {
                          localStorage.setItem(
                            "group100_cart",
                            JSON.stringify({})
                          );
                        }
                        let arr = JSON.parse(
                          localStorage.getItem("group100_cart")
                        );
                        let id = item._id;
                        if (id in arr) {
                          arr[id].quantity += 1;
                        } else {
                          arr[id] = {
                            quantity: 1,
                            img: item.img,
                            title: item.title,
                            price: item.price,
                            author: item.author,
                          };
                        }
                        setCart(cart + 1);
                        localStorage.setItem(
                          "group100_cart",
                          JSON.stringify(arr)
                        );
                        notify();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-cart"
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
      </div> */}
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
