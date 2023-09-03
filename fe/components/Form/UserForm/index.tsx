import fetcher from "@/lib/fetcher"
import { widgetCloudinary } from "@/lib/helpers"
import { useEffect, useState } from "react"
import { Button, Form, Image } from "react-bootstrap"
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
    photo: string
  }
}) {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<{
    nickname: string
    password: string
    phone_number: number
    role_id?: number
    photo?: string
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
        phone_number: initialData.phone_number,
        photo: initialData.photo,
      })
    }
  }, [initialData])

  useEffect(() => {
    widgetCloudinary(async (company_thumbnail_url) => {
      try {
        setValue("photo", company_thumbnail_url)
      } catch (err: any) {
        toast.error(err.message)
      }
    })
  }, [])

  const onSubmit = async (dataForm: {
    nickname: string
    password: string
    phone_number: number
    role_id?: number
    photo?: string
  }) => {
    setIsLoadingButton(true)

    const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    if (isEdit) {
      try {
        await fetcher(`${backEndUrl}/user/${initialData?.id}`, "PUT", dataForm)
        toast.success("User berhasil diperbarui")
        setIsLoadingButton(false)
        window.location.href = `/?tabParams=${role}`
      } catch (error: any) {
        setIsLoadingButton(false)
        toast.error(error.message)
      }
    } else {
      try {
        if (role === "user") {
          dataForm.role_id = roles.user
        } else {
          dataForm.role_id = roles.employee
        }

        await fetcher(`${backEndUrl}/user`, "POST", { ...dataForm })
        toast.success("User berhasil ditambahkan")
        setIsLoadingButton(false)
        window.location.href = `/?tabParams=${role}`
      } catch (error: any) {
        setIsLoadingButton(false)
        toast.error(error.message)
      }
    }
  }

  let titleButton

  switch (role) {
    case "employee":
      titleButton = "Add employee"
      break
    case "user":
      titleButton = "Add user"
    default:
      break
  }

  if (initialData && role === "user") {
    titleButton = "Update user"
  }
  if (initialData && role === "employee") {
    titleButton = "Update employee"
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shadow p-4" encType="multipart/form-data">
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
      {!isEdit && (
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
      )}

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

      {role === "employee" && (
        <Form.Group controlId="photo" className="mt-4">
          <Form.Label>Upload Foto</Form.Label>
          <Button
            className="btn btn-link"
            onClick={async () => {
              const loadWindow: any = window
              loadWindow.widgetCloudinary.open()
            }}
          >
            Choose Photo
          </Button>
          {errors.photo && <span className="text-danger">Photo is required</span>}
          <Image
            src={watch("photo")}
            className="img-thumbnail rounded float-left d-block"
            width={100}
            height={100}
          />
        </Form.Group>
      )}
      <Button variant="primary" type="submit" className="mt-4" disabled={isLoadingButton}>
        {titleButton}
        {isLoadingButton && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
      </Button>
    </form>
  )
}

export default UserForm
