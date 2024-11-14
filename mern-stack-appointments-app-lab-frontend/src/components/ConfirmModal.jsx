import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const OverLay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 text-center">
            Are you sure you want to delete?
          </div>
          <div className="col-md-4"></div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-2"></div>
          <button onClick={props.delete} className="col-md-3">
            yes
          </button>
          <div className="col-md-2"></div>
          <button
            onClick={() => props.setOpenModal(false)}
            className="col-md-3"
          >
            cancel
          </button>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

const ConfirmModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay setOpenModal={props.setOpenModal} delete={props.delete} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ConfirmModal;
