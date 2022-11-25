import React from 'react'

export default function Cart() {
  return (
    <div><h1>{JSON.stringify(localStorage.getItem('group100_cart'))}</h1></div>
  )
}
