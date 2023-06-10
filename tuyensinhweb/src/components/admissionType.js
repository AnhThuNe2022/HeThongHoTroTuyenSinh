import { useEffect, useState } from "react";
import API, { endpoint } from "../configs/API";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import classnames from "classnames";

import Loading from "../Layout/Loading";

const AdmissionType = () => {
  const [admissionType, setAdmissionType] = useState(null);
  const [banners, setBanners] = useState(null);
  const [home, setHome] = useState(null);

  useEffect(() => {
    const loadAdmissionType = async () => {
      try {
        let res = await API.get(endpoint["admissionTypes"]);
        let data = [];


        for (let i = 0; i < res.data.length; i++) {
          let type = res.data[i];
          let e = `${endpoint['admissionType'](type.id)}`;
          e+=`?page_size=5`
          let infoRes = await API.get(e);
          let info = infoRes.data.results;
          data.push([type, info]);
        }

        setAdmissionType(data);
        console.log(data);
      } catch (ex) {}
    };
    setAdmissionType(null);
    loadAdmissionType();

  }, []);



  useEffect(() => {
    const loadBanners = async () => {
      try {
        let res = await API.get(endpoint["banners"]);
        setBanners(res.data);
      } catch (ex) {}
    };
    setBanners(null);
    loadBanners();

  }, []);

  useEffect(() => {
    const loadHome = async () => {
      try {
        let res = await API.get(endpoint["home"]);
        setHome(res.data);
      } catch (ex) {}
    };
    setHome(null);
    loadHome();

  }, []);


  if (admissionType === null || banners === null || home === null ) return <Loading />;

  if (admissionType.length === 0)
    return <div className="alert alert-info m-1">KHÔNG có thông báo nào</div>;
  return (
    <>

    <Carousel>


{banners.map((p)=> {
  return (

    <Carousel.Item>
      <img
        className="d-block w-100"
        src={p.image}
        alt=""
      />
      
    </Carousel.Item>

  )

})}

</Carousel>

    <section className="section section-lg bg-gradient-default">
    <Container className="pt-lg pb-300">
      <Row className="text-center justify-content-center">
        <Col lg="10">
          <h2 className="display-3 text-white">GIỚI THIỆU VỀ {home[0].name}</h2>
          <h3 className="lead text-white" dangerouslySetInnerHTML={{ __html: home[0].description }}>
          
          </h3>
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
  


  <Container>


      <Accordion defaultActiveKey="0" flush>
        {admissionType.map((data,index) => {
          let url = `/admissionTypes/${data[0].id}/admissionInfo` 
          return (

          <Accordion.Item eventKey={index}>
        
            <Accordion.Header>
              <Link className="nav-link" to={url} key={data[0].id}>
                {data[0].name}
              </Link>
            </Accordion.Header>

            {data[1].map((info) => {
              let url =`/admissionInfoDetail/${info.id}`
              return (
                <Accordion.Body>
                  <Link className="nav-link" to={url} key={info.id}>
                    {info.title}
                  </Link>
                </Accordion.Body>
              );
            })}
          </Accordion.Item>
        )})}
      </Accordion>
      </Container>
    </>
  );
};

export default AdmissionType;
