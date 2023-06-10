import { useEffect, useState } from "react";
import API, { endpoint } from "../configs/API";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../Layout/Loading";
import { useSearchParams } from "react-router-dom";
import {  ButtonGroup, Row } from "react-bootstrap";
import {  CardBody, Col, Container } from "reactstrap";
import Background from "../Layout/background";
import AlertSection from "../Layout/alertSection";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Alert } from "reactstrap";

const AdmissionTypeDetail = () => {
  const [admissionInfo, setAdmissionInfo] = useState(null);
  const [typeName, setTypeName] = useState(null);
  const [count, setcount] = useState(null);

  const { admissionTypeId } = useParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadAdmissionTypeDetail = async () => {
      try {
        let e = `${endpoint["admissionType"](admissionTypeId)}`;

        e += `?page=${page}`;
        let res = await API.get(e);
        setAdmissionInfo(res.data.results);
        setcount(res.data.count);
        console.log(res.data.results);
      } catch (ex) {
        setPage(1);
      }
    };
    setAdmissionInfo(null);
    loadAdmissionTypeDetail();
  }, [page, admissionTypeId]);

  useEffect(() => {
    const loadAdmissionType = async () => {
      try {
        let e = `${endpoint["admissionTypeDetail"](admissionTypeId)}`;
        let res = await API.get(e);
        setTypeName(res.data);
      } catch (ex) {}
    };
    loadAdmissionType();
  }, [admissionTypeId]);

  const nextPage = () => setPage((current) => current + 1);
  const prevPage = () => setPage((current) => current - 1);

  if (admissionInfo === null || typeName === null) return <Loading />;

  return (
    <>
      <Background type={typeName.name} />
      <Container>
        <br></br>
        {count == 0 ? (
          <AlertSection alert="Hiện Tại Không Có Thông Báo, Bạn Quay Lại Sau nhé" />
        ) : (
          <Col>
          <Row style={{ display: 'flex' }}>
            {admissionInfo.map((p) => {
              let url = `/admissionInfoDetail/${p.id}`;
              return (
                <Col md={3} xs={12} key={p.id} className="p-2" style={{ display: 'flex' }}>
                  <Card style={{ width: '100%' }}>
                    <Card.Img
                      variant="top"
                      src={p.image}
                      style={{ objectFit: 'cover', height: '200px' }} // Điều chỉnh kích thước ảnh ở đây
                    />
                    <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                      <Card.Title style={{ flex: '1 0 auto' }}>{p.title}</Card.Title>
                      <Link to={url} className="btn btn-primary">
                        Xem chi tiết
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        
          <br />
        
          <ButtonGroup aria-label="Basic example" className="mt-2">
            <Button onClick={prevPage} variant="outline-primary">
              &lt;&lt;
            </Button>
            <Button onClick={nextPage} variant="outline-primary">
              &gt;&gt;
            </Button>
          </ButtonGroup>
        </Col>
        )}
      </Container>
    </>
  );
};

export default AdmissionTypeDetail;
