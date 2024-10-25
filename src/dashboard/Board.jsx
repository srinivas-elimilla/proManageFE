import React, { useState } from "react";
import moment from "moment";
import usersIcon from "../assets/icons/users.svg";
import collapseIcon from "../assets/icons/collapse.svg";
import addIcon from "../assets/icons/add.svg";
import styles from "../module-style/board.module.css";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import CreateTaskModal from "../components/modals/CreateTaskModal";

const Board = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user in board >>>>>>>", user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <p>Welcome! {user?.name || ""}</p>
        <p className={styles.date}>{moment().format("Do MMM, YYYY")}</p>
      </div>
      <div className={styles.filter}>
        <p>
          Board
          <span>
            <img src={usersIcon} alt="users" />
            &nbsp; Add people
          </span>
        </p>
        <select name="filter" id="filter" className={styles.customSelect}>
          <option value="">This week</option>
        </select>
      </div>
      <div className={styles.cardSection}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p>Backlog</p>
            <img src={collapseIcon} alt="collapse" />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p>To do</p>
            <div>
              <img src={addIcon} alt="collapse" onClick={openModal} /> &nbsp;
              <img src={collapseIcon} alt="collapse" />
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p>In progress</p>
            <img src={collapseIcon} alt="collapse" />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p>Done</p>
            <img src={collapseIcon} alt="collapse" />
          </div>
        </div>
      </div>
      {isModalOpen && <CreateTaskModal onClose={closeModal} />}
    </div>
  );
};

export default Board;
