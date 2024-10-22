import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../module-style/dashboard.module.css";
import dashboard from "../assets/icons/dashboard.svg";
import database from "../assets/icons/database.svg";
import layout from "../assets/icons/layout.svg";
import settings from "../assets/icons/settings.svg";
import logout from "../assets/icons/logout.svg";

const DashboardContent = ({ activeTab }) => {
  switch (activeTab) {
    case "0":
      return <h1>This is the Board content.</h1>;
    case "1":
      return <h1>This is the Board content.</h1>;
    case "2":
      return <h1>This is the Settings content.</h1>;
    default:
      return null;
  }
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("0");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

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
        <p className={styles.logout}>
          <img src={logout} alt="logout" />
          Log Out
        </p>
      </div>
      <div className={styles.content}>
        <DashboardContent activeTab={activeTab} />
      </div>
    </div>
  );
};
