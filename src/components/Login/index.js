import React from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { app } from '../../Firebase';
import { Link, useHistory } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const history = useHistory();
  const onFinish = async values => {
    const { email, password } = values;
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`${errorMessage} code: ${errorCode}`);
    }
  };

  return (
    <Form
      name="login-form"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email', type: 'email' }]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon"/>} placeholder="Email"/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!', min: 6 }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon"/>}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to='/Register'>register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
