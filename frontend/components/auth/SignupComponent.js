import { useState } from "react";
import { signup } from "../../actions/auth";
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

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="name"
            onChange={handleChange}
            value={name}
            type="text"
            className="form-control"
            placeholder="Type your name"
          />
        </div>
        <div className="form-group">
          <input
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            className="form-control"
            placeholder="Type your email"
          />
        </div>
        <div className="form-group">
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            className="form-control"
            placeholder="Type your password"
          />
        </div>
        <div>
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    );
  };
  return <>{signupForm()}</>;
};

export default SignupComponent;
