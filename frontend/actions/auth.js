import fetch from "isomorphic-fetch";
import { API } from "../config";
// import cookie from "js-cookie";
import { parseCookies, setCookie, destroyCookie } from "nookies";

//process.browser is deprecated for check if is client. An alternative below
const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined";

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//set Cookie
export const saveCookie = (key, value) => {
  setCookie(null, key, value, { path: "/" });

  // if (isBrowser) {
  //   cookie.set(key, value, {
  //     expires: 1, // 1 day
  //   });
  // }
};

//remove Cookie
export const removeCookie = (key) => {
  destroyCookie(null, key, { path: "/" });
  // if (isBrowser) {
  //   cookie.remove(key);
  // }
};

//get Cookie
export const getCookie = (key) => {
  destroyCookie(null, key, { path: "/" });

  // if (isBrowser) {
  //   return cookie.get(key);
  // }
};

//local Storage
export const setLocalStorage = (key, value) => {
  if (isBrowser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (isBrowser) {
    localStorage.removeItem(key);
  }
};

export const getLocalStorage = (key) => {
  if (isBrowser) {
    return localStorage.getItem(key);
  }
};

export const isAuth = (ctx = null) => {
  // if (isBrowser) {
  //   const cookieChecked = getCookie("token");
  //   if (cookieChecked) {
  //     const user = getLocalStorage("user");
  //     if (user) {
  //       return JSON.parse(user);
  //     } else {
  //       return false;
  //     }
  //   }
  // }
  // return false;

  const cookies = parseCookies(ctx); // Gets cookies on client (if ctx is null) or server
  const token = cookies.token;

  return token || false;
};

//authenticate user by passing data to cookie & localstorage
/**
 *
 * @param {*} data
 * @param {*} next // callback function
 */
export const authenticate = (data, next) => {
  const { token, user } = data;
  saveCookie("token", token);
  // setLocalStorage("user", user);
  next();
};

/**
 *
 * @param {*} next //callback function
 */
export const signOut = (next) => {
  removeCookie("token");
  // removeLocalStorage("user");
  next();

  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((response) => {
      console.log("signout success");
    })
    .catch((err) => console.log(err));
};
