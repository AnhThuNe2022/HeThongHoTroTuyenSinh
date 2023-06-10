import { useContext,useEffect, useState } from "react";
import API, { authAPI,endpoint } from "../configs/API";
import { Button,Accordion, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../Layout/Loading";
import { MyUserContext } from "../configs/MyContext";
import "../CSS/notificationcss.css"; // import stylesheet
import SuccessAlert from "../Layout/SuccessAlert"
import ErrorAlert from "../Layout/ErrorAlert"
import Background from "../Layout/background";

const NotificationDetail = () => {
  const [notification, setNotification] = useState([]);
  const {notId} = useParams();
  const [question,setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user] = useContext(MyUserContext);
  const [success, setSuccess] = useState("")
  const [checkDate, setCheckDate] = useState(false)
  const [err, setErr] = useState("")

  useEffect(() => {
    const loadNotification = async () => {
      let res = await API.get(endpoint["notification"](notId));
      setNotification(res.data);
      const fromDateObj = new Date(res.data.from_date);
      const toDateObj = new Date(res.data.to_date);
      const currentDateObj = new Date();
      if (currentDateObj >= fromDateObj && currentDateObj <= toDateObj) {
        setCheckDate(true)
      }
      else  {  setCheckDate(false)}
      console.log(res.data);
    };
    loadNotification();
  }, []);




  const addQuestion = () => {

    const process = async () => {
      try {
        await authAPI().post(endpoint["question"](notId), {
          question: question,
        });
      } catch (ex) {
        setErr("Thêm không được")
        console.log(ex.response.data);
      } finally {
      }
    };

    process();
  };


  const sendEmail = (evt) => {
    evt.preventDefault();
    
    const process = async () => {
      try {
        await authAPI().post(endpoint["sendEmail"](notId), {
          subject: `[TRƯỜNG-CÂU HỎI LIVESTREAM] - CÂU HỎI TỪ ${notification.title}`,
          message: question,
        });
        setSuccess("Đã Gửi Câu Hỏi Thành Công")
        addQuestion()
      } catch (ex) {
        setErr("Đã có lỗi xảy ra!!")
        console.log(ex.response.data);
      } finally {
        setLoading(false)
        setQuestion("")

      }
    };
    setErr("")
    setSuccess("")
    setLoading(true);
    process();
  };

  

  let userInfo = (
  <>

    <p class='my-title'>Hãy đặt câu hỏi cho chúng tôi </p>
      <Form onSubmit={sendEmail}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          as="textarea"
          rows={3}
          placeholder="Hãy Đặt câu hỏi đi "
        />
      </Form.Group>
      {loading ? (
        <Loading />
      ) : (
        <Button variant="info" type="submit">
          Gửi Câu Hỏi 
        </Button>
       
      )}
      </Form>
  </>
)








  return (
    <>
    <Background/>
    <br></br>
    <Container>
    <div className="pt-4 text-center">
    <h1 className="title">
    <span className="d-block mb-1" >{notification.title}</span>
     </h1> 
     </div>
    <p dangerouslySetInnerHTML={{ __html: notification.content }}></p>
    <br></br>
    {!checkDate?<SuccessAlert content="Không Thể Đặt Câu Hỏi Lúc Này" /> : (user === null ? (<p> <Link to="/login">Đăng nhập</Link> để đặt câu hòi nào!</p>) : userInfo )}
   
    <br></br>
    {success ? <SuccessAlert content={success} />:""}
    {err ? <ErrorAlert err={err} />:""}
    </Container>
    </>
  );
};

export default NotificationDetail;
