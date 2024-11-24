import React, { useEffect, useState } from "react";
import { isAuth, signup } from "../../actions/auth";
import Router from "next/router";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    const user = isAuth();
    if (user) {
      Router.push("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: "" });
    const user = { name, email, password };

    signup(user).then((data) => {
      // error: "error text"
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
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
                name="name"
                onChange={handleChange}
                value={name}
                type="text"
                className="form-control py-2 fs-5"
                placeholder="Full name"
              />
            </div>
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
              <button className="btn btn-primary py-2 px-4 fs-5">Signup</button>
            </div>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default SignupComponent;
