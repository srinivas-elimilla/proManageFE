import React, { useState } from "react";
import styles from "../../module-style/createtask.module.css";
import deleteIcon from "../../assets/icons/delete.svg";
import addIcon from "../../assets/icons/add.svg";

const CreateTaskModal = ({ onClose }) => {
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "", isChecked: false },
  ]);
  const [checkedCount, setCheckedCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

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

  return (
    <div className={styles.container} onClick={handleClickOutsideModal}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <label htmlFor="title">
            Title <span style={{ color: "red" }}>*</span>
          </label>
          <input type="text" id="title" placeholder="Enter Task Title" />
        </div>

        <div className={styles.priority}>
          <p>
            Select Priority <span style={{ color: "red" }}>*</span>
          </p>
          <div className={styles.btnGroup}>
            <button>
              <span style={{ backgroundColor: "#FF2473" }}></span> HIGH PRIORITY
            </button>
            <button>
              <span style={{ backgroundColor: "#18B0FF", left: "7%" }}></span>
              MODERATE PRIORITY
            </button>
            <button>
              <span style={{ backgroundColor: "#63C05B" }}></span> LOW PRIORITY
            </button>
          </div>
        </div>

        <div className={styles.checklist}>
          <p>
            Checklist ({checkedCount}/{checklistItems.length}){" "}
            <span style={{ color: "red" }}>*</span>
          </p>

          {checklistItems.map((item) => (
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
        </div>

        <div className={styles.createTaskButtons}>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className={`${styles.dueDate} ${!selectedDate ? styles.empty : ""}`}
          />
          <div className={styles.formBtns}>
            <button className={styles.cancelBtn}>Cancel</button>
            <button className={styles.saveBtn}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
