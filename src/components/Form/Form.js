import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/store";
import { isEmail, isLength } from "validator";
import styles from "./Form.module.css";

function Form() {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [validationErrors, setValidationErrors] = useState([]);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.list);
  const isValid = validationErrors.length === 0;

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem(formData));
    setFormData(initialState);
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

  const validate = (field, value) => {
    switch (field) {
      case "firstName":
        if (!value) return "FirstName required";
        return list.some((entry) => entry.firstName === value)
          ? "Existing first name"
          : undefined;
      case "lastName":
        if (!value) return "LastName required";
        return list.some((entry) => entry.lastName === value)
          ? "Existing last name"
          : undefined;
      case "email":
        return !isEmail(value) ? "Not valid email" : undefined;
      case "message":
        return !isLength(value, { min: 10, max: undefined })
          ? "Minimum length is 10 chars"
          : undefined;
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
        {validationErrors.map((error) => (
          <div className={styles["form-error"]} key={error} data-testid="error">
            {error}
          </div>
        ))}
      </form>
    </div>
  );
}

export default Form;
