import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "../module-style/dashboard.module.css";
import dashboard from "../assets/icons/dashboard.svg";
import database from "../assets/icons/database.svg";
import layout from "../assets/icons/layout.svg";
import settings from "../assets/icons/settings.svg";
import logout from "../assets/icons/logout.svg";
import Board from "../dashboard/Board";
import Analytics from "../dashboard/Analytics";
import Settings from "../dashboard/Settings";
import CommonModal from "./modals/CommonModal";
import { useGetUserQuery } from "../api";
import { setCredentials } from "../slices/authSlice";

const DashboardContent = ({ activeTab }) => {
  switch (activeTab) {
    case "0":
      return <Board />;
    case "1":
      return <Analytics />;
    case "2":
      return <Settings />;
    default:
      return null;
  }
};

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user } = useGetUserQuery();
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("0");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    // console.log("user >>>>>>>>", user);

    if (user) {
      dispatch(
        setCredentials({ user: user, token: localStorage.getItem("token") })
      );
    }
  }, [user]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <img src={dashboard} alt="dashboard" /> <p>Pro Manage </p>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li
              onClick={() => setActiveTab("0")}
              className={activeTab === "0" ? styles.active : ""}
            >
              <img src={layout} alt="layout" /> <p>Board</p>
            </li>
            <li
              onClick={() => setActiveTab("1")}
              className={activeTab === "1" ? styles.active : ""}
            >
              <img src={database} alt="database" /> <p>Analytics</p>
            </li>
            <li
              onClick={() => setActiveTab("2")}
              className={activeTab === "2" ? styles.active : ""}
            >
              <img src={settings} alt="settings" /> <p>Settings</p>
            </li>
          </ul>
        </nav>
        <p className={styles.logout} onClick={openModal}>
          <img src={logout} alt="logout" />
          Log Out
        </p>
      </div>
      <div className={styles.content}>
        <DashboardContent activeTab={activeTab} />
      </div>
      {isModalOpen && <CommonModal onClose={closeModal} type={"logout"} />}
    </div>
  );
};
