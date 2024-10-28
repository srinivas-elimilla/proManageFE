import React from "react";
import styles from "../module-style/public.module.css";
import { useGetTaskQuery } from "../api";
import { priorityColors } from "../utils/constants";
import { useParams } from "react-router-dom";
import upArrow from "../assets/icons/upArrow.svg";
import dashboard from "../assets/icons/dashboard.svg";
import moment from "moment";

const Public = () => {
  const params = useParams();
  const { data: task } = useGetTaskQuery(params.taskId);

  const checkedCount = task?.checklist?.filter((item) => item.isChecked).length;

  return (
    <div className={styles.public}>
      <div className={styles.logo}>
        <img src={dashboard} alt="dashboard" /> <p>Pro Manage </p>
      </div>
      <div className={styles.container} key={task._id}>
        <div className={styles.header}>
          <div className={styles.priorityTitle}>
            <span
              style={{
                backgroundColor: priorityColors[task.priority.toLowerCase()],
              }}
            ></span>
            <p>{task.priority.toUpperCase()} PRIORITY</p>
          </div>
        </div>

        <div className={styles.title}>
          <h3 title={task.title}>{task.title}</h3>
        </div>

        <details className={styles.accordion} open={true}>
          <summary className={styles.accordionHeader}>
            <p>
              Checklist ({checkedCount}/{task.checklist.length})
            </p>
            <span>
              <img src={upArrow} alt="arrow" className={styles.accordionIcon} />
            </span>
          </summary>
          <div className={styles.accordionContent}>
            {task.checklist.map((item) => (
              <div key={item._id} className={styles.checklistItem}>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  className={styles.checkbox}
                  readOnly
                />
                <input
                  type="text"
                  value={item.text}
                  title={item.text}
                  readOnly
                  className={styles.checklistInput}
                />
              </div>
            ))}
          </div>
        </details>

        <div className={styles.btns}>
          <span>Due Date</span>
          {task?.dueDate && (
            <button
              className={
                task.category === "done"
                  ? styles.dueDateDone
                  : isDateCrossed(task.dueDate)
                  ? styles.dueDateCrossed
                  : ""
              }
            >
              {moment(task.dueDate).format("MMM Do")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Public;
