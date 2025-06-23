import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://your-api-url.com",
});

export const useAxiosInterceptor = () => {
  const history = useHistory();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        if (status === 502 || status === 512) {
          history.replace("/internal-server-error");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [history]);
};
