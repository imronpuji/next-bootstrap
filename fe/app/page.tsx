"use client"
import fetcher from "@/lib/fetcher"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button, Table, Form, Tabs, Tab } from "react-bootstrap"
import useSwr from "swr"
import { toast } from "react-toastify"
import Modal from "react-bootstrap/Modal"
import useAuth from "@/hooks/useAuth"
import { useSearchParams } from "next/navigation"
import { Image } from "react-bootstrap"

function App() {
  const router = useRouter()
  useAuth()
  const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const searchParams = useSearchParams()
  const [urlUser, setUrlUser] = useState<string>("")
  const { data, isLoading } = useSwr(urlUser, fetcher)
  const [selectedIdDelete, setselectedIdDelete] = useState<number>(0)
  const [modalDeleteUser, setModalDeleteUser] = useState<boolean>(false)
  const [isLoadingButton, setisLoadingButton] = useState<boolean>(false)
  const [tab, setTab] = useState<string>("user")
  const tabParams = searchParams.get("tabParams")

  const users = data as Array<{
    id: string
    phone_number: string
    nickname: string
    identity_name: string
    greeting: string
    roles: []
    photo: string
  }>

  useEffect(() => {
    setUrlUser(`${backEndUrl}/users?role=${tab}`)
    if (tabParams) {
      setTab(tabParams)
    }
  }, [tab, router, tabParams])

  const deleteUser = async (id: string) => {
    setisLoadingButton(true)
    try {
      const deleteResponse: {
        message: string
      } = (await fetcher(`${backEndUrl}/user/${id}`, "DELETE")) as {
        message: string
      }
      toast.success(deleteResponse.message)
      setisLoadingButton(false)
      setModalDeleteUser(false)
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      setisLoadingButton(false)
      toast.error("Error deleting user")
    }
  }
  return (
    <Container>
      <Row>
        <Col>
          <div className="flex">
            <h1 className="mt-4">User Manajemen</h1>
            <Button
              className="mb-4 bg-danger"
              onClick={() => {
                localStorage.removeItem("token")
                window.location.reload()
              }}
            >
              Logout
            </Button>
          </div>
          <Tabs
            defaultActiveKey={(tabParams as string) || "user"}
            id="todo-tabs"
            onClick={(event: any) => {
              router.push(`?tabParams=${event.target.dataset.rrUiEventKey}`)
              setTab(event.target.dataset.rrUiEventKey)
            }}
          >
            <Tab eventKey="user" title="User">
              <Button
                onClick={() => {
                  router.push("/user/create")
                }}
                className="mt-4"
              >
                Tambah user
              </Button>
              <Table className="mt-4" striped bordered hover>
                <thead>
                  <tr>
                    <th>Nickname</th>
                    <th>Phone Number</th>
                    <th>Roles</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, index) => (
                    <tr key={index}>
                      <td>{user.nickname}</td>
                      <td>{user.phone_number}</td>
                      <td>
                        {user.roles.map(
                          ({
                            role_type,
                          }: {
                            role_type: {
                              role: string
                            }
                          }) => role_type.role
                        )}
                      </td>
                      <td>
                        <div className="flex">
                          <Button
                            variant="danger"
                            onClick={() => {
                              setselectedIdDelete(index)
                              setModalDeleteUser(true)
                            }}
                          >
                            Delete
                          </Button>

                          <Button
                            className="ml-4"
                            variant="primary"
                            onClick={() => {
                              window.location.href = `/user/edit/${user.id}`
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>

            <Tab eventKey="employee" title="Pegawai">
              <Button
                onClick={() => {
                  router.push("/employee/create")
                }}
                className="mt-4"
              >
                Tambah Pegawai
              </Button>
              <Table className="mt-4" striped bordered hover>
                <thead>
                  <tr>
                    <th>Nickname</th>
                    <th>Phone Number</th>
                    <th>Roles</th>
                    <th>Image</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, index) => (
                    <tr key={index}>
                      <td>{user.nickname}</td>
                      <td>{user.phone_number}</td>
                      <td>
                        {user.roles.map(
                          ({
                            role_type,
                          }: {
                            role_type: {
                              role: string
                            }
                          }) => role_type.role
                        )}
                      </td>
                      <td>
                        <Image src={user.photo} style={{ width: "100px", height: "100px" }} />
                      </td>
                      <td>
                        <div className="flex">
                          <Button
                            variant="danger"
                            onClick={() => {
                              setselectedIdDelete(index)
                              setModalDeleteUser(true)
                            }}
                          >
                            Delete
                          </Button>

                          <Button
                            className="ml-4"
                            variant="primary"
                            onClick={() => {
                              window.location.href = `/employee/edit/${user.id}`
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <Modal show={modalDeleteUser} onHide={() => setModalDeleteUser(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Kamu serius akan menghapus {`"${users?.[selectedIdDelete]?.nickname}"`} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalDeleteUser(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => deleteUser(users?.[selectedIdDelete]?.id)}>
            Lanjutkan
            {isLoadingButton && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default App
