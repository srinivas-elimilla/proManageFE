import React, { useState } from "react";
import { useCreateTaskMutation } from "../../api";
import styles from "../../module-style/createtask.module.css";
import deleteIcon from "../../assets/icons/delete.svg";
import addIcon from "../../assets/icons/add.svg";
import toast from "react-hot-toast";

const CreateTaskModal = ({ onClose, users }) => {
  const [checklistItems, setChecklistItems] = useState([]);
  const [checkedCount, setCheckedCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [priority, setPriority] = useState({ color: "", priority: "" });
  const [assignedTo, setAssignedTo] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [createTask] = useCreateTaskMutation();

  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const handleAddChecklistItem = () => {
    setChecklistItems([
      ...checklistItems,
      { id: Date.now(), text: "", isChecked: false },
    ]);
  };

  const handleDeleteChecklistItem = (id) => {
    const updatedItems = checklistItems.filter((item) => item.id !== id);
    setChecklistItems(updatedItems);
    updateCheckedCount(updatedItems);
  };

  const handleChecklistInputChange = (id, text) => {
    const updatedItems = checklistItems.map((item) =>
      item.id === id ? { ...item, text } : item
    );
    setChecklistItems(updatedItems);
  };

  const handleCheckboxChange = (id) => {
    const updatedItems = checklistItems.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    setChecklistItems(updatedItems);
    updateCheckedCount(updatedItems);
  };

  const updateCheckedCount = (items) => {
    const count = items.filter((item) => item.isChecked).length;
    setCheckedCount(count);
  };

  const handleClickOutsideModal = (e) => {
    if (e.target.classList.contains(styles.container)) {
      onClose();
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!priority.priority) newErrors.priority = "Priority must be selected.";
    if (checklistItems.length === 0)
      newErrors.checklist = "At least one checklist item is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveTask = async () => {
    if (!validateFields()) return;

    const taskData = {
      title,
      checklist: checklistItems,
      priority: priority.priority,
      dueDate: selectedDate || null,
      assignedTo: assignedTo || null,
    };
    console.log(taskData);

    try {
      const res = await createTask(taskData).unwrap();
      console.log(res);
      if (res.error === false) {
        toast.success(res?.message);
      }

      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className={styles.container} onClick={handleClickOutsideModal}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <label htmlFor="title">
            Title <span style={{ color: "red" }}>*</span>
          </label>
          <div>
            <input
              type="text"
              id="title"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className={styles.error}>{errors.title}</p>}
          </div>
        </div>

        <div className={styles.priority}>
          <div>
            <p>
              Select Priority <span style={{ color: "red" }}>*</span>
            </p>
            <section className={styles.btnGroup}>
              <button
                onClick={() =>
                  setPriority({ color: "#FF2473", priority: "high" })
                }
                className={priority.priority === "high" ? styles.active : ""}
              >
                <span style={{ backgroundColor: "#FF2473" }}></span>{" "}
                <p>HIGH PRIORITY</p>
              </button>
              <button
                onClick={() =>
                  setPriority({ color: "#18B0FF", priority: "moderate" })
                }
                className={
                  priority.priority === "moderate" ? styles.active : ""
                }
              >
                <span style={{ backgroundColor: "#18B0FF" }}></span>{" "}
                <p>MODERATE PRIORITY</p>
              </button>
              <button
                onClick={() =>
                  setPriority({ color: "#63C05B", priority: "low" })
                }
                className={priority.priority === "low" ? styles.active : ""}
              >
                <span style={{ backgroundColor: "#63C05B" }}></span>{" "}
                <p>LOW PRIORITY</p>
              </button>
            </section>
          </div>
          {errors.priority && <p className={styles.error}>{errors.priority}</p>}
        </div>

        {checklistItems.length > 0 && (
          <div className={styles.assignedTo}>
            <label htmlFor="assignedTo">Assign To:</label>
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select User</option>
              {/* {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))} */}
            </select>
          </div>
        )}

        <div className={styles.checklist}>
          <p>
            Checklist ({checkedCount}/{checklistItems.length}){" "}
            <span style={{ color: "red" }}>*</span>
          </p>
          {checklistItems?.map((item) => (
            <div key={item.id} className={styles.checklistItem}>
              <input
                type="checkbox"
                checked={item.isChecked}
                onChange={() => handleCheckboxChange(item.id)}
                className={styles.checkbox}
              />
              <input
                type="text"
                placeholder="Add a task"
                value={item.text}
                onChange={(e) =>
                  handleChecklistInputChange(item.id, e.target.value)
                }
                className={styles.checklistInput}
              />
              <img
                src={deleteIcon}
                alt="delete"
                onClick={() => handleDeleteChecklistItem(item.id)}
                className={styles.deleteIcon}
              />
            </div>
          ))}
          <button onClick={handleAddChecklistItem} className={styles.addBtn}>
            <img src={addIcon} alt="add" />
            Add New
          </button>
          {errors.checklist && (
            <p className={styles.error}>{errors.checklist}</p>
          )}
        </div>

        <div className={styles.createTaskButtons}>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className={`${styles.dueDate} ${!selectedDate ? styles.empty : ""}`}
          />
          <div className={styles.formBtns}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.saveBtn} onClick={handleSaveTask}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
