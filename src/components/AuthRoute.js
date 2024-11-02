// 封装高阶组件
// 逻辑：有token 正常跳转；无token  跳登录页

import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

export function AuthRoute({ children }) {      // children 正常的路由组件
    const token = getToken()
    if (token) {
        return <>{children}</>    //<></> 相当于template
    } else {
        return <Navigate to={'/login'} replace></Navigate>
    }
}