import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="" />
              Proshop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  <Badge pill bg="success" as="div" style={{ marginLeft: 6 }}>
                    {cartItems.reduce(
                      (sum, item) => (sum += +item.quantity),
                      0
                    )}
                  </Badge>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign in
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
