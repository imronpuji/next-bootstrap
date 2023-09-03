// create react auth hook for login

import fetcher from "@/lib/fetcher"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface LoginResponse {
  success: boolean
  message: string
  token: string
  profile: UserProfile[]
}

interface UserProfile {
  id: number
  phone_number: string
  nickname: string
  identity_name: string | null
  greeting: string | null
  verified_user: string | null
  password: string
  roles: UserRole[]
}

interface UserRole {
  id: number
  user_id: number
  role_id: number
  role_type: { id: number; role: string }
}

const useAuth = () => {
  const [user, setUser] = useState<LoginResponse>()
  const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  useEffect(() => {
    const checkIsTokenValid = async () => {
      try {
        const checkTokenResponse: {
          id: string
        } = (await fetcher(`${backEndUrl}/user/profile`, "GET")) as { id: string }

        if (!checkTokenResponse?.id) {
          localStorage.removeItem("token")
          window.location.href = "/login"
        } else if (["/login", "/register"].includes(window.location.pathname)) {
          window.location.href = "/"
        }
      } catch (err) {
        toast.error(err.message)
      }
    }

    checkIsTokenValid()
  }, [])

  const login = async ({ nickname, password }: { nickname: string; password: string }) => {
    try {
      const loginResponse = (await fetcher(`${backEndUrl}/auth/login`, "POST", {
        nickname,
        password,
      })) as LoginResponse

      if (loginResponse) {
        setUser(loginResponse)
        localStorage.setItem("token", JSON.stringify(loginResponse))
        toast.success("Login Berhasil")
      } else {
        toast.error("Username atau Password salah")
        return []
      }
    } catch (error) {
      console.log(error)
      toast.error("Login Gagal")
      return []
    }
  }

  return { login, user }
}

export default useAuth
