import React, { useState } from "react";
import moment from "moment";
import usersIcon from "../assets/icons/users.svg";
import collapseIcon from "../assets/icons/collapse.svg";
import addIcon from "../assets/icons/add.svg";
import styles from "../module-style/board.module.css";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Board = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user in board >>>>>>>", user);

  return (
    <div>
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
              <img src={addIcon} alt="collapse" /> &nbsp;
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
    </div>
  );
};

export default Board;
