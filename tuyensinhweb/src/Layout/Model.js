import { useEffect,useState,useContext  } from "react";
import { Button, Modal } from "react-bootstrap"
import {MyUserContext } from "../configs/MyContext";

const Model = ({Title,Msg,button1,button2 }) => {
  const { showModel, setShowModel } = useContext(MyUserContext);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const showComfirmDelete = () => setShowConfirmDelete(true);
  const CloseComfirmDelete = () => {setShowConfirmDelete(false);}

  useEffect(() => {
    setShowConfirmDelete(showModel);
  }, [showModel]);

    if(button1==null){
    return(
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
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="py-3 text-center">
            <i className="ni ni-bell-55 ni-3x" />
            <h4 className="heading mt-4">{Title}</h4>
            <p>
            {Msg}
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <Button className="btn-white" color="default" type="button" >
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
        </div>
      </Modal>)
    }
}

export default Model


