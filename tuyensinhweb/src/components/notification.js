import { useEffect, useState } from "react";
import API, { endpoint } from "../configs/API";
import { Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "../CSS/notificationcss.css"; // import stylesheet
import Loading from "../Layout/Loading";
import Background from "../Layout/background";

const Notifications = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loadNotification = async () => {
      let res = await API.get(endpoint["notifications"]);
      setNotification(res.data);
      console.log(res.data);
    };
    loadNotification();
  }, []);

  if (notification === null) return <Loading />;



  return (
    <>
    <Background type = "Thông Báo"/>
    <br></br>
      <div className="container">
        <Card>
          <Card.Header class="my-list" as="h5">
            Thông báo
          </Card.Header>
          <ListGroup variant="flush">
            {notification.map((p) => {
                let url =`/notificationDetail/${p.id}`
              return(
              <ListGroupItem>
              <Link className="nav-link" to={url} >{p.title}</Link>
      
              
              </ListGroupItem>
              )
            })}
          </ListGroup>
        </Card>
      </div>
    </>
  );
};

export default Notifications;
