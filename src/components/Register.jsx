import React, { useState } from "react";
import { useRegisterUserMutation } from "../api";
import { toast } from "react-hot-toast";
import styles from "../module-style/register.module.css";
import robotIcon from "../assets/icons/robot.svg";
import emailIcon from "../assets/icons/email.svg";
import userIcon from "../assets/icons/user.svg";
import lockIcon from "../assets/icons/lock.svg";
import viewIcon from "../assets/icons/view.svg";
import viewSlashIcon from "../assets/icons/viewslash.svg";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain both letters and numbers.";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }).unwrap();
      console.log(res);

      toast.success(res?.message);
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message);
      console.error("Failed to register", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.circle}></div>
        <img src={robotIcon} alt="Register" />
        <div className={styles.welcome}>
          <h1>Welcome aboard my friend</h1>
          <p>Just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={styles.formSection}>
        <h1>Register</h1>
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
                placeholder="Email"
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
                  name="password"
                  placeholder="Password"
                  value={formData.password}
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
                alt="Confirm Password Icon"
                className={styles.icon}
              />
              <input
                type={viewCfmPasswordToggle ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <img
                src={viewCfmPasswordToggle ? viewSlashIcon : viewIcon}
                alt="Confirm Password Icon"
                className={(styles.icon, styles.eye)}
                onClick={() => setViewCfmPasswordToggle(!viewCfmPasswordToggle)}
              />
            </div>
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword}</p>
            )}
          </div>
          <div className={styles.btnGropu}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
            <div>
              <p className={styles.pTag}>Have an account?</p>
            </div>
            <button
              type="button"
              className={styles.transButton}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
