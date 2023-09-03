// fetcher.ts
async function fetcher<T>(
  url: string,
  method: string = "GET",
  data: any = null
): Promise<T | null> {
  const token = JSON.parse(localStorage.getItem("token") as string)
  const options: {
    method: string
    headers: {
      "Content-Type": string
      Authorization: string
    }
    body?: any
  } = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
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
  } catch (error: any) {
    if (Array.isArray(error)) {
      throw error[0]
    }
    throw await error.error
  }
}

export default fetcher
