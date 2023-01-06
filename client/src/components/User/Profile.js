import React, { useEffect, useState, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
function Profile() {
  const { userGlobal } = useContext(AuthContext);
  const { authState, setAuthState } = userGlobal;
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
  if (!authState.status) {
    return <Navigate to="/home"></Navigate>;
  } else {
    console.log(authState.status);
  }
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="overflow-hispanen bg-white border-r-2  w-[full] lg:w-[500px]">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Username's Profile
          </h3>
          <p className=" max-w-2xl text-sm text-gray-500">Personal details</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5  sm:px-6 flex justify-between items-center">
            
                {" "}
                <span className="text-sm font-medium text-gray-500">Full name</span>
                <span className=" text-sm text-gray-900 sm:col-span-2 sm:mt-0">Nguyen Hung</span>
              

              <EditIcon></EditIcon>
            </div>
            <div className="bg-white px-4 py-5  sm:px-6 flex justify-between items-center">
                
                <span className="text-sm font-medium text-gray-500">Email</span>
                <span className=" text-sm text-gray-900 sm:col-span-2 sm:mt-0">hpioz123@gmail.com</span>
   

              <EditIcon></EditIcon>
            </div>
            <div className="bg-gray-50 px-4 py-5  sm:px-6 flex justify-between items-center">
   
                <span className="text-sm font-medium text-gray-500">Address</span>
                <span className=" text-sm text-gray-900 sm:col-span-2 sm:mt-0">Ha Noi</span>
        

              <EditIcon></EditIcon>
            </div>
            <div className="bg-white px-4 py-5  sm:px-6 flex justify-between items-center">
    
                <span className="text-sm font-medium text-gray-500">Member</span>
                <span className=" text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  Normal
                </span>

       
              <EditIcon className="opacity-0"></EditIcon>
            </div>
            <div className="bg-gray-50 px-4 py-5  sm:px-6 flex justify-between items-center">
   
   <span className="text-sm font-medium text-gray-500">Gold</span>
   <span className=" text-sm text-gray-900 sm:col-span-2 sm:mt-0">{authState.gold}</span>


 <EditIcon className="opacity-0"></EditIcon>
</div>
          </dl>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-mispanle">
            <h3 className="my-2 text-lg font-medium leading-6 text-gray-900">
              Order History - {data.length} Results:
            </h3>
            <div className="overflow-hispanen border rounded-lg">
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
                        className="cursor-pointer  hover:font-bold "
                        key={item._id}
                        onClick={() => {
                          navigate(`/user/order/details/${item._id}`);
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

                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"></td>
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


  );
}

export default Profile;
