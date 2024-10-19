import React from "react";
import styles from "../module-style/register.module.css";
import robotIcon from "../assets/icons/robot.svg";
import emailIcon from "../assets/icons/email.svg";
import userIcon from "../assets/icons/user.svg";
import lockIcon from "../assets/icons/lock.svg";

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.circle}></div>
        <img src={robotIcon} alt="Register" />
      </div>
      <div className={styles.formSection}>
        <h2>Register</h2>
        <form>
          <div className={styles.formGroup}>
            <img src={userIcon} alt="Name Icon" className={styles.icon} />
            <input type="text" placeholder="Name" />
          </div>
          <div className={styles.formGroup}>
            <img src={emailIcon} alt="Email Icon" className={styles.icon} />
            <input type="email" placeholder="Email" />
          </div>
          <div className={styles.formGroup}>
            <img src={lockIcon} alt="Password Icon" className={styles.icon} />
            <input type="password" placeholder="Password" />
          </div>
          <div className={styles.formGroup}>
            <img
              src={lockIcon}
              alt="Confirm Password Icon"
              className={styles.icon}
            />
            <input type="password" placeholder="Confirm Password" />
          </div>
          <div className={styles.btnGropu}></div>
          <button type="submit">Register</button>
          <div>
            <p>Have an account ?</p>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
