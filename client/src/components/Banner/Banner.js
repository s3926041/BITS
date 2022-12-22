import React, { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
export default function Banner() {
  const { pageGlobal } = useContext(AuthContext);
  return (
    <div className="banner w-full flex justify-center items-center  h-[280px] ">
      <h1>{pageGlobal.page}</h1>
    </div>
  );
}
