import React,{useContext} from 'react'
import Button from "react-bootstrap/Button";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { AuthContext } from '../helpers/AuthContext';

export default function BookDisplay({data}) {
  const {userGlobal,cartGlobal} = useContext(AuthContext)
  const { cart, setCart } = cartGlobal
  return (
    <div className="">
    {data.map((item, i) => {
      let price = "";
      item.price == 0 ? (price = "Contact us") : (price = item.price);
      return (
        <MDBCard className="w-25" key={i}>
          <a href={`/book/${item._id}`} >
            <MDBCardImage
              src={item.img}
              className="cardimg"
              position="top"
              alt="book_img"
            />
          </a>
          <MDBCardBody>
            <MDBCardTitle>{item.title}</MDBCardTitle>
            <MDBCardText>{price== "Contact us" ? price: `${price/1000}$`}</MDBCardText>
            <MDBCardText>{item.desc}</MDBCardText>
            {
              price != "Contact us" &&  <Button onClick={
                ()=>{
                if (localStorage.getItem("group100_cart") === null) {
                  localStorage.setItem('group100_cart',JSON.stringify({}))
                }
                let arr = JSON.parse(localStorage.getItem('group100_cart'))
                let id = item._id
                console.log(id)
                if (id in arr){
                  arr[id].quantity += 1
                }
                else {
                  arr[id] ={
                    'quantity' : 1,
                    'image' : item.image,
                    'title' : item.title,
                    'price' : item.price
                  }
                }
                setCart(cart+1)
                localStorage.setItem('group100_cart',JSON.stringify(arr))
              }
              }>Add to cart</Button>
            }
           
          </MDBCardBody>
        </MDBCard>
      );
    })}
  </div>
  )
}
