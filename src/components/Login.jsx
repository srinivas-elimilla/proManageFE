import React, { useState } from "react";
import { useLoginUserMutation } from "../api";
import { toast } from "react-hot-toast";
import styles from "../module-style/register.module.css";
import robotIcon from "../assets/icons/robot.svg";
import emailIcon from "../assets/icons/email.svg";
import lockIcon from "../assets/icons/lock.svg";
import viewIcon from "../assets/icons/view.svg";
import viewSlashIcon from "../assets/icons/viewslash.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [viewPasswordToggle, setViewPasswordToggle] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password  is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      toast.success(res?.message);
      localStorage.setItem("token", res.token);
      dispatch(setCredentials({ user: res, token: res.token }));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message);
      console.error("Failed to login", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.circle}></div>
        <img src={robotIcon} alt="Login" />
        <div className={styles.welcome}>
          <h1>Welcome aboard my friend</h1>
          <p>Just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={styles.formSection}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
          <div className={styles.btnGropu}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Login..." : "Login"}
            </button>
            <div>
              <p className={styles.pTag}>Have no account yet?</p>
            </div>
            <button
              type="button"
              className={styles.transButton}
              onClick={() => navigate("/")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
