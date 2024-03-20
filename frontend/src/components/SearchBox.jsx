import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search/${search}`);
      setSearch("/");
    } else {
      navigate("/");
    }
  };
  return (
    <div>
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Form.Control>
        <Button className="btn" type="submit" style={{ marginLeft: 6 }}>
          Search
        </Button>
      </Form>
    </div>
  );
}
