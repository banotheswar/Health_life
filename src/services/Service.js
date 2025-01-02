import axios from "axios";
import "./service.css"
import { Base_Url } from "./Urls";


let load = 0
const instance = axios.create({
  baseURL :Base_Url
 
});
instance.interceptors.request.use(
  
  (config) => {
        load++
        document.body.classList.add("loading-indicator");
        const token = sessionStorage.getItem("token");
        let t1 = "Bearer " + token
        if (token) {
          config.headers["Authorization"] = t1;
          config.headers.Accept = 'application/json';
          config.headers['Access-Control-Allow-Origin'] = "*"
        }
       
        return config;
      },
      (error) => {
        load--
        if (load == 0) {
          document.body.classList.remove("loading-indicator");
        }
        return Promise.reject(error);
      }
);
//Add a response interceptor
instance.interceptors.response.use(
 
  (response) => {
        load--
        if (load == 0) {
          document.body.classList.remove("loading-indicator");
        }
        return response;
      },
      (error) => {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
      }
);

export const get = async (url, params = "") => {
  return await instance.get(`${url}${params}`);
};
  
export const post = async (url, data = {}) => {
  try {
    return await instance.post(`${url}`, data);
  } catch (e) {
    return e;
  }
};
export default instance;




