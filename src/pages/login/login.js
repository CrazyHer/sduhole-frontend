import { Button, Form, Input } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { onLogin } from './login_redux';
import logo from '../../assets/logo-pc.png';
import './login.css';
import bg1 from '../../assets/sdu-bg1.jpg';
import bg2 from '../../assets/sdu-bg2.jpg';
import bg3 from '../../assets/sdu-bg3.jpg';
import bg4 from '../../assets/sdu-bg4.jpg';
import bg5 from '../../assets/sdu-bg5.jpg';
import bg6 from '../../assets/sdu-bg6.jpg';

const Login = () => {
  let history = useHistory();
  const token = useSelector((state) => state.user.token);
  //若已登录，跳转至主页
  useEffect(() => {
    if (token !== '') history.push('/userinfo');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const dispatch = useDispatch();
  let loading = useSelector((state) => state.login.loading);
  const onFinish = (e) => {
    console.log(e);
    dispatch(onLogin(e));
  };
  //随机选择背景图片
  let bgs = [bg1, bg2, bg3, bg4, bg5, bg6];
  let [bgIndex] = useState(Math.floor(Math.abs(Math.random() * 10 - 4)));

  return (
    <div
      className="login-body"
      style={{
        backgroundImage: `url(${bgs[bgIndex]})`,
      }}
    >
      <div className="login-logo">
        <img src={logo} alt="logo" />
        <span />
        <h1>山大树洞</h1>
      </div>
      <div className="login-form">
        <h3>用户登录</h3>

        <Form onFinish={onFinish} initialValues={{ autoLogin: false }}>
          <Form.Item
            label="用户名/邮箱"
            name="u"
            rules={[{ required: true, message: '请输入用户名或邮箱！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="p"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="autoLogin" valuePropName="checked">
            <Checkbox style={{ float: 'right' }}>自动登录</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              className="login-btn"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              登录
            </Button>
            <br />
            <Link to="/register" className="register-link">
              注册
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
