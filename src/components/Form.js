import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initialState, updateFormAction } from "../store/store";
import { isEmail, isLength } from "validator";
import styles from "./Form.module.css";

function Form() {
  const formState = useSelector((state) => state.form);
  const [formData, setFormData] = useState(initialState);
  const [validationErrors, setValidationErrors] = useState([]);
  const dispatch = useDispatch();

  const isValid = Object.keys(validationErrors).length === 0;

  useEffect(() => {
    validateForm();
  }, []);

  const handleChange = (field, value) => {
    validateForm();
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateForm = () => {
    const formValidationResult = Object.keys(formData).reduce((acc, field) => {
      const validationResult = validate(field, formData[field]);
      if (validationResult) {
        acc.push(validationResult);
      }

      return acc;
    }, []);

    setValidationErrors(formValidationResult);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFormAction(formState));
  };

  const validate = (field, value) => {
    switch (field) {
      case "firstName":
        break;
      case "lastName":
        break;
      case "email":
        return !isEmail(value) ? "Not valid email" : false;
      case "message":
        return !isLength(value, { min: 10, max: undefined })
          ? "Minimum length is 10 chars"
          : false;
      default:
        return undefined;
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          className={styles["form-input"]}
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <input
          type="text"
          className={styles["form-input"]}
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <input
          type="email"
          className={styles["form-input"]}
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <textarea
          placeholder="Message"
          className={styles["form-input"]}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
        />
        <button
          className={styles["form-submit"]}
          disabled={!isValid}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
