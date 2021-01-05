import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { onRegister } from './register_redux';
import { useHistory } from 'react-router-dom';
import './register.css';
import bg1 from '../../assets/sdu-bg1.jpg';
import bg2 from '../../assets/sdu-bg2.jpg';
import bg3 from '../../assets/sdu-bg3.jpg';
import bg4 from '../../assets/sdu-bg4.jpg';
import bg5 from '../../assets/sdu-bg5.jpg';
import bg6 from '../../assets/sdu-bg6.jpg';
const Register = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  let loading = useSelector((state) => state.register.loading);
  let { token } = useSelector((state) => state.user);
  useEffect(() => {
    token && history.push('/userinfo');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  let [form] = Form.useForm();
  const onSubmit = (e) => {
    console.log(e);
    dispatch(onRegister(e));
  };
  //随机选择背景图片
  let bgs = [bg1, bg2, bg3, bg4, bg5, bg6];
  let [bgIndex] = useState(Math.floor(Math.abs(Math.random() * 10 - 4)));

  return (
    <div
      className="register-body"
      style={{
        backgroundImage: `url(${bgs[bgIndex]})`,
      }}
    >
      <div className="register-page">
        <h2>用户注册</h2>
        <Form
          //   {...layout}
          className="register-form"
          form={form}
          onReset={() => form.resetFields()}
          onFinish={onSubmit}
        >
          <Form.Item
            label="用户名"
            name="userName"
            hasFeedback
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            hasFeedback
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirmPassword"
            hasFeedback
            dependencies={['password']}
            rules={[
              { required: true, message: '请再次输入密码！' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('重复密码输入不符！');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="山大邮箱"
            name="email"
            hasFeedback
            validateFirst
            rules={[
              { required: true, message: '请输入山大邮箱' },
              { type: 'email', message: '请输入有效的山大邮箱' },
              {
                pattern: 'sdu.edu.cn$',
                message: '请输入有效的山大邮箱',
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item>
            <Button
              className="register-btn"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              注册
            </Button>
            <Button
              className="register-btn"
              type="default"
              htmlType="reset"
              disabled={loading}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
