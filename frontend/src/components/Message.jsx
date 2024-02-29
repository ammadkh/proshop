import React from "react";
import { Alert } from "react-bootstrap";

export default function Message({ variant = "info", children }) {
  return (
    <div>
      <Alert variant={variant}>{children}</Alert>
    </div>
  );
}
