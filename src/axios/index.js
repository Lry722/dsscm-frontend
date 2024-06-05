import axios from "axios";
import store from "@/store";
import { ElMessage } from "element-plus";

export const baseURL = "http://localhost:8081";

const service = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

service.interceptors.response.use(
  (response) => {
    if (response.data instanceof Blob) {
      return Promise.resolve(response.data);
    }

    if (response.data.code === 401) {
      ElMessage.error("未授权，请先登录");
      store.commit("logout");
      return Promise.reject(null);
    } else if (response.data.code != 200) {
      console.error(response);
      ElMessage.error(response.data.msg);
      return Promise.reject(null);
    }
    return Promise.resolve(response.data);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
