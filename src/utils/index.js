// 统一中转工具模块函数
// 别的组件使用时  import request from '@/utils'
import { request } from "./request";
import { getToken, setToken, removeToken } from "./token";

export { request, getToken, setToken, removeToken };
