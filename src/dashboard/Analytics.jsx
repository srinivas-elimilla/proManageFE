import React, { useState } from "react";
import styles from "../module-style/analytics.module.css";

const Analytics = () => {
  return (
    <div>
      <p>Analytics</p>
      <div className={styles.cardSection}>
        <div className={styles.card}>
          <div className={styles.ulDiv}>
            <div className={styles.list}>
              <p>
                <span></span>Backlog Tasks
              </p>
              <p>16</p>
            </div>
            <div className={styles.list}>
              <p>
                <span></span>To-do Tasks
              </p>
              <p>16</p>
            </div>
            <div className={styles.list}>
              <p>
                <span></span>In-Progress Tasks
              </p>
              <p>03</p>
            </div>
            <div className={styles.list}>
              <p>
                <span></span>Completed Tasks
              </p>
              <p>08</p>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.ulDiv}>
            <div className={styles.list}>
              <p>
                <span></span>Low Priority
              </p>
              <p>16</p>
            </div>
            <div className={styles.list}>
              <p>
                <span></span>Moderate Priority
              </p>
              <p>16</p>
            </div>
            <div className={styles.list}>
              <p>
                <span></span>High Priority
              </p>
              <p>03</p>
            </div>
            <div className={styles.list}>
              <p>
                <span></span>Due Date Tasks
              </p>
              <p>08</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
