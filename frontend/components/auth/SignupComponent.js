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
      </form>
    );
  };
  return <>{signupForm()}</>;
};

export default SignupComponent;
