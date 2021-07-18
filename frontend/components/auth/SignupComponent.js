const SignupComponent = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit");
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Type your name"
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="email"
            className="form-control"
            placeholder="Type your email"
          />
        </div>
        <div className="form-group">
          <input
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
