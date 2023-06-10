import { useEffect, useState } from "react";
import API, { endpoint } from "../configs/API";
import Loading from "../Layout/Loading";
import { useParams } from "react-router";

import {
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
import Background from "../Layout/background";

const Questions = () => {
  const [questions, setQuestions] = useState(null);
  const {notiId} = useParams();

  useEffect(() => {
    const loadQuestion = async () => {
      let res = await API.get(endpoint["question"](notiId));
      setQuestions(res.data);
    };
    loadQuestion();
  }, []);

  if(questions == null)
      <Loading/>
  return (
    <>
    <Background type="Câu Hỏi" />
   
 
  <section className="section section-lg bg-gradient-default">
    <Container>
      <Row className="row-grid align-items-center">

        <Col className="order-lg-1" lg="6">
      
          <Card className="shadow shadow-lg--hover mt-5">
            <CardBody>
              <div className="d-flex px-3">
                <div>
                  <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                    <i className="ni ni-satisfied" />
                  </div>
                </div>
                <div className="pl-4">
                  <h5 className="title text-success">
                    Awesome Support
                  </h5>
                  <p>
                    The Arctic Ocean freezes every winter and much of
                    the sea-ice then thaws every summer, and that
                    process will continue whatever.
                  </p>
                  <a
                    className="text-success"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="shadow shadow-lg--hover mt-5">
            <CardBody>
              <div className="d-flex px-3">
                <div>
                  <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                    <i className="ni ni-active-40" />
                  </div>
                </div>
                <div className="pl-4">
                  <h5 className="title text-warning">
                    Modular Components
                  </h5>
                  <p>
                    The Arctic Ocean freezes every winter and much of
                    the sea-ice then thaws every summer, and that
                    process will continue whatever.
                  </p>
                  <a
                    className="text-warning"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    {/* SVG separator */}
    <div className="separator separator-bottom separator-skew zindex-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon
          className="fill-white"
          points="2560 0 2560 100 0 100"
        />
      </svg>
    </div>
  </section>
    </>
  );
};

export default Questions
