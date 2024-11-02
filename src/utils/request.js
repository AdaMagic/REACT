// axios的封装处理

import axios from "axios";
import { getToken } from "./token";

// 1.根域名配置
// 2.超时时间
// 3.请求拦截器   响应拦截器

const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0", // 根域名
  timeout: 5000, /// 超时时间
});

// 请求拦截器：在请求发送之前 做拦截，处理‘参数’
request.interceptors.request.use(
  function (config) {
    // 操作config，注入token数据
    // 1.获取token
    // 2.按照后端的格式要求拼接token
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器：在响应返回到客户端之前 做拦截，处理‘数据’
request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { request };
