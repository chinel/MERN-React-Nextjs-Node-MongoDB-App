import React, { useState } from "react";
import { signin } from "../../actions/auth";
import Router from "next/router";
const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: "" });
    const user = { email, password };

    signin(user).then((data) => {
      // error: "error text"
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //save user token to cookie
        //save user info to localstorage
        Router.push("/");
      }
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const showAlert = () => {
    if (loading) return <div className="alert alert-info">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (message) return <div className="alert alert-info">{message}</div>;
    return null;
  };

  return (
    <React.Fragment>
      {showAlert()}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-4">
            <div className="form-group">
              <input
                name="email"
                value={email}
                onChange={handleChange}
                type="email"
                className="form-control py-2 fs-5"
                placeholder="Email address"
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                value={password}
                onChange={handleChange}
                type="password"
                className="form-control py-2 fs-5"
                placeholder="Password"
              />
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary py-2 px-4 fs-5">Signin</button>
            </div>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default SigninComponent;
