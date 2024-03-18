import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";

export default function ProductListScreen() {
  const { data: products, refetch, isLoading, error } = useGetProductsQuery();
  const [createProduct, { isLoading: createLoading, error: createError }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    try {
      await createProduct();
      refetch();
      toast.success("Product created successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  const deleteHandler = async (productId) => {
    try {
      await deleteProduct(productId);
      refetch();
      toast.success("deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {createLoading && <Loader />}
      {deleteLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button className="btn-sm mx-2" variant="light">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm mx-2"
                      variant="danger"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash color="white" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}
