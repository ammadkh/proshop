import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormContainer from "../../components/FormContainer";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import {
  useGetUserDetailQuery,
  useUpdateUserDetailMutation,
} from "../../slices/usersApiSlice";

export default function UserEditScreen() {
  const { id: userId } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const navigate = useNavigate();
  const {
    data: user,
    refetch,
    error,
    isLoading,
  } = useGetUserDetailQuery(userId);

  const [updateUserDetail, { error: updateError, isLoading: updateLoading }] =
    useUpdateUserDetailMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  console.log(user, "user");
  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedUser = {
      id: userId,
      name,
      email,
      isAdmin,
    };
    try {
      const response = await updateUserDetail(updatedUser);
      refetch();
      toast.success("updated successfully");
      navigate("/admin/userlist");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <div>
      <LinkContainer to={`/admin/userlist`}>
        <Button className="btn-sm btn-light my-3">Back</Button>
      </LinkContainer>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit User</h1>
          {updateLoading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin" className="my-2">
              <Form.Check
                label="Is Admin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.value)}
              ></Form.Check>
            </Form.Group>

            <Button className="my-2" variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </div>
  );
}
