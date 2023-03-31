import cookie from "js-cookie";

export const setCookie = (key, value) => {
  cookie.set(key, value, {
    expires: 1,
  });
};
export const removeCookie = (key) => {
  cookie.remove(key, {
    expires: 1,
  });
};
export const getCookie = (key) => {
  return cookie.get(key);
};
export const setLocalstorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const removeLocalstorage = (key) => {
  localStorage.removeItem(key);
};

export const authentication = (data, next) => {
  
  setCookie("token", data.token);
  setLocalstorage("user", data.user);
  next();
};
export const signout = (next) => {
  removeCookie("token");
  removeLocalstorage("user");
  next();
};
export const isAuth = () => {
  const cookieChecked = getCookie("token");
  if (cookieChecked) {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return false;
    }
  } else {
    return false;
  }
};


