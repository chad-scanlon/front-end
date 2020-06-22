import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import * as Yup from "yup";
import { Link, Route } from "react-router-dom";

const Register = () => {
  const [post, setPost] = useState();
  const [clientState, setClientState] = useState({
    username: "",
    password: "",
  });

  const formSchema = Yup.object().shape({
    name: Yup.string().min(2, "Requires at least 2 characters"),
    password: Yup.string().min(4, "Requires a minimum of 4 characters"),
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateChange = (e) => {
    if (e.target.name === "name" || e.target.name === "password") {
      Yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then((isValid) => {
          setErrors({ ...errors, [e.target.name]: "" });
        })
        .catch((err) => {
          console.log(err.errors);
          setErrors({ ...errors, [e.target.name]: err.errors[0] });
        });
    }
  };

  const handleChange = (e) => {
    e.persist();
    setClientState({ ...clientState, [e.target.name]: e.target.value });
    validateChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/clients/register", clientState)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
        setClientState({
          username: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="userName">
        <label htmlFor="userName">
          User Name:
          <input
            type="text"
            name="userName"
            value={clientState.name}
            onChange={handleChange}
          />
          {errors.username.length > 2 ? (
            <p className="error">{errors.name}</p>
          ) : null}
        </label>
      </div>
      <div className="password">
        <label htmlFor="password">
          Password:
          <input
            type="password"
            value={clientState.password}
            name="password"
            onChange={handleChange}
          />
          {errors.password.length > 2 ? (
            <p className="error">{errors.password}</p>
          ) : null}
        </label>
      </div>

      <div className="submit">
        {/* <input data-cy="submit" type="submit" /> */}
        <button>Sign up</button>
      </div>
    </form>
  );
};

export default Register;
