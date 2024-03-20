import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import products from "../product";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  FormGroup,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";
import {
  useCreateProductReviewMutation,
  useGetProductsDetailQuery,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Message from "../components/Message";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(null);
  const userInfo = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    createProductReview,
    { error: reveiwError, isLoading: reviewLoading },
  ] = useCreateProductReviewMutation();

  const {
    data: product,
    refetch,
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

  const submitCommentHandler = async (e) => {
    e.preventDefault();
    try {
      const review = {
        rating,
        comment,
        id: productId,
      };
      await createProductReview(review).unwrap();
      refetch();
      toast.success("review added");
    } catch (error) {
      setComment(null);
      setRating(null);
      toast.error(error?.data?.message || error?.error);
    }
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
      <Row className="my-4">
        <Col>
          <h3>Reviews</h3>
          {reviewLoading && <Loader />}
          {(!product.reviews || product.reviews?.length === 0) && (
            <Message>No Reviews yet</Message>
          )}
          <ListGroup>
            {product.reviews.map((review) => {
              return (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating}></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              );
            })}
            <ListGroup.Item>
              <h2>Write a customer review</h2>
              {userInfo ? (
                <Form onSubmit={submitCommentHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value={1}>Poor</option>
                      <option value={2}>Fine</option>
                      <option value={3}>Good</option>
                      <option value={4}>Very Good</option>
                      <option value={5}>Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button className="btn my-2" type="submit">
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  kindly <Link to="/login">sign in</Link> to enter comment
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}
