import { useEffect } from "react";
import Router from "next/router";
import { getUserProfile, isAuth, signOut } from "../actions/auth";

const useAuthRedirect = () => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const profile = await getUserProfile();

        if (profile.role === 0) {
          Router.push("/user");
        } else if (profile.role === 1) {
          Router.push("/admin");
        }
      } catch (error) {
        signOut(() => Router.push("/signin"));
        console.log(error);
      }
    };
    const isAuthenticated = isAuth();

    if (isAuthenticated) {
      getUser();
    }
  }, []);
};

export default useAuthRedirect;
