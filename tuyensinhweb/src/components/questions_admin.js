import { useContext,useEffect, useState } from "react";
import API, { authAPI,endpoint } from "../configs/API";
import Loading from "../Layout/Loading";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

import Background from "../Layout/background";

import { Button, Accordion, Form, Container, Modal } from "react-bootstrap";
import { ButtonGroup, Col, Row } from "reactstrap";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import {MyUserContext } from "../configs/MyContext";
import AlertSection from "../Layout/alertSection";

const Questions = () => {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [per, setPer] = useState(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [Msg, setMsg] = useState(null);
  const [questionID, setQuestionID] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const [checkTypeModel, setCheckTypeModel] = useState(null);

  const [user] = useContext(MyUserContext);

  const { notiId } = useParams();

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        let e = endpoint["question"](notiId);
        e += `?page=${page}`;
        let res = await authAPI().get(e);
        setQuestions(res.data.results);
        console.log(res.data.results);
      } catch (ex) {
        if(ex.response.status === 403){
          setPer(false)
        }
        console.log(ex);
        setPage(1)
      }
    };
    setIsDelete(false)
    loadQuestion();
  }, [page,notiId,isDelete]);

  if(per === false || user == null){
    return <AlertSection alert="Bạn Không Có Quyền Truy Cập" />
  }

  const deleteQuestion = (questionID) => {

    const process = async () => {
      try {
        await authAPI().delete(endpoint["questionDetail"](questionID))
        setMsg("Xóa thành công")
        setIsDelete(true)
      } catch (ex) {
        setMsg("Lỗi")
        console.log(ex.response.data);
      } finally {
        setCheckTypeModel(2)

      }

    };
   

    process();
  };

  const confirmDelete = (questionID) => {

    const process = async () => {
      try {
        setMsg("Bạn có muốn xóa câu hỏi này không?")
        setCheckTypeModel(1)
        setQuestionID(questionID)
        setShowConfirmDelete(true)
      } catch (ex) {
        console.log(ex.response.data);
      } finally {
      }

    };
   

    process();
  };
  const showComfirmDelete = () => setShowConfirmDelete(true);
  const CloseComfirmDelete = () => setShowConfirmDelete(false);


  const nextPage = () => setPage((current) => current + 1);
  const prevPage = () => setPage((current) => current - 1);

  if (questions == null) <Loading />;
  return (
    <>
      <Background type="Câu Hỏi" />

      <Modal
      className=" modal-danger"
      contentClassName="bg-gradient-danger"
      show={showConfirmDelete}
      onHide={CloseComfirmDelete}
    >
      <div className="modal-header">
        <h6 className="modal-title" id="modal-title-notification">
          Xác Nhận
        </h6>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick=""
        >
        </button>
      </div>
      <div className="modal-body">
        <div className="py-3 text-center">
          <i className="ni ni-bell-55 ni-3x" />
          <h4 className="heading mt-4">Xác nhận xóa</h4>
          <p>
          {Msg}
          </p>
        </div>
      </div>
      <div className="modal-footer">
      {checkTypeModel == 1? (<Button className="btn-white" color="default" onClick={() => deleteQuestion(questionID)}  type="button" >
      Có 
    </Button>):""}
        
        <Button
          className="text-white ml-auto"
          color="link"
          data-dismiss="modal"
          type="button"
          onClick={CloseComfirmDelete}
        >
          Close
        </Button>
      </div>
    </Modal>)

      <br></br>

      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Content</th>
              <th>Status</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions != null &&
              questions.map((p) => {
                let url = `/answer_admin/${p.id}`
                return (
                  <>
                    <tr>
                      <td>{p.id}</td>
                      <td>
                      <Link className="nav-link " to={url}>
                      {" "}
                      {p.question.length > 80
                        ? `${p.question.slice(0, 80)}...`
                        : p.question}
                    </Link>
                        
                      </td>
                      <td>{p.isAnswer ? "Đã trả lời" : "Chờ trả lời"}</td>
                      <td>{p.active ? "Hiển thị" : "Bị ẩn"}</td>
                      <td>
                        {" "}
                        <Button variant="danger" onClick={() => confirmDelete(`${p.id}`)} >DELETE </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
        <ButtonGroup aria-label="Basic example" className="mt-2">
        <Button onClick={prevPage} variant="outline-primary">
          &lt;&lt;
        </Button>
        <Button onClick={nextPage} variant="outline-primary">
          &gt;&gt;
        </Button>
      </ButtonGroup>
      </div>
    </>
  );
};

export default Questions;
