import Layout from "../components/Layout";
import Link from "next/link";
import SignupComponent from "../components/auth/SignupComponent";

const Signup = () => {
  return (
    <Layout>
      <h2>Sign up Page</h2>
      <SignupComponent />
    </Layout>
  );
};

export default Signup;
