// 封装token相关方法
const TOKEN_KEY = "token_key";

// 获取token
const getToken = () => localStorage.getItem(TOKEN_KEY);
// 存储token
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
// 清除token
const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export { getToken, setToken, removeToken };
