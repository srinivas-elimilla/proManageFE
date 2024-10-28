import React, { useState } from "react";
import moment from "moment";
import usersIcon from "../assets/icons/users.svg";
import collapseIcon from "../assets/icons/collapse.svg";
import addIcon from "../assets/icons/add.svg";
import styles from "../module-style/board.module.css";
import { useSelector } from "react-redux";
import CreateTaskModal from "../components/modals/CreateTaskModal";
import { useGetTasksQuery } from "../api";
import TaskCard from "./TaskCard";
import { taskCategories } from "../utils/constants";

const Board = () => {
  const user = useSelector((state) => state.auth.user);
  const [filter, setFilter] = useState("week");
  const { data: allTasks = [] } = useGetTasksQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [arrowToggles, setArrowToggles] = useState({
    backlog: true,
    todo: true,
    progress: true,
    done: true,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleToggle = (category) => {
    setArrowToggles((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const filterByCategory = (category) =>
    allTasks.filter((task) => task.category === category);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
  };

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
        <select
          name="filter"
          id="filter"
          className={styles.customSelect}
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="today">To Day</option>
        </select>
      </div>
      <div className={styles.cardSection}>
        {taskCategories.map(({ id, label }) => (
          <div key={id} className={styles.card}>
            <div className={styles.cardHeader}>
              <p>{label}</p>
              <div className={styles.todoHeaderIcons}>
                {id === "todo" && (
                  <img
                    src={addIcon}
                    alt="add task"
                    onClick={openModal}
                    className={styles.addIcon}
                  />
                )}
                <img
                  src={collapseIcon}
                  alt="collapse"
                  onClick={() => handleToggle(id)}
                  className={styles.collapseIcon}
                />
              </div>
            </div>
            <div className={styles.taskCard}>
              <TaskCard
                tasks={filterByCategory(id)}
                arrowToggle={arrowToggles[id]}
              />
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <CreateTaskModal onClose={closeModal} />}
    </div>
  );
};

export default Board;
