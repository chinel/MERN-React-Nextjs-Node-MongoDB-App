import { getUserProfile, isAuth } from "../../actions/auth";
import Layout from "../../components/Layout";
import Private from "../../components/protectRoutes/private";

const UserDashboard = (props) => {
  return (
    <Layout isAuthenticated={props.token}>
      <Private>
        <h2>UserDashboard</h2>
      </Private>
    </Layout>
  );
};

export default UserDashboard;

export const getServerSideProps = async (context) => {
  const auth = isAuth(context);
  const user = await getUserProfile(context);

  if (!auth || !user) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  if (user.role !== 0) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: { token: auth }, // Pass auth data to the page as props
  };
};
