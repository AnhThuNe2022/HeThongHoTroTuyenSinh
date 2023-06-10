import { useContext, useEffect, useState } from "react";
import API, { authAPI, endpoint } from "../configs/API";
import { ButtonGroup, Button, Form, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../Layout/Loading";
import Moment from "react-moment";
import {MyUserContext } from "../configs/MyContext";
import Modal from 'react-bootstrap/Modal';
import { Container } from "reactstrap";
import Background from "../Layout/background";

const AdmissionInfoDetail = () => {
  const [admissionInfo, setAdmissionInfo] = useState(null);
  const [comments, setcomments] = useState([]);
  const {adInfoId} = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useContext(MyUserContext);
  const [page, setPage] = useState(1);  
  const [showForm, setShowForm] =  useState([]);
  const [contentRep, setcontentRep] = useState("");
  const [isRep, setIsRep] = useState(false);
  const [commentIdDelete, setCommentIdDelete] = useState(null);
  const [typeDelete, setTypeDelete] = useState(null);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [msg, setMsg] = useState(null);


  useEffect(() => {
    const loadAdmissionInfoDetail = async () => {
      let res = await API.get(endpoint["admissionInfo"](adInfoId));
      setAdmissionInfo(res.data);
    };
    setAdmissionInfo(null);
    loadAdmissionInfoDetail();
  }, [adInfoId]);

  useEffect(() => {
    if (comments != null) {
      setShowForm(comments.map(() => false));
    }
  }, [comments]);


  useEffect(() => {
    const loadComments = async () => {
      try {
        let e = endpoint["comments"](adInfoId);
        e += `?page=${page}`;
        let res = await API.get(e);
        console.log(res.data.results)
        // let data = [];

        // for (let i = 0; i < res.data.results.length; i++) {
        //   let comment = res.data.results[i];
        //   let en = endpoint["comments_rep"](comment.id);
        //   let infoRes = await API.get(en);
        //   let info = infoRes.data.results;
        //   data.push([comment, info]);
        // }
        // console.log(data);
        setcomments(res.data.results);
        
      } catch (ex) {
        setPage(1);
      }
    };
    setIsDelete(false)
    setIsRep(false)
    loadComments();
  }, [page, adInfoId,isRep,isDelete]);

  const addComment = (evt) => {
    evt.preventDefault();

    const process = async () => {
      try {
        let res = await authAPI().post(endpoint["comments"](adInfoId), {
          content: content,
        });
        // let data = []
        // data.push(res.data,null)
        setcomments((current) => [res.data, ...current]);
      } catch (ex) {
        console.log(ex.response.data);
      } finally {
        setContent("")
        setLoading(false);
      }
    };

    setLoading(true);
    process();
  };

  const addCommentRep = (comment) => (evt) => {
    evt.preventDefault();

    const process = async () => {
      try {
        let res = await authAPI().post(endpoint["comments_rep"](comment), {
          content: contentRep ,
        });
        //  let data = []
        //  data.push(comment,res.data)
        //  setcomments((current) => [data, ...current]);
        setIsRep(true)

      } catch (ex) {
        console.log(ex.response.data);
      } finally {
        setcontentRep("")
        setLoading(false);
      }
    };

    setLoading(true);
    process();
  };

  const toggleReplyForm = (index,userName) => {

    setShowForm((prev) => {
      const newShowForm = [...prev];
      newShowForm.forEach((value, i) => {
        if (i !== index && value) {
          newShowForm[i] = false;
        }
      });
      newShowForm[index] = !newShowForm[index];
      setcontentRep("@"+userName+" ");
      return newShowForm;
    });
    
  };


  const deleteComment = (comment,type) => (evt)  => {
    evt.preventDefault();

    const process = async () => {
      try {
        if(type === 1){
           await authAPI().delete(endpoint["delete_comment"](comment))
          // let data = []
          // data.push(res.data,null)
          // setcomments((current) => [data, ...current]);
         
        }
        else if(type === 2){
           await authAPI().delete(endpoint["delete_commentRep"](comment));
        }
        setMsg("Xóa Thành Công")
        setIsDelete(true)
       
      } catch (ex) {
        if(ex.response.status === 403){
          setMsg("Bạn không có quyền xóa cmt của người khác!")
        }
        else{
          setMsg("Không thể xóa cmt")

        }
      } finally{

      }
    };

    process();
  };




  const showComfirmDelete = (commentId,type) =>{
    setMsg("Bạn có chắc chắn muốn xóa bình luận này không?")
    setCommentIdDelete(commentId)
    setTypeDelete(type)
    setShowConfirmDelete(true);
  } 
  const CloseComfirmDelete = () => setShowConfirmDelete(false);


  const nextPage = () => setPage((current) => current + 1);
  const prevPage = () => setPage((current) => current - 1);

  if (admissionInfo === null) return <Loading />;

  return (
    <>
 <Background type ="Thông Báo"/>

    <Container>
    <div className="pt-4 text-center">
    <h1 className="title">
    <span className="d-block mb-1" >{admissionInfo.title}</span>
     </h1> 
     </div>
      <br></br>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div >
          <img
            src={admissionInfo.image}
            width="1000"
            alt={admissionInfo.title}
          />
        </div>
      </div>
      <br></br>
        <h5 className="title">
           <span className="d-block mb-1" dangerouslySetInnerHTML={{ __html: admissionInfo.content }}></span>
         </h5> 

      <hr></hr>
      {user === null ? (  
        <Link to="/login">Đăng nhập</Link>
      ) : (
        <Form onSubmit={addComment}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              value={content}
              onChange={(e) => setContent(e.target.value)}
              as="textarea"
              rows={3}
              placeholder="Nội dung bình luận..."
            />
          </Form.Group>
          {loading ? (
            <Loading />
          ) : (
            <Button variant="default" type="submit" >
              Bình luận
            </Button>
          )}
        </Form>
      )}

      <hr></hr>

      <Modal
      className=" modal-danger"
      contentClassName="bg-gradient-danger"
      show={showConfirmDelete} onHide={CloseComfirmDelete}
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
          <h4 className="heading mt-4">Xác nhận xóa {commentIdDelete} !</h4>
          <p>
          {msg}
          
          </p>
        </div>
      </div>
      <div className="modal-footer">
      {msg =="Bạn có chắc chắn muốn xóa bình luận này không?"?(<>
        <Button onClick={deleteComment(commentIdDelete,typeDelete)} className="btn-white" color="default" type="button" >
        Có
      </Button>
      <Button
        className="text-white ml-auto"
        color="link"
        data-dismiss="modal"
        type="button"
        onClick={CloseComfirmDelete}

      >
        Close
      </Button>
        
        </>): <Button
        className="text-white ml-auto"
        color="link"
        data-dismiss="modal"
        type="button"
        onClick={CloseComfirmDelete}

      >
        Close
      </Button> }
       
      </div>
    </Modal>

      {comments === null ? (
        <Loading />
      ) : (
        comments.map((data, index) => (

          <Row className="bg-light m-1 p-1">
            <Col xs={3} md={1}>
              <Image
                src={data.user.image}
                alt={data.user.username}
                rounded
                fluid
              />
            </Col>
            <Col xs={9} md={11}>
              <p>{data.content}</p>
              <small>
                Được {data.user.username} bình luận vào{(" ")}    
                <Moment fromNow>{data.create_date}</Moment>
              </small>
              {user !== null ?( <div style={{ display: 'flex', gap: '10px'}}>  <Button size="sm" variant="outline-dark" style={{ display: 'block' }}  onClick={() => toggleReplyForm(index,data.user.username)}>
              Reply
            </Button>
            <Button size="sm"   variant="danger" onClick={() => showComfirmDelete(data.id,1)}>
            Xóa
             </Button>

            </div>
            )
            :""}

           
              {showForm[index]&& (
                <Form onSubmit={addCommentRep(data.id)}>
                  <Form.Group controlId="replyContent">
                    <Form.Label></Form.Label>
                    <Form.Control as="textarea" value={contentRep} rows={3} onChange={(e) => setcontentRep(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              )}

              {data.comment_rep &&
                data.comment_rep.map((reply) => (
                  <Row key={reply.id} className="bg-light m-1 p-1">
                    <Col xs={3} md={1}>
                      <Image
                        src={reply.user.image}
                        alt={reply.user.username}
                        rounded
                        fluid
                      />
                    </Col>
                    <Col xs={9} md={11}>
                      <p>{reply.content}</p>
                      <small>
                        Được {reply.user.username} bình luận vào{" "}
                        <Moment fromNow>{reply.create_date}</Moment>
                      </small>
                      {user !== null ?( <div style={{ display: 'flex', gap: '10px'}}>  <Button size="sm"  variant="outline-dark" style={{ display: 'block' }}  onClick={() => toggleReplyForm(index,reply.user.username)}>
                      Reply
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => showComfirmDelete(reply.id,2,reply.user.username)}>
                    Xóa
                     </Button>
        
                    </div>
                    )
                    :""}
                    </Col>
                  </Row>
                ))}
            </Col>
          </Row>
        ))
      )}

      <ButtonGroup aria-label="Basic example" className="mt-2">
        <Button onClick={prevPage} variant="outline-primary">
          &lt;&lt;
        </Button>
        <Button onClick={nextPage} variant="outline-primary">
          &gt;&gt;
        </Button>
      </ButtonGroup>
      </Container>
    </>
  );
};

export default AdmissionInfoDetail;
