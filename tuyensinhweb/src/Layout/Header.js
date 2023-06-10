import { useContext, useEffect, useState } from "react";
import API, { endpoint } from "../configs/API";
import { MyUserContext } from "../configs/MyContext";
import React from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import classnames from "classnames";

// JavaScript plugin that hides or shows a component based on your scroll
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
const Header = () => {
  const [admissionType, setAdmissionType] = useState([]);
  const [user, dispatch] = useContext(MyUserContext);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
    const loadAdmissionInfo = async () => {
      let res = await API.get(endpoint["admissionTypes"]);
      setAdmissionType(res.data);

      console.log(res.data);
    };
    loadAdmissionInfo();
  }, []);

  useEffect(() => {
    const loadDepartments = async () => {
      let res = await API.get(endpoint["departments"]);
      setDepartment(res.data);
      console.log(res.data);
    };

    loadDepartments();
  }, []);

  const logout = () => {
    dispatch({
      type: "logout",
    });
  };

  let userInfo = (
    <>
      <Link className="nav-link " to="/login">
        {" "}
        Đăng nhập
      </Link>

      <Link className="nav-link " to="/register">
        {" "}
        Đăng ký
      </Link>
    </>
  );

  if (user !== null) {
    // let headroom = new Headroom(document.getElementById("navbar-main"));
    // headroom.init();

    userInfo = (
      <>
        <Link className="nav-link text-danger" to="/">
          <img
            src={user.image}
            alt={user.username}
            width="30"
            className="rounded-circle"
          />
          Chào {user.username}
        </Link>
        <Button className="btn btn-danger" onClick={logout}>
          &#128104; Đăng xuất
        </Button>
      </>
    );
  }

  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
              className=""
              onExiting=""
              onExited=""
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("../assets/img/brand/LOGO-TRUONGV21-12-2018-01-300x300.png")}
                        width="100"
                        height="100"
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("../assets/img/brand/LOGO-TRUONGV21-12-2018-01-300x300.png")}
                        width="100"
                        height="100"
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span className="nav-link-inner--text">
                      Thông Tin Tuyển Sinh
                    </span>
                  </DropdownToggle>
                  <DropdownMenu>
                    {admissionType.map((c) => {
                      let url = `/admissionTypes/${c.id}/admissionInfo`;
                      return (
                        <DropdownItem to={url} tag={Link}>
                          {c.name}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span className="nav-link-inner--text">Khoa</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    {department.map((c) => {
                      let url = `/department/${c.id}`;
                      return (
                        <DropdownItem to={url} tag={Link}>
                          {c.name}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Link className="nav-link" to="/notification">
                  {" "}
                  Thông Báo{" "}
                </Link>
                {user&&user.type == 3  ?(  <NavItem>
                  <NavLink
                    aria-selected=""
                    className={classnames("rounded-circle", {
                      active: true,
                    })}
                    onClick=""
                    role="tab"
                  >
                    <span className="nav-link-icon d-block">
                      <i className="ni ni-chat-round" />
                      <i>  <Link className="" to="/questionAdmin">
                      {" "}
                      Q&A
                    </Link></i>
                    </span>
                  </NavLink>
                </NavItem>):""}
              
                {userInfo}
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    href="https://www.facebook.com/creativetim"
                    id="tooltip333589074"
                    target="_blank"
                  >
                    <i className="fa fa-facebook-square" />
                    <span className="nav-link-inner--text d-lg-none ml-2">
                      Facebook
                    </span>
                  </NavLink>
                  <UncontrolledTooltip delay={0} target="tooltip333589074">
                    Like us on Facebook
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    href="https://www.instagram.com/creativetimofficial"
                    id="tooltip356693867"
                    target="_blank"
                  >
                    <i className="fa fa-instagram" />
                    <span className="nav-link-inner--text d-lg-none ml-2">
                      Instagram
                    </span>
                  </NavLink>
                  <UncontrolledTooltip delay={0} target="tooltip356693867">
                    Follow us on Instagram
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    href="https://twitter.com/creativetim"
                    id="tooltip184698705"
                    target="_blank"
                  >
                    <i className="fa fa-twitter-square" />
                    <span className="nav-link-inner--text d-lg-none ml-2">
                      Twitter
                    </span>
                  </NavLink>
                  <UncontrolledTooltip delay={0} target="tooltip184698705">
                    Follow us on Twitter
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    href="https://github.com/creativetimofficial/argon-design-system-react"
                    id="tooltip112445449"
                    target="_blank"
                  >
                    <i className="fa fa-github" />
                    <span className="nav-link-inner--text d-lg-none ml-2">
                      Github
                    </span>
                  </NavLink>
                  <UncontrolledTooltip delay={0} target="tooltip112445449">
                    Star us on Github
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem className="d-none d-lg-block ml-lg-4">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-navbar"
                    target="_blank"
                  ></Button>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;

// <Navbar bg="light" expand="lg">
//         <Container>
//           <Navbar.Brand href="/">&#127773;TRANG CHỦ</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//               {userInfo}
//               <Nav.Link>
//                 <NavDropdown
//                   id="nav-dropdown-dark-example"
//                   title="Thông Tin Tuyển Sinh"
//                   >
//                   {admissionType.map((c) =>{
//                     let url = `/admissionTypes/${c.id}/admissionInfo`
//                     return (

//                     <NavDropdown.Item>
//                       <Link className="nav-link" to={url} key={c.id}>
//                         {c.name}
//                       </Link>
//                     </NavDropdown.Item>
//                   )})}
//                 </NavDropdown>
//               </Nav.Link>
//               <Nav.Link>
//               <NavDropdown
//                 id="nav-dropdown-dark-example"
//                 title="Khoa"
//                 >
//                 {department.map((c) =>{
//                   let url = `/department/${c.id}`
//                   return (

//                   <NavDropdown.Item>
//                     <Link className="nav-link" to={url} key={c.id}>
//                       {c.name}
//                     </Link>
//                   </NavDropdown.Item>
//                 )})}
//               </NavDropdown>
//             </Nav.Link>
//               <Link className="nav-link " to="/notification"> Thông báo </Link>

//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
