import React, { useState } from "react";
import styles from "../module-style/taskcard.module.css";
import upArrow from "../assets/icons/upArrow.svg";
import moment from "moment";
import { baseUrl, categories, priorityColors } from "../utils/constants";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../api";
import CommonModal from "../components/modals/CommonModal";
import toast from "react-hot-toast";
import { isDateCrossed } from "../utils/util";
import UpdateTaskModal from "../components/modals/UpdateTaskModal";

const TaskCard = ({ tasks, arrowToggle }) => {
  const [updateCategory, { isLoading }] = useUpdateTaskMutation();
  const [taskData, setTaskData] = useState({});
  const [deleteTask] = useDeleteTaskMutation();
  const [showActionModal, setShowActionModal] = useState("");
  const [editModal, setEditModal] = useState(false);
  const upDateCategory = async (category, id) => {
    const updateCat = await updateCategory({ category, id });
    // console.log("updateCat >>>>>>", updateCat.data);
    if (updateCat?.data?.error === false) {
      toast.success(updateCat?.data?.message);
    } else {
      toast.error("some error occured");
    }
  };
  const toggleActionModal = (taskId) => {
    setShowActionModal((prev) => (prev === taskId ? null : taskId));
  };
  const handleDeleteTask = async (id) => {
    const result = await deleteTask({ id });
    if (result?.data?.error === false) {
      toast.success(result?.data?.message);
    } else {
      toast.error("some error occured");
    }
  };
  const closeModal = () => setEditModal(false);

  const handleShareTask = async (task) => {
    const shareData = {
      task,
      text: `Check out this task: ${task.title}`,
      url: `${baseUrl}/${task._id}`,
    };
    try {
      await navigator.share(shareData);
      toast.success("link copied");
    } catch (error) {
      toast.error("error sharing task!");
      console.log(error);
    }
  };

  if (isLoading) {
    return <CommonModal type={"loading"} />;
  }
  return (
    <>
      {tasks?.map((task) => {
        const buttons = categories[task.category];
        const checkedCount = task?.checklist?.filter(
          (item) => item.isChecked
        ).length;

        return (
          <div className={styles.container} key={task._id}>
            <div className={styles.header}>
              <div className={styles.priorityTitle}>
                <span
                  style={{
                    backgroundColor:
                      priorityColors[task.priority.toLowerCase()],
                  }}
                ></span>
                <p>{task.priority.toUpperCase()} PRIORITY</p>
              </div>
              <div
                className={styles.threedots}
                onClick={() => toggleActionModal(task._id)}
              >
                <span></span>
                <span></span>
                <span></span>
                {showActionModal === task._id && (
                  <div className={styles.actionsModal}>
                    <button
                      onClick={() => {
                        setTaskData(task);
                        setEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleShareTask(task)}>Share</button>
                    <button
                      style={{ color: "#CF3636" }}
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.title}>
              <h3 title={task.title}>{task.title}</h3>
            </div>

            <details className={styles.accordion} open={!arrowToggle}>
              <summary className={styles.accordionHeader}>
                <p>
                  Checklist ({checkedCount}/{task.checklist.length})
                </p>
                <span>
                  <img
                    src={upArrow}
                    alt="arrow"
                    className={styles.accordionIcon}
                  />
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
              <div>
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
              <div className={styles.categorySec}>
                {buttons.map((btn, index) => {
                  return (
                    <button
                      key={btn.key}
                      onClick={() => upDateCategory(btn.key, task._id)}
                    >
                      {btn.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      {editModal && (
        <UpdateTaskModal taskData={taskData} onClose={closeModal} />
      )}
    </>
  );
};

export default TaskCard;
