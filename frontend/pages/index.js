import { isAuth } from "../actions/auth";
import Layout from "../components/Layout";
import Link from "next/link";

const Index = (props) => {
  return (
    <Layout isAuthenticated={props.token}>
      <h2>Index Page</h2>
      <Link href="/signup" legacyBehavior>
        <a>Sign Up</a>
      </Link>
    </Layout>
  );
};

export const getServerSideProps = (context) => {
  const auth = isAuth(context);
  if (!auth) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { token: auth }, // Pass auth data to the page as props
  };
};
export default Index;
