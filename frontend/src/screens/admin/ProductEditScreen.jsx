import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductsDetailQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import FormContainer from "../../components/FormContainer";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

export default function ProductEditScreen() {
  const { id: productId } = useParams();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [countInStock, setCountInStock] = useState(0);
  const navigate = useNavigate();
  const {
    data: product,
    refetch,
    error,
    isLoading,
  } = useGetProductsDetailQuery(productId);

  const [updateProduct, { error: updateError, isLoading: updateLoading }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: uploadLoading }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  console.log(product, "prod");
  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    };
    try {
      const response = await updateProduct(updatedProduct);
      refetch();
      toast.success("updated successfully");
      navigate("/admin/productlist");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  return (
    <div>
      <LinkContainer to={`/admin/productlist`}>
        <Button className="btn-sm btn-light my-3">Back</Button>
      </LinkContainer>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit Product</h1>
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
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                label="Choose file"
                className="my-1"
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count in Stoke"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
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
