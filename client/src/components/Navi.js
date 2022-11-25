import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {useState} from "react"

function Navi({cart,setCart}) {

  const [search,setSearch] = useState("")
  return (
    <Navbar bg="light" fixed="top" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Group 100</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#">Link</Nav.Link>
            <Nav.Link href="#home">Link</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item 
              href="/category/education/1"
              >
                Education
              </NavDropdown.Item>
              <NavDropdown.Item 
              href="/category/technology/1"
              >
                 Technology
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) =>{
                setSearch(e.target.value)
                console.log(e.target.value)
              }}  
            />
            <a variant="outline-success" href={`/search/${search}/1`}>Search</a>
          </Form>
          <Nav>
            <Nav.Link href="/auth">Auth</Nav.Link>
            <Nav.Link href="/cart">Cart {`${cart}`}</Nav.Link>
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navi;
