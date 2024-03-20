import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded" key={product._id}>
      <Link to={`product/${product._id}`}>
        <Card.Img src={product.image} variant="top"></Card.Img>
      </Link>
      <Link to={`/product/${product._id}`}>
        <Card.Title className="product-title">
          <strong>{product?.name}</strong>
        </Card.Title>
      </Link>
      <Card.Text as="div">
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </Card.Text>
      <Card.Text as="h3">${product?.price}</Card.Text>
    </Card>
  );
};
