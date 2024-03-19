import React from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

export default function UserListScreen() {
  const { data: users, refetch, error, isLoading } = useGetUsersQuery();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
  console.log(users, "users");
  const deleteUserHandler = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      refetch();
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>

        {isLoading && <Loader />}
        {deleteLoading && <Loader />}
        <Table striped hover bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? <FaCheck /> : <FaTimes />}</td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button className="btn btn-sm btn-light">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn btn-sm btn-danger mx-2"
                    onClick={() => deleteUserHandler(user._id)}
                  >
                    <FaTrash color="white" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </div>
  );
}
