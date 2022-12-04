import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/order/general", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="overflow-hidden bg-white shadow  w-[full] lg:w-[500px]">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Username's Profile
          </h3>
          <p className=" max-w-2xl text-sm text-gray-500">Personal details</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className=" text-sm text-gray-900 sm:col-span-2 sm:mt-0">

              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className=" text-sm text-gray-900 sm:col-span-2 sm:mt-0">

              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className=" text-sm text-gray-900 sm:col-span-2 sm:mt-0">
     
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Member</dt>
              <dd className=" text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Normal
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <h3 className="my-2 text-lg font-medium leading-6 text-gray-900">
              Orders
            </h3>
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Create At
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => {
                    return (
                      <tr
                        className="cursor-pointer hover:translate-x-6 hover:font-bold"
                        onClick={() => {
                          navigate(`/user/order/details/${item._id}`)
                        }}
                      >
                        <td className="px-6 py-4 text-sm  text-gray-800 whitespace-nowrap">
                          {item._id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.price}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.status}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                 
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" className='w-[200px]' />
    // {JSON.stringify(data)}
  );
}

export default Profile;
