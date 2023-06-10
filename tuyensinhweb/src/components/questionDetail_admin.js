import { useContext,useEffect, useState } from "react";
import API, {authAPI, endpoint } from "../configs/API";
import { Accordion, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Background from "../Layout/background";
import { Button, Form, FormGroup, Input } from "reactstrap";
import Loading from "../Layout/Loading";
import { Row, Col } from 'react-bootstrap';
import SuccessAlert from "../Layout/SuccessAlert"
import ErrorAlert from "../Layout/ErrorAlert"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { MyUserContext } from "../configs/MyContext";
import AlertSection from "../Layout/alertSection";

const QuestionDetail_admin = () => {
  const [question, setQuestion] = useState([]);
  const {questionID} = useParams();
  const [answer, setAnswer] = useState(null);
  const [status, setStatus] = useState(false);
  const [active, setActive] = useState(false);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [user, dispatch] = useContext(MyUserContext);
  const [per, setPer] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadQuestionDetail = async () => {
      try{
        let res = await authAPI().get(endpoint["questionDetail"](questionID));
        setQuestion(res.data);
        setAnswer(res.data.answer)
        setActive(res.data.active)
        setStatus(res.data.isAnswer)
        console.log(res.data);
      }catch(ex){
        if(ex.response.status === 403){
          setPer(false)
        }
      }
      
    };
    loadQuestionDetail();
  }, []);

  const editQuestion = ()  => {
   
    const process = async () => {
      try {
        let res = await authAPI().patch(endpoint["questionDetail"](questionID), {
          answer:answer,
          isAnswer:status,
          active :active,
          update_by:user.id
          });
      setSuccess("Cập Nhật Thành Công")
      } catch (ex) {
        console.log(ex.response.data);
        setErr("Đã có lỗi xảy ra")

      } finally {
        setLoading(false);
      }
    };
    setSuccess("");
    setErr("")
    setLoading(true);
    process();
  };

if(per === false || user == null){
  return <AlertSection alert="Bạn Không Có Quyền Truy Cập" />
}

if(question == null)
      <Loading/>

const handleRadioClick = (value) => {
        setActive(value);
      };      

const handleRadioStatusClick = (value) => {
    setStatus(value);
      };      
  return (
    <>
     <Background type="Trả Lời Câu Hỏi"/>
     <Container>

     <Row>
     <Col sm={2} className="d-flex align-items-center justify-content-center">
     
     <h5>Chi Tiết Câu hỏi</h5>

     </Col>
     <Col sm={10} >
     <Input 
       className="form-control-alternative"
       cols="80"
       name="name"
       rows="4"
       value={question.question}
       type="textarea"
       readOnly={true}
     />
     </Col>
     </Row>
     <br></br>

     <Row>
     <Col sm={2} className="d-flex align-items-center justify-content-center">
     
     <h5>Trả Lời</h5>

     </Col>
     <Col sm={10} >
     <Input 
       className="form-control-alternative"
       cols="80"
       name="name"
       rows="4"
       onChange={(e) => setAnswer(e.target.value)}
       value={answer}
       type="textarea"
     />
     </Col>
     </Row>
<br></br>
     <Row>
     <Col sm={2} className="d-flex align-items-center justify-content-center">
     
     <h5>Status</h5>

     </Col>
     <Col sm={10} >
     <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            id="customRadio5"
            name="custom-radio-2"
            type="radio"
            checked={!status}
            onClick={() => handleRadioStatusClick(false)}
          />
          <label className="custom-control-label" htmlFor="customRadio5">
           Chờ trả lời
          </label>
        </div>
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            
            id="customRadio6"
            name="custom-radio-2"
            type="radio"
            checked={status}
            onClick={() => handleRadioStatusClick(true)}
          />
          <label className="custom-control-label" htmlFor="customRadio6">
            Đã trả lời    
          </label>
          </div>
     </Col>
     </Row>

     <br></br>
     <Row>
     <Col sm={2} className="d-flex align-items-center justify-content-center">
     
     <h5>Active</h5>

     </Col>
     <Col sm={10} >
     <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            id="customRadio1"
            name="custom-radio-10"
            type="radio"
            checked={active}
            onClick={() => handleRadioClick(true)}
          />
          <label className="custom-control-label" htmlFor="customRadio1">
          Hiển thị
          </label>
        </div>
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            
            id="customRadio2"
            name="custom-radio-10"
            type="radio"
            checked={!active}
            onClick={() => handleRadioClick(false)}e
          />
          <label className="custom-control-label" htmlFor="customRadio2">
            Không hiển thị
          </label>
          </div>
     </Col>

     </Row>
     <br></br>

     <Row>
     <Col sm={2} >
    

     </Col >
     <Col sm={10} className="d-flex align-items-center justify-content-center" >
     {loading?<Loading/>:<Button  onClick={() => editQuestion()} color="success" type="button">CẬP NHẬT </Button>
    }

     <Button color="primary" type="button">  <Link className="nav-link " to={`/noti/${question.noti}/question`}>
     {" "}
     QUAY LẠI
    </Link>
    </Button> 
     </Col>
     {success ? <SuccessAlert content={success}/>:""}
     {err?<ErrorAlert err ={err}/>:""}
     </Row>

     </Container>
     
    </>
  );
};

export default QuestionDetail_admin;
