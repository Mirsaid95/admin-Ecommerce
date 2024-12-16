import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    'Accept': 'application/json',
  }
});

export const saveToken = (token: string) => {
  Cookies.set("Token", token, { expires: 7 });
};

export const getToken = () => {
  return Cookies.get("Token");
};

export const removeToken = () => {
  Cookies.remove("Token");
};

request.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    if (!config.headers) {
      config.headers = {};
    }

    
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    config.headers['Accept'] = 'application/json';

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error('CSRF token validation failed');
    }
    return Promise.reject(error);
  }
);

export { request };
