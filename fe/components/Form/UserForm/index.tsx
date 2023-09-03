import fetcher from "@/lib/fetcher"
import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"

function UserForm({
  role,
  initialData,
  isEdit,
}: {
  role: string
  isEdit?: boolean
  initialData?: {
    id: string
    nickname: string
    password: string
    phone_number: number
  }
}) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{
    nickname: string
    password: string
    phone_number: number
    role_id?: number
  }>()

  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)

  const roles = {
    admin: 1,
    user: 2,
    employee: 3,
  }

  useEffect(() => {
    if (initialData) {
      reset({
        nickname: initialData.nickname,
        password: initialData.password,
        phone_number: initialData.phone_number,
      })
    }
  }, [initialData])

  const onSubmit = async (dataForm) => {
    setIsLoadingButton(true)

    const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    if (role === "user") {
      dataForm.role_id = roles.user
    } else {
      dataForm.role_id = roles.employee
    }
    if (isEdit) {
      try {
        await fetcher(`${backEndUrl}/user/${initialData?.id}`, "UPDATE", dataForm)
        toast.success("User berhasil diperbbaru")
        setIsLoadingButton(false)
        window.location.href = "/"
      } catch (error) {
        setIsLoadingButton(false)
        toast.error(error)
      }
    } else {
      try {
        await fetcher(`${backEndUrl}/user`, "POST", dataForm)
        toast.success("User berhasil ditambahkan")
        setIsLoadingButton(false)
        window.location.href = "/"
      } catch (error) {
        setIsLoadingButton(false)
        toast.error(error)
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="shadow p-4">
      <Form.Group controlId="nickname" className="mt-4">
        <Form.Label>Nickname</Form.Label>
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <>
              <Form.Control
                type="text"
                placeholder="Enter nickname"
                {...field}
                isInvalid={!!errors.nickname}
              />
              {errors.nickname && <span className="text-danger">Nickname is required</span>}
            </>
          )}
          rules={{ required: true }}
        />
      </Form.Group>
      <Form.Group controlId="password" className="mt-4">
        <Form.Label>Password</Form.Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...field}
                isInvalid={!!errors.password}
              />
              {errors.password && <span className="text-danger">Password is required</span>}
            </>
          )}
          rules={{ required: true }}
        />
      </Form.Group>
      <Form.Group controlId="phone_number" className="mt-4">
        <Form.Label>Phone Number</Form.Label>
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                {...field}
                isInvalid={!!errors.phone_number}
              />
              {errors.phone_number && <span className="text-danger">Phone Number is required</span>}
            </>
          )}
          rules={{ required: true }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-4" disabled={isLoadingButton}>
        {initialData ? "Update User" : "Add User"}
        {isLoadingButton && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
      </Button>
    </Form>
  )
}

export default UserForm
