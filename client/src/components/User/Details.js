import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField } from "@mui/material";

export default function Details() {
  const { userGlobal } = useContext(AuthContext);
  const { authState, setAuthState } = userGlobal;
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
        console.log(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    apiCall();
  }, []);
  if (!authState.status) {
    return <Navigate to="/home"></Navigate>;
  }
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
                          {data.products !== null &&
                            data.products?.map((item) => {
                              return (
                                <div
                                  className="card my-3 mb-lg-0 no_border"
                                  key={item._id}
                                >
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
                                  disabled
                                />
                                <TextField
                                  label="Address"
                                  type="text"
                                  className="m-3"
                                  disabled
                                />
                                <TextField
                                  label="Phone number"
                                  type="text"
                                  className="m-3"
                                  disabled
                                />
                                <TextField
                                  label="Email"
                                  type="text"
                                  className="m-3"
                                  disabled
                                />
                              </form>
                              <hr className="my-4" />
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Subtotal</p>
                                <p className="mb-2">${data.price}</p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Shipping</p>
                                <p className="mb-2">$20.00</p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Gold Applied</p>
                                <p className="mb-2">{data.gold ? data.gold : 0}</p>
                              </div>
                              <div className="d-flex justify-content-between mb-4">
                                <p className="mb-2">Total</p>
                                <p className="mb-2">${data.price + 20}</p>
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
