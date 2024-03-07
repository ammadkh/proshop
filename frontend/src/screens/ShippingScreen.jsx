import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutStep from "../components/CheckoutStep";

export default function ShippingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div>
      <CheckoutStep step1 step2 />
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler} id="shipping">
          <FormGroup className="my-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup className="my-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup className="my-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup className="my-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <Button type="submit" variant="primary" className="my-2">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}
