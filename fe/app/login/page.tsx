"use client"
import useAuth from "@/hooks/useAuth"
import React, { useState } from "react"
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form"

interface LoginFormValues {
  nickname: string
  password: string
}

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>()
  const { login } = useAuth()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)

    await login({
      nickname: data.nickname,
      password: data.password,
    })

    setIsLoading(false)
  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit(onSubmit)} className="shadow p-4 rounded">
            <h3 className="text-center mb-4">Login</h3>
            <Form.Group controlId="nickname">
              <Form.Label>Nickname</Form.Label>
              <Controller
                name="nickname"
                control={control}
                rules={{ required: "Nickname is required" }}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Enter your nickname"
                    isInvalid={!!errors.nickname}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nickname && errors.nickname.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mt-4">
              <Form.Label>Password</Form.Label>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    isInvalid={!!errors.password}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password && errors.password.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm
