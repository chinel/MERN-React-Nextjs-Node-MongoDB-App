import { useEffect } from "react";
import Router from "next/router";
import { getUserProfile, isAuth } from "../../actions/auth";

const Admin = ({ children }) => {
  useEffect(() => {
    const getUser = async () => {
      const profile = await getUserProfile();
      if (isAuth() && profile.role !== 1) {
        Router.push("/");
      }
    };

    if (!isAuth()) {
      Router.push("/signin");
    } else {
      getUser();
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default Admin;
