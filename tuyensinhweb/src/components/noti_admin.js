import {useContext, useEffect, useState } from "react";
import API, { endpoint } from "../configs/API";
import { Accordion, Card, Container, NavItem, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import {MyUserContext } from "../configs/MyContext";
import { CardBody } from "reactstrap";
import Background from "../Layout/background";
import AlertSection from "../Layout/alertSection";

const NotiAdmin = () => {
  const [notiAdmin, setNotiAdmin] = useState([]);
  const [user] = useContext(MyUserContext);
  const [per, setPer] = useState(true);

  useEffect(() => {

    
    const loadAdmissionInfo = async () => {
      try{
        let res = await API.get(endpoint["user_noti"](user.id));
        setNotiAdmin(res.data);
      }catch(ex){
        if(ex.response.status === 403){
          setPer(false)
        }
      }
     
    };
    loadAdmissionInfo();
  }, []);


  
if(per === false || user == null){
  return <AlertSection alert="Bạn Không Có Quyền Truy Cập" />
}
  return (
    <>
    <Background type="Trả lời câu hỏi"/>
    <Container>
    {notiAdmin.map((p)=>{
        let url = `/noti/${p.id}/question`
        return(<Card className="shadow shadow-lg--hover mt-5">
        <CardBody>
          <div className="d-flex px-3">
            <div>
              <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                <i className="ni ni-satisfied" />
              </div>
            </div>
            <div className="pl-4">
              <h5 className="title text-success">{p.title}</h5>
              <Link className="text-success" to={url} key={p.id}>
                Xem chi tiết
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>)


    })}
    
    </Container>

    
    </>
  );
};

export default NotiAdmin;
