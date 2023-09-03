"use client"

import UserForm from "@/components/Form/UserForm"
import fetcher from "@/lib/fetcher"
import { Col, Row } from "react-bootstrap"
import useSwr from "swr"

function Update({ params: { id } }: { params: { id: string } }) {
  const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const { data, isLoading } = useSwr(`${backEndUrl}/user/${id}`, fetcher)

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={12} md={6}>
        <UserForm role="employee" initialData={data as any} isEdit />
      </Col>
    </Row>
  )
}

export default Update
