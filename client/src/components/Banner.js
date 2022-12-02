import React,{useContext} from 'react'
import { AuthContext } from "../helpers/AuthContext";
export default function Banner() {
    const {pageGlobal} = useContext(AuthContext)
  return (
    <div className='banner justify-content-center d-flex align-items-center'><h1>{pageGlobal.page}</h1></div>
  )
}
