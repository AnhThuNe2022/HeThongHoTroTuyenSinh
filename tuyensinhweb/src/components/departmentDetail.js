import { useEffect, useState } from "react";
import API, { endpoint } from "../configs/API";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import Loading from "../Layout/Loading";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import Background from "../Layout/background";
import { Container } from "reactstrap";

const DepartmentDetail = () => {
  const [departmentDetail, setDepartmentDetail] = useState(null);
  const {departId} = useParams();
  useEffect(() => {
    const loadDepartmentDetail = async () => {  
      let res = await API.get(endpoint["department"](departId));
      setDepartmentDetail(res.data);
      console.log(res.data);
    };
    loadDepartmentDetail();
  }, [departmentDetail]);

  if (!departmentDetail) {
    return <Loading/>
  }


  return (
    <>
<Background type = {departmentDetail.name} />
    <Container>
    <p class="info"><Link className="nav-link" to={departmentDetail.website}> &#127752; Thông tin ngành - Khoa</Link></p>
    <h2 className="text-center text-success">GIỚI THIỆU CHUNG</h2>
    <br></br>
    {departmentDetail.intro_video !== "" ?  (<div style={{ width: '560px', height: '315px', margin: 'auto' }}>
    <ReactPlayer
      url={departmentDetail.intro_video}
      width="100%"
      height="100%"
      controls
    />
  </div>): ""}
    <p class="my-title">{departmentDetail.introduce}</p>
    <p class="my-title"dangerouslySetInnerHTML={{ __html:departmentDetail.description  }}></p>
    <br></br>
    <h3>ĐIỂM TRÚNG TUYỂN 5 NĂM GẦN ĐÂY</h3>
    <br></br>
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>Ngành</th>
        <th>Năm</th>
        <th>Điểm Chuẩn</th>
      </tr>
    </thead>
    <tbody>
      {departmentDetail.major_scores.map((p) => {
        return (
          <>
            {p.scores.map((score, index) => {
              return (
                <tr>
                  {index === 0 && (
                    <td rowSpan={p.scores.length} >{p.major}</td>
                  )}
                  <td>{score.year}</td>
                  <td>{score.minimum_score}</td>
                </tr>
              );
            })}
          </>
        );
      })}
    </tbody>
  </Table>
  </Container>
    </>
    
  );
};

export default DepartmentDetail;