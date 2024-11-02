import './index.scss'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/modules/user';
import { Button, Card, Form, Input, message } from "antd";
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //onFinish 收集表单填写的数据
  const onFinish = async (values) => {
    console.log('Success:', values);
    // 触发异步action fetchLogin
    await dispatch(fetchLogin(values))
    navigate('/')
    message.success('登录成功')

  };

  return (
    <div className="login">
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt='logo'></img>
        {/* 增加失焦时校验 */}
        <Form validateTrigger='onBlur' onFinish={onFinish}>
          {/* 多条校验：先校验第一条，第一条通过再校验第二条 */}
          <Form.Item name='mobile' rules={[{ required: true, message: '请输入手机号' }, { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}>
            <Input placeholder='请输入手机号'></Input>
          </Form.Item>
          <Form.Item name='code' rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder='请输入密码'></Input.Password>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType="submit" block >登录</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
};
export default Login;
