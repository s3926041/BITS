import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Details() {
  const [data, setData] = useState([]);
  const { orderId } = useParams();

  const apiCall = async () => {
    await axios
      .get(`http://localhost:5000/api/order/details/${orderId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data);
        products = data.products
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    apiCall();
  }, []);
  let products = []
  return (
    <div>
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
                          <hr />
                          {data !== null &&
                           data.products.map((item) => {
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
                                          <h5 className="mb-0">
                                            {item.price}$
                                          </h5>
                                        </div>
                                        <a
                                          href="#!"
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

                              <form className="mt-4">
                                <div className="form-outline form-white mb-4">
                                  <input
                                    type="text"
                                    id="typeName"
                                    className="form-control form-control-lg no_border"
                                    size={17}
                                    placeholder="Full Name"
                                  />

                                  <div className="form-notch">
                                    <div
                                      className="form-notch-leading"
                                      style={{ width: "9px" }}
                                    />
                                    <div
                                      className="form-notch-middle"
                                      style={{ width: "117.6px" }}
                                    />
                                    <div className="form-notch-trailing" />
                                  </div>
                                </div>
                                <div className="form-outline form-white mb-4">
                                  <input
                                    type="text"
                                    id="1"
                                    className="form-control form-control-lg no_border"
                                    size={17}
                                    placeholder="Address"
                                  />
                                  <div className="form-notch">
                                    <div
                                      className="form-notch-leading"
                                      style={{ width: "9px" }}
                                    />
                                    <div
                                      className="form-notch-middle"
                                      style={{ width: "84.8px" }}
                                    />
                                    <div className="form-notch-trailing" />
                                  </div>
                                </div>
                              </form>
                              <hr className="my-4" />
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Subtotal</p>
                                {/* <p className="mb-2">${price}</p> */}
                              </div>
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Shipping</p>
                                <p className="mb-2">$20.00</p>
                              </div>
                              <div className="d-flex justify-content-between mb-4">
                                <p className="mb-2">Total</p>
                                {/* <p className="mb-2">${price + 20}</p> */}
                              </div>
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
    </div>
  );
}
