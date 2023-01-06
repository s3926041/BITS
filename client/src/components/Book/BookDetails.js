import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comment from "../Comment.js/Comment";
import { AuthContext } from "../../helpers/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";
const product = {
  highlights: ["", "", "", ""],
};

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 300) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BookDetails() {
  const { cartGlobal } = useContext(AuthContext);
  const { cart, setCart } = cartGlobal;
  let { id } = useParams();
  let apiLink = `http://localhost:5000/api/product/find/${id}`;
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(apiLink);
      setData(req.data);
      console.log(req.data);
      return req;
    }
    fetchData();
  }, []);
  // return <div>{JSON.stringify(data)}</div>;
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
  return (
    <div className="bg-white">
      <div className="pt-6 ">
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {data.title}
            </h1>
            <h3 className="text-lg my-4 font-bold tracking-tight text-gray-900 sm:text-xl">
              {" "}
              {data.author}{" "}
            </h3>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <div className="w-full flex items-center justify-center">
              <img src={data.img} className="h-[400px]" alt="" />
            </div>

            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900 mt-10">
              ${data.price}
            </p>

            <button
              onClick={() => {
                if (localStorage.getItem("group100_cart") === null) {
                  localStorage.setItem("group100_cart", JSON.stringify({}));
                }
                let arr = JSON.parse(localStorage.getItem("group100_cart"));
                let id = data._id;
                if (id in arr) {
                  arr[id].quantity += 1;
                } else {
                  arr[id] = {
                    quantity: 1,
                    img: data.img,
                    title: data.title,
                    price: data.price,
                    author: data.author,
                  };
                }
                setCart(cart + 1);
                localStorage.setItem("group100_cart", JSON.stringify(arr));
                notify();
              }}
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to cart
            </button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <div className="space-y-6">
                <h2 className="">Description</h2>
                <p className="text-base text-gray-900">
                  <ReadMore>{`${data.desc}`}</ReadMore>
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">Lorem Ipsum</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  Curabitur vitae orci quis velit maximus iaculis nec id orci.
                  Duis id sapien a urna bibendum rhoncus. Sed aliquet dictum
                  efficitur. Quisque sed tincidunt leo, at placerat libero.
                  Praesent ullamcorper suscipit urna at lobortis. Sed vel
                  vulputate lacus. Morbi non sagittis quam, eu bibendum ligula.
                  Aenean ultrices fermentum augue aliquam posuere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Comment id={id}></Comment>
    </div>
  );
}
