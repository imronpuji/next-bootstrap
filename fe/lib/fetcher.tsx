// fetcher.ts
async function fetcher<T>(
  url: string,
  method: string = "GET",
  data: any = null
): Promise<T | null> {
  const token = JSON.parse(localStorage.getItem("token"))
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  }
  if (token) {
    options.headers.Authorization = `Bearer ${token.token}`
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url, options)

    if (!response?.ok) {
      throw await response.json()
    }
    return response.json()
  } catch (error) {
    if (Array.isArray(error)) {
      throw error[0]
    }
    throw await error.error
  }
}

export default fetcher
