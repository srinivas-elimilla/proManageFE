import React, { useState } from "react";
import emailIcon from "../assets/icons/email.svg";
import userIcon from "../assets/icons/user.svg";
import lockIcon from "../assets/icons/lock.svg";
import viewIcon from "../assets/icons/view.svg";
import viewSlashIcon from "../assets/icons/viewslash.svg";
import { useNavigate } from "react-router-dom";
import styles from "../module-style/settings.module.css";
import { useUpdateUserMutation } from "../api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user in setting >>>>>>>", user);

  const navigate = useNavigate();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    name: "" || user?.name,
    email: "" || user?.email,
    oldPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    newPassword: "",
  });

  const [viewPasswordToggle, setViewPasswordToggle] = useState(false);
  const [viewCfmPasswordToggle, setViewCfmPasswordToggle] = useState(false);

  // Regex patterns for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, 1 letter, and 1 number

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      newPassword: "",
    };

    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    if (formData.newPassword && !formData.oldPassword) {
      newErrors.oldPassword = "Old Password is required";
      valid = false;
    }

    if (formData.oldPassword && !formData.newPassword) {
      newErrors.newPassword = "New Password is required";
      valid = false;
    }

    if (formData.newPassword && !passwordRegex.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must be at least 8 characters long and contain both letters and numbers.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await updateUser({
        name: formData.name,
        email: formData.email,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }).unwrap();
      // console.log("res in settings >>>>>", res);

      toast.success(res?.message);
      if (res?.logout) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err?.data?.message);
      console.error("Failed to update", err);
    }
  };
  return (
    <div>
      <p>Settings</p>
      <div className={styles.formSection}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <div className={styles.formGroup}>
              <img src={userIcon} alt="Name Icon" className={styles.icon} />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.formGroup}>
              <img src={emailIcon} alt="Email Icon" className={styles.icon} />
              <input
                type="email"
                name="email"
                placeholder="Update Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.formGroup}>
                <img
                  src={lockIcon}
                  alt="Password Icon"
                  className={styles.icon}
                />
                <input
                  type={viewPasswordToggle ? "text" : "password"}
                  name="oldPassword"
                  placeholder="Old Password"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                />
                <img
                  src={viewPasswordToggle ? viewSlashIcon : viewIcon}
                  alt="Password Icon"
                  className={(styles.icon, styles.eye)}
                  onClick={() => setViewPasswordToggle(!viewPasswordToggle)}
                />
              </div>
            </div>
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.formGroup}>
              <img
                src={lockIcon}
                alt="New Password Icon"
                className={styles.icon}
              />
              <input
                type={viewCfmPasswordToggle ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
              <img
                src={viewCfmPasswordToggle ? viewSlashIcon : viewIcon}
                alt="Confirm Password Icon"
                className={(styles.icon, styles.eye)}
                onClick={() => setViewCfmPasswordToggle(!viewCfmPasswordToggle)}
              />
            </div>
            {errors.newPassword && (
              <p className={styles.error}>{errors.newPassword}</p>
            )}
          </div>
          <div className={styles.btnGropu}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
