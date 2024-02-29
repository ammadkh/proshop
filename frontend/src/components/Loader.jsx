import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <div>
      <Spinner
        role="status"
        animation="border"
        style={{
          margin: "auto",
          width: "100px",
          height: "100px",
          display: "block",
        }}
      ></Spinner>
    </div>
  );
}
