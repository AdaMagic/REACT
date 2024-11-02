// 用户 相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken as _setToken, removeToken } from "@/utils";
import { loginAPI, getProfileAPI } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  //初始化数据状态
  initialState: {
    // token: localStorage.getItem("token_key") || "",
    token: getToken() || "",
    userInfo: {}
  },

  //同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // token持久化  localStorage存一份token
      //   localStorage.setItem("token_key", action.payload);
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    // 退出清除用户信息
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  },
});

// 结构actionCreater方法
const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

// 获取reducer
const useReducer = userStore.reducer;
// 异步方法 完成登录获取token
// loginFrom  获取表单数据
const fetchLogin = (loginFrom) => {
  return async (dispatch) => {
    // 1.发送异步请求
    // const res = await request.post("/authorizations", loginFrom);   
    const res = await loginAPI(loginFrom)    // api封装
    // 2.提交同步action进行token的存入   (存入到初始数据token那里)
    dispatch(setToken(res.data.data.token))
  };
};

// 获取个人用户信息 异步方法
const fetchUserInfo = () => {
  return async (dispatch) => {
    // const res = await request.get("/user/profile");
    const res = await getProfileAPI();
    dispatch(setUserInfo(res.data));
  };
};
// 以按需导出的方式导出actionCreater
export { fetchLogin, setToken, fetchUserInfo, clearUserInfo };
// 以默认导出的方式导出reducer
export default useReducer;
