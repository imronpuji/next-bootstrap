"use client"

import UserForm from "@/components/Form/UserForm"
import { Col, Row } from "react-bootstrap"

function CreateUser() {
  return (
    <Row className="justify-content-center mt-5">
      <Col xs={12} md={6}>
        <UserForm role="employee" />
      </Col>
    </Row>
  )
}

export default CreateUser
