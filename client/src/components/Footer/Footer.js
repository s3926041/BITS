import React from 'react'
import './footer.css'
function Footer() {
  return (
    <footer className="footer  border-t-2">
    <div className="containerFooter">
      <div className="row">
        <div className="footer-col ">
          <h4>Books Store</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Get Help</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="contactus.html">Contact Us</a></li>
            <li><a href="#">Order Status</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Top Categories</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Crafts</a></li>
            <li><a href="#">Hobbies</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-links">
            <div className="facebook">
              <a href="#"><i className="fab fa-facebook-f" /></a>
              <a href="#">Official Books Store</a>
            </div>
            <div className="instagram">
              <a href="#"><i className="fab fa-instagram" /></a>
              <a className="text" href="#">BooksStore</a>
            </div>
            <div className="twitter">
              <a href="#"><i className="fab fa-twitter" /></a>
              <a className="text" href="#">@BooksStore</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer