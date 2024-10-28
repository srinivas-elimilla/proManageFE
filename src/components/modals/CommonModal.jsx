import React from "react";
import styles from "../../module-style/commonmodal.module.css";
import { useNavigate } from "react-router-dom";

const CommonModal = ({ type, onClose }) => {
  const handleClickOutsideModal = (e) => {
    if (e.target.classList.contains(styles.container)) {
      onClose();
    }
  };
  return (
    <div className={styles.container} onClick={handleClickOutsideModal}>
      <div className={styles.modal}>
        {type === "logout" ? addPeople(onClose) : ""}
        {type === "loading" ? loading() : ""}
      </div>
    </div>
  );
};

export default CommonModal;

function addPeople(onClose) {
  const navigate = useNavigate();

  return (
    <div className={styles.logout}>
      <p className={styles.modalHead}>Are you sure you want to Logout?</p>
      <button
        className={styles.yesBtn}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        <span>Yes, Logout</span>
      </button>
      <button className={styles.cancelBtn} onClick={onClose}>
        <span>Cancel</span>
      </button>
    </div>
  );
}

function loading() {
  return (
    <div className={styles.loadingDots}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
}
