import { useEffect, useState } from "react";
import API, { endpoint } from "../configs/API";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdmissionInfos = (props) => {
  const [admissionInfo, setAdmissionInfo] = useState([]);

  useEffect(() => {
    const loadAdmissionInfo = async () => {
    let e = `${endpoint["admissionInfo"]}?adtype_id=${props}`;

      let res = await API.get(e);
      setAdmissionInfo(res.data);
      console.log(res.data);
    };
    loadAdmissionInfo();
  }, []);

  return (
    <>
    {admissionInfo.map((p)=>{
              
        <Accordion.Body>
        <Link className="nav-link" to="/admissionInfo" key={p.id}>
          {p.title}
        </Link>
      </Accordion.Body>

      })}
    </>
  );
};

export default AdmissionInfos;
