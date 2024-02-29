import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, ListGroup, Row, Image, Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart, Rr } from "../slices/cartSlice";

export default function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  console.log(cart, "cart");
  const { cartItems = [] } = cart || {};
  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const deleteItemHandler = (productItem) => {
    dispatch(removeFromCart(productItem));
  };
  return (
    <Row>
      <Col md={8}>
        {cartItems?.length === 0 ? (
          <>
            <Message>
              No item in you cart. <Link to="/">Go Back</Link>
            </Message>{" "}
          </>
        ) : (
          <>
            <ListGroup variant="flush">
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} rounded fluid />
                      </Col>
                      <Col md={3}>
                        <Link to={`product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.quantity}
                          onChange={(e) => {
                            addToCartHandler(item, +e.target.value);
                          }}
                        >
                          {[...Array(item.countInStock).keys()].map((item) => {
                            return <option value={item + 1}>{item + 1}</option>;
                          })}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => deleteItemHandler(item._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </>
        )}
      </Col>
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>
              Subtotal (
              {cartItems.reduce((sum, item) => sum + +item.quantity, 0)}) items
            </h2>
            $
            {cartItems
              .reduce((sum, item) => sum + +item.quantity * item?.price, 0)
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length < 1}
              onClick={() => navigate("/login?redirect=/shipping")}
            >
              Proceed to Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
}
