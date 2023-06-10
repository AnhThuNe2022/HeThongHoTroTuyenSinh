import { useRef, useState } from "react"
import InputItem from "../Layout/InputItem"
import Loading from "../Layout/Loading";
import API, { endpoint } from "../configs/API"
import ErrorAlert from "../Layout/ErrorAlert"
import { useNavigate } from "react-router-dom"
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    InputGroup,
    Container,
    Row,
    Col
  } from "reactstrap";


const Register = () => {
    const [user, setUser] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "username": "",
        "password": "",
        "confirmPassword": ""
    })
    const avatar = useRef()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    const nav = useNavigate()

    const register = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("first_name", user.firstName)
                form.append("last_name", user.lastName)
                form.append("email", user.email)
                form.append("username", user.username)
                form.append("password", user.password)
                form.append("type", 2)
                if (avatar.current.files.length > 0){
                    
                    form.append("avatar", avatar.current.files[0])
                    let res = await API.post(endpoint['register'], form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    if (res.status === 201)
                        nav("/login")
                    else
                        setErr("Hệ thống đang có lỗi! Vui lòng quay lại sau!")
                }
                else{
                    setErr("Phải có avatar")
                }
    
              
            } catch (ex) {
                let msg = ""
                for (let e of Object.values(ex.response.data))
                    msg += `${e} `

                setErr(msg)
            } finally {
                setLoading(false)
            }
        }

        if (user.username === "" || user.password === "") 
            setErr("Username và password không được rỗng!")
        else if (user.password !== user.confirmPassword)
            setErr("Mật khẩu không khớp!")
        else {
            setLoading(true)
            process()
        }
    }

    const setValue = e => {
        const { name, value } = e.target
        setUser(current => ({...current, [name]:value}))
    }

    return (
        <>
        <main >
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-3">
                      <small>Sign up with</small>
                    </div>
                    <div className="text-center">
                      <Button
                        className="btn-neutral btn-icon mr-4"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={
                              require("../assets/img/icons/common/github.svg")
                                .default
                            }
                          />
                        </span>
                        <span className="btn-inner--text">Github</span>
                      </Button>
                      <Button
                        className="btn-neutral btn-icon ml-1"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={
                              require("../assets/img/icons/common/google.svg")
                                .default
                            }
                          />
                        </span>
                        <span className="btn-inner--text">Google</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                    {err?<ErrorAlert err={err} />:""}
                    </div>
                    <Form onSubmit={register} role="form">
                    <InputGroup className="mb-3">
                
                  </InputGroup>
                    <InputItem label="Tên người dùng" type="text" value={user.firstName} 
                                                name="firstName" setValue={setValue} />
                                    <InputItem label="Họ và tên lót" type="text" value={user.lastName} 
                                                 name="lastName" setValue={setValue} />
                                    <InputItem label="Email" type="email" value={user.email}
                                                 name="email" setValue={setValue} />              
                                    <InputItem label="Tên đăng nhập" type="text" value={user.username}
                                                 name="username" setValue={setValue} />
                                <InputItem label="Mật khẩu" type="password" value={user.password} 
                                                name="password" setValue={setValue} />
                                    <InputItem label="Xác nhận mật khẩu" type="password" value={user.confirmPassword} 
                                                  name="confirmPassword" setValue={setValue} />
                                     <InputItem label="Ảnh đại diện" type="file" ref={avatar} name="avatar" />
                                   


                      <div className="text-muted font-italic">
                        <small>
                          password strength:{" "}
                          <span className="text-success font-weight-700">
                            strong
                          </span>
                        </small>
                      </div>
                      <Row className="my-4">
                        <Col xs="12">
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                              className="custom-control-input"
                              id="customCheckRegister"
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheckRegister"
                            >
                              <span>
                                I agree with the{" "}
                                <a
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Privacy Policy
                                </a>
                              </span>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      {loading?<Loading />:(
                      <div className="text-center">
                        <Button
                          className="mt-4"
                          color="primary"
                          type="submit"
                        >
                          Create account
                        </Button>
                      </div>)}
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
        </>
    )
}

export default Register


// {err?<ErrorAlert err={err} />:""}
// <Form onSubmit={register}>
//                 <InputItem label="Tên người dùng" type="text" value={user.firstName} 
//                             name="firstName" setValue={setValue} />
//                 <InputItem label="Họ và tên lót" type="text" value={user.lastName} 
//                              name="lastName" setValue={setValue} />
//                 <InputItem label="Email" type="email" value={user.email}
//                              name="email" setValue={setValue} />              
//                 <InputItem label="Tên đăng nhập" type="text" value={user.username}
//                              name="username" setValue={setValue} />
//                 <InputItem label="Mật khẩu" type="password" value={user.password} 
//                              name="password" setValue={setValue} />
//                 <InputItem label="Xác nhận mật khẩu" type="password" value={user.confirmPassword} 
//                              name="confirmPassword" setValue={setValue} />
//                 <InputItem label="Ảnh đại diện" type="file" ref={avatar} name="avatar" />
               
//                 {loading?<Loading />:<Button variant="primary" type="submit">Đăng ký</Button>}
//             </Form>