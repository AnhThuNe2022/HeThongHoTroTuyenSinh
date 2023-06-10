import { useEffect, useState } from "react";
import API, { endpoint } from "../configs/API";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { Button, ButtonGroup, Row } from "react-bootstrap";
import Loading from "../Layout/Loading";

const AdmissionInfos = () => {
  const [admissionInfo, setAdmissionInfo] = useState(null);
  const [page, setPage] = useState(1);

  const [q] = useSearchParams();

  useEffect(() => {
    const loadAdmissionInfo = async () => {
      try {
        let e = `${endpoint["admissionInfo"]}?page=${page}`;

        let p = q.get("q");
        if (p !== null) 
          e += `&page=${p}`;

        let adtype_id = q.get("adtype_id");
        if (adtype_id !== null) e += `&adtype_id=${adtype_id}`;

        let res = await API.get(e);
        setAdmissionInfo(res.data.results);
        console.log(res.data.results);

      } catch (ex) {

        setPage(1)

      }
    };
    setAdmissionInfo(null)
    loadAdmissionInfo();
  }, [page, q]);

  const nextPage = () => setPage((current) => current + 1);
  const prevPage = () => setPage((current) => current - 1);

  if (admissionInfo === null) 
     return <Loading />;

  if (admissionInfo.length === 0)
    return (
      <div className="alert alert-info m-1">
        KHÔNG có thông báo nào, bạn quay lại sau nhé
      </div>
    );
  return (
    <>
      
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Tuyển sinh chính quy</Accordion.Header>
          {admissionInfo.map((c) => (
            <Accordion.Body>
              <Link className="nav-link" to="/admissionInfo" key={c.id}>
                {c.title}
              </Link>
            </Accordion.Body>
          ))}
        </Accordion.Item>
      </Accordion>

      <ButtonGroup aria-label="Basic example" className="mt-2">
        <Button onClick={prevPage} variant="outline-primary">
          &lt;&lt;
        </Button>
        <Button onClick={nextPage} variant="outline-primary">
          &gt;&gt;
        </Button>
      </ButtonGroup>
    </>
  );
};

export default AdmissionInfos;
