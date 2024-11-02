import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
// import Login from "../pages/Login";
import Login from "@/pages/Login";
import { AuthRoute } from "@/components/AuthRoute";
// import Home from "@/pages/Home";
// import Article from "@/pages/Article";
// import Publish from "@/pages/Publish";
import { lazy, Suspense } from "react";

// 打包优化-路由懒加载
// 1.lazy函数对组件导入
const Home = lazy(() => import("@/pages/Home"))
const Article = lazy(() => import("@/pages/Article"))
const Publish = lazy(() => import("@/pages/Publish"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><Layout /></AuthRoute>,   // 用封装的组件将要正常显示的组件包裹起来
    children: [
      {
        // path: 'home',
        index: true,
        element: <Suspense fallback={'加载中'}><Home /></Suspense>
      },
      {
        path: 'article',
        element: <Suspense fallback={'加载中'}><Article /></Suspense>
      },
      {
        path: 'publish',
        element: <Suspense fallback={'加载中'}><Publish /></Suspense>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
