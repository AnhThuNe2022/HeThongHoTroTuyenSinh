import React from "react";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
//mport "./assets/scss/argon-design-system-react.scss?v1.1.0";

import './assets/vendor/font-awesome/css/font-awesome.css';
import './assets/vendor/font-awesome/css/font-awesome.min.css';

import './assets/css/argon-design-system-react.css';
import './assets/css/argon-design-system-react.min.css';




import { Container } from "react-bootstrap";
import "./App.css";
import Header from "./Layout/Header";
import ExamplesNavbar from "./Layout/ExamplesNavbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdmissionInfos from "./components/admissionInfo";
import AdmissionType from "./components/admissionType";
import AdmissionTypeDetail from "./components/admissionTypeDetail";
import AdminssionInfoDetail from "./components/adminssionInfoDetail";
import Register from "./components/register";
import Login from "./components/login";
import Notifications from "./components/notification";
import NotificationDetail from "./components/notificationDetail";
import Department from "./components/departmentDetail";
import LoginTest from "./components/Login_test";
import QuestionAdmin from "./components/questions_admin";
import NotiAdmin from "./components/noti_admin";
import AnswerAdmin from "./components/questionDetail_admin";

import Footer from './Layout/Footer';
import { useReducer } from 'react';
import myUserReducer from './Reducer/MyUserReducer';
import cookie from 'react-cookies';
import Home from "./components/Home";
import 'moment/locale/vi';
import moment from 'moment'
import { MyUserContext } from "./configs/MyContext";
moment().local("vi")

function App() {
  const [user, dispatch] = useReducer(myUserReducer, cookie.load('current-user') || null)

  return (


    <>  
    <MyUserContext.Provider value={[user, dispatch]}>

      <BrowserRouter>
        <Header />

          <Routes>
            <Route path="/" element={<AdmissionType />} />

            <Route path='/admissionTypes/:admissionTypeId/admissionInfo' element={<AdmissionTypeDetail />} />
            <Route path="/admissionInfoDetail/:adInfoId" element={<AdminssionInfoDetail />} />
            <Route path="/admissionInfo" element={<AdmissionInfos />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/notificationDetail/:notId" element={<NotificationDetail />} />
            <Route path="/department/:departId" element={<Department />} />
            <Route path="/noti/:notiId/question" element={<QuestionAdmin />} />
            <Route path="/questionAdmin" element={<NotiAdmin />} />
            <Route path="/answer_admin/:questionID" element={<AnswerAdmin />} />


          </Routes>
        <br></br>
        <br></br>

        <Footer />
      </BrowserRouter>
      </MyUserContext.Provider>

    </>
  );
}

export default App;
