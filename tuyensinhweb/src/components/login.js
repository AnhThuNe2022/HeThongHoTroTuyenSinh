import {useContext, useState } from "react";
import API, {authAPI, endpoint } from "../configs/API";
import ErrorAlert from "../Layout/ErrorAlert"
import InputItem from "../Layout/InputItem"
import Loading from "../Layout/Loading";
import cookie from "react-cookies"
import { MyUserContext } from "../configs/MyContext";
import { Link, Navigate } from "react-router-dom"
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroup,
    Container,
    Row,
    Col
  } from "reactstrap";
const Login = () => {
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, dispatch] = useContext(MyUserContext)

  const login = (evt) => {
    evt.preventDefault()

    const process = async () => {
        try {
            let res = await API.post(endpoint['login'], {
                "username": username,
                "password": password,
                "client_id": "r8nnlifHT8gyXgZy3DBzYTRrffdl9oEv1mCxRTVE",
                "client_secret": "Vv52uq44wMDWeKefi5GOX5aqkkmgXhiEL8cb0r2F0khUPqJqFhlsPOV9bQFEtid8oQ18Pw0vm0gaAx4eTccSBtn6snT1vWUfVkQedbF7nJBQyXUmtE3crXMBWTZ2kzyA",
                "grant_type": "password"
            },{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            console.log(res.data)
            cookie.save('access-token', res.data.access_token)

            let user = await authAPI().get(endpoint['current-user'])
            cookie.save('current-user', user.data)

            dispatch({
                "type": "login", 
                "payload": user.data
            })

        } catch (ex) {
            console.log(ex.response.data.error)
            setErr('Username hoặc Pssword không hợp lệ!')
        } finally {
            setLoading(false)
        }
    }

    if (username === "" || password === "")
        setErr("Phải nhập username và password!")
    else {
        setLoading(true)
        setErr(false)
        process()
    }
}
if (user !== null)
    return <Navigate to="/" />
  

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
                  <small>Sign in with</small>
                </div>
                <div className="btn-wrapper text-center">
                  <Button
                    className="btn-neutral btn-icon"
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
                <Form onSubmit={login} role="form">
                  <InputItem label="Tên đăng nhập" type="text" value={username} setValue={e => setUsername(e.target.value)} />

                  <InputItem label="Mật khẩu" type="password" value={password} setValue={e => setPassword(e.target.value)} />
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                   
                      <span>Remember me</span>
                    </label>
                  </div>
                  {loading?<Loading />:(               
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="submit"
                    >
                      Sign in
                    </Button>
                  </div>
                  )}
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Forgot password?</small>
                </a>
              </Col>
              <Col className="text-right" xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small><Link className="nav-link" to="/register">Create new account</Link></small>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  </main>
   
    </>
  );
};

export default Login;
// {err?<ErrorAlert err={err} />:""}
    

// <Form onSubmit={login}>
//     <InputItem label="Tên đăng nhập" type="text" value={username} setValue={e => setUsername(e.target.value)} />
//     <InputItem label="Mật khẩu" type="password" value={password} setValue={e => setPassword(e.target.value)} />
    
//     {loading?<Loading />:<Button variant="primary" type="submit">Đăng nhập</Button>}
// </Form>