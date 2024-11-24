import { useEffect } from "react";
import Router from "next/router";
import { getUserProfile, isAuth } from "../actions/auth";

const useAuthRedirect = () => {
  useEffect(() => {
    const getUser = async () => {
      const profile = await getUserProfile();
      if (profile.role === 0) {
        Router.push("/user");
      } else {
        Router.push("/admin");
      }
    };
    const isAuthenticated = isAuth();

    if (isAuthenticated) {
      getUser();
    }
  }, []);
};

export default useAuthRedirect;
