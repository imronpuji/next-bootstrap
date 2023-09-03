"use client"
import fetcher from "@/lib/fetcher"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button, Table, Form, Tabs, Tab } from "react-bootstrap"
import useSwr from "swr"
import { toast } from "react-toastify"
import Modal from "react-bootstrap/Modal"

function App() {
  const [userData, setUserData] = useState({ nickname: "", password: "", phone_number: "" })
  const router = useRouter()
  const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const [urlUser, setUrlUser] = useState<string>("")
  const { data, isLoading } = useSwr(urlUser, fetcher)
  const [selectedIdDelete, setselectedIdDelete] = useState<number>(0)
  const [modalDeleteUser, setModalDeleteUser] = useState<boolean>(false)
  const [isLoadingButton, setisLoadingButton] = useState<boolean>(false)
  const [tab, setTab] = useState<string>("user")

  const users = data as Array<{
    id: string
    phone_number: string
    nickname: string
    identity_name: string
    greeting: string
    roles: []
  }>

  useEffect(() => {
    setUrlUser(`${backEndUrl}/users?role=${tab}`)
    return () => {
      setUrlUser("")
    }
  }, [router, tab])

  const deleteUser = async (id) => {
    setisLoadingButton(true)
    try {
      const deleteResponse = await fetcher(`${backEndUrl}/user/${id}`, "DELETE")
      toast.success(deleteResponse.message)
      setisLoadingButton(false)
      setModalDeleteUser(false)
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      setisLoadingButton(false)
      toast.error(error)
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mt-4">To-Do List</h1>
          <Tabs
            defaultActiveKey={tab}
            id="todo-tabs"
            onClick={(event) => {
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
                      <td>{user.roles.map(({ role_type }) => role_type.role)}</td>
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
                              router.push(`/user/edit/${user.id}`)
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
            <Tab eventKey="employ" title="Employ">
              {/* Isi dengan komponen atau logika untuk tab Employ jika diperlukan */}
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <Modal show={modalDeleteUser} onHide={() => setModalDeleteUser(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Kamu serius akan menghapus {`"${users?.[selectedIdDelete].nickname}"`} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalDeleteUser(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => deleteUser(selectedIdDelete)}>
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
