import React, { useState } from "react";
import styles from "../module-style/analytics.module.css";
import { useGetAnalyticsQuery } from "../api";

const Analytics = () => {
  const { data, isLoading, error } = useGetAnalyticsQuery();
  // console.log("data >>>>>>>>>", data);

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
              <p>{data?.analytics?.backlogCount || 0}</p>
            </div>
            <div className={styles.list}>
              <p>
                <span></span>To-do Tasks
              </p>
              <p>{data?.analytics?.todoCount || 0}</p>
            </div>
            <div className={styles.list}>
              <p>
                <span></span>In-Progress Tasks
              </p>
              <p>{data?.analytics?.progressCount || 0}</p>
            </div>
            <div className={styles.list}>
              <p>
                <span></span>Completed Tasks
              </p>
              <p>{data?.analytics?.doneCount || 0}</p>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.ulDiv}>
            <div className={styles.list}>
              <p>
                <span></span>Low Priority
              </p>
              <p>{data?.analytics?.lowPriorityCount || 0}</p>
            </div>
            <div className={styles.list}>
              <p>
                <span></span>Moderate Priority
              </p>
              <p>{data?.analytics?.moderatePriorityCount || 0}</p>
            </div>
            <div className={styles.list}>
              <p>
                <span></span>High Priority
              </p>
              <p>{data?.analytics?.highPriorityCount || 0}</p>
            </div>
            <div className={styles.list}>
              <p>
                <span></span>Due Date Tasks
              </p>
              <p>{data?.analytics?.dueDateCount || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
