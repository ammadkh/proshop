import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import products from "../product";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";
import { useGetProductsDetailQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

export default function ProductDetail() {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductsDetailQuery(productId);
  if (error) {
    <div>{error?.data?.message || error?.error}</div>;
  }
  if (isLoading) {
    return <Loader />;
  }

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity: qty }));
    navigate("/cart");
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty: </Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((item) => {
                          return <option value={item + 1}>{item + 1}</option>;
                        })}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock < 1}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
