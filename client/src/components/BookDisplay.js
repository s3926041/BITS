import React from 'react'
import Button from "react-bootstrap/Button";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardImage,
} from "mdb-react-ui-kit";

export default function BookDisplay({data}) {
  return (
    <div className="">
    {data.map((item, i) => {
      let price = "";
      item.price == "$0.00" ? (price = "Contact us") : (price = item.price);
      return (
        <MDBCard className="w-25">
          <a href={`/book/${item.isbn13}`} key={i}>
            <MDBCardImage
              src={item.image}
              className="cardimg"
              position="top"
              alt="book_img"
            />
          </a>
          <MDBCardBody>
            <MDBCardTitle>{item.title}</MDBCardTitle>
            <MDBCardText>{price}</MDBCardText>
            <Button onClick={
              ()=>{
              if (localStorage.getItem("group100_cart") === null) {
                localStorage.setItem('group100_cart',JSON.stringify({}))
              }
              let arr = JSON.parse(localStorage.getItem('group100_cart'))
              let id = item.isbn13
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
                console.log(arr)
              localStorage.setItem('group100_cart',JSON.stringify(arr))
            }
            }>Add to cart</Button>
          </MDBCardBody>
        </MDBCard>
      );
    })}
  </div>
  )
}
