import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { addCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import Message from "../components/Message";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const [profile, { isLoading, error }] = useProfileMutation();
  const {
    data: orders,
    isLoading: orderLoading,
    error: orderError,
  } = useGetMyOrdersQuery();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    try {
      const res = await profile({
        id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      toast.success("profile updated successfully");
      dispatch(addCredentials(res));
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <div>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="my-2">
              <Form.Label>Password </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="my-2">
              <Form.Label>Confirm Password </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
            {isLoading && <Loader />}
          </Form>
        </Col>
        <Col md={9}>
          <h2>Orders</h2>
          {orderLoading ? (
            <Loader />
          ) : orderError ? (
            <Message variant="danger">
              {error?.data?.message || error?.error}
            </Message>
          ) : (
            <>
              <Table striped hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item) => {
                    return (
                      <tr>
                        <td>{item._id}</td>
                        <td>{item.createdAt.substring(0, 10)}</td>
                        <td>{item.totalPrice}</td>
                        <td>
                          {item.isPaid ? (
                            item.paidAt.substring(0, 10)
                          ) : (
                            <FaTimes />
                          )}
                        </td>
                        <td>
                          {item.isDelivered ? (
                            item.deliveredAt.substring(0, 10)
                          ) : (
                            <FaTimes />
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`orders/${item._id}`}>
                            <Button className="btn-sm" variant="primary">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
