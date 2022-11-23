import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,MDBCardImage
} from 'mdb-react-ui-kit';

import axios from "axios";


function Home({data}) {
  return (
    <div className="">      
    {data.map((item) => (
      // item.volumeInfo.imageLinks.smallThumbnail
      // item.volumeInfo.title
      // item.volumeInfo.authors
      <MDBCard>
      {/* <MDBCardImage src={item.volumeInfo.imageLinks.thumbnail} className='' position='top' alt='' /> */}
      <MDBCardBody>
        <MDBCardTitle>{item.volumeInfo.title}</MDBCardTitle>
        <MDBCardText>
         {item.volumeInfo.authors}
        </MDBCardText>
        <MDBBtn href='#'>Button</MDBBtn>
      </MDBCardBody>
    </MDBCard>
    ))} </div>

 
  
  );
}

export default Home;
