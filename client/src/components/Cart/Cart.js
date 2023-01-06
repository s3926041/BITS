import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../helpers/AuthContext";
import { TextField } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Cart() {
  const { cartGlobal, userGlobal } = useContext(AuthContext);
  const [gold, setGold] = useState(0);
  let [cart, setCart] = useState(null);
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("group100_cart")));
  }, [cartGlobal.cart]);

  let quantity = 0;
  let price = 0;
  if (cart !== null) {
    for (let key in cart) {
      if (cart.hasOwnProperty(key)) {
        quantity += parseInt(cart[key]["quantity"]);
        price += parseInt(cart[key]["price"])*parseInt(cart[key]["quantity"]);
        console.log(cart[key]["price"])
      }
    }
  }
  const changeGold = (e) => {
    if (isNumeric(e.target.value)) {
      if (e.target.value >= price + 20) {
        setGold(price + 20);
        e.target.value = price + 20;
      }
      else
      setGold(e.target.value);
    } else setGold(0);
  };
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const post = async () => {
    await axios
      .post(
        "http://localhost:5000/api/order/place",
        { arr: JSON.parse(localStorage.getItem("group100_cart")), gold,goldall:userGlobal.authState.gold },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("group100_cart");
        cartGlobal.setCart(0);
        toast.success(`🦄 Order has been placed!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error(`🦄 You need to login first!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  const handleClick = (e) => {
    if (cart !== null) {
      post();
    } else {
      toast.error(`🦄 Cart is empty!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div>
      <section className="">
        <div className="bg-white">
          <section className="w-100" style={{ backgroundColor: "#eee" }}>
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-lg-7">
                        <h5 className="mb-3">
                          <a href="/books" className="text-body">
                            Continue shopping
                          </a>
                        </h5>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <p className="mb-1">Shopping cart</p>
                            <p className="mb-0">
                              You have {quantity} items in your cart
                            </p>
                          </div>
                        </div>

                        {cart !== null &&
                          Object.keys(cart).map((key) => {
                            let item = cart[key];
                            return (
                              <div className="card my-3 mb-lg-0 no_border">
                                <div className="card-body">
                                  <div className="d-md-flex justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                      <div>
                                        <img
                                          src={item.img}
                                          className="img-fluid"
                                          alt="Shopping item"
                                          style={{
                                            width: "65px",
                                            height: "100px",
                                          }}
                                        />
                                      </div>
                                      <div className="ms-3">
                                        <span
                                          className="small limit_txt fw-bold"
                                          style={{ width: "150px" }}
                                        >
                                          {item.title}
                                        </span>
                                        <p className="small mb-0">
                                          By {item.author}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                      <div style={{ width: "50px" }}>
                                        <h5 className="fw-normal mb-0">
                                          {item.quantity}
                                        </h5>
                                      </div>
                                      <div style={{ width: "100px" }}>
                                        <h5 className="mb-0">{item.price}$</h5>
                                      </div>
                                      <a
                                        onClick={() => {
                                          let t = cart;
                                          delete t[key];
                                          localStorage.setItem(
                                            "group100_cart",
                                            JSON.stringify(t)
                                          );
                                          cartGlobal.setCart(
                                            cartGlobal.cart - item.quantity
                                          );
                                        }}
                                        style={{ color: "#cecece" }}
                                      >
                                        <i className="fas fa-trash-alt" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <div className="col-lg-5">
                        <div className="card bgF1F6F7  no_border">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <h5 className="mb-0">Billing Details</h5>
                            </div>

                            <form className="mt-4 flex flex-col">
                              <TextField
                                label="Full Name"
                                type="text"
                                className="m-3"
                                defaultValue={1}
                                required
                              />
                              <TextField
                                label="Address"
                                type="text"
                                className="m-3"
                                required
                              />
                              <TextField
                                label="Phone number"
                                type="text"
                                className="m-3"
                                required
                              />
                              <TextField
                                label="Email"
                                type="text"
                                className="m-3"
                                required
                              />
                              <TextField
                                label="Gold Apply"
                                type="text"
                                className="m-3"
                                onChange={changeGold}
                                required
                              />
                            </form>
                            <hr className="my-4" />
                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Subtotal</p>
                              <p className="mb-2">${price}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Shipping</p>
                              <p className="mb-2">$20.00</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Total</p>
                              <p className="mb-2">
                                $
                                {price + 20 - parseInt(gold) < 0
                                  ? 0
                                  : price + 20 - parseInt(gold)}
                              </p>
    
                            </div>{price !== 0 &&                             <p className="mb-2">You will receive {Math.floor(price/100)} Gold when order verified!</p>}

                            <button
                              type="button"
                              className="btn bgfff border btn-block btn-lg no_border"
                            >
                              <div
                                className="d-flex justify-content-between"
                                onClick={handleClick}
                              >
                                <span>Order</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
