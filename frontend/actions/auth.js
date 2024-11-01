import fetch from "isomorphic-fetch";
import { API } from "../config";
import cookie from "js-cookie";

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
export const setCookie = (key, value) => {
  if (isBrowser) {
    cookie.set(key, value, {
      expires: 1, // 1 day
    });
  }
};

//remove Cookie
export const removeCookie = (key) => {
  if (isBrowser) {
    cookie.remove(key);
  }
};

//get Cookie
export const getCookie = (key) => {
  if (isBrowser) {
    return cookie.get(key);
  }
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

export const isAuth = () => {
  if (isBrowser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      const user = getLocalStorage("user");
      if (user) {
        return JSON.parse(user);
      } else {
        return false;
      }
    }
  }
};

//authenticate user by passing data to cookie & localstorage
/**
 *
 * @param {*} data
 * @param {*} next // callback function
 */
export const authenticate = (data, next) => {
  const { token, user } = data;
  setCookie("token", token);
  setLocalStorage("user", user);
  next();
};

/**
 *
 * @param {*} next //callback function
 */
export const signOut = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((response) => {
      console.log("signout success");
    })
    .catch((err) => console.log(err));
};
