import React from 'react';
import { Typography, Row, Col } from 'antd';
import authImg from '../assets/authimg.png';
import { Outlet } from 'react-router';
import { useMatch } from 'react-router-dom';

const { Title, Paragraph } = Typography;

function AuthLayout() {
  const isRegister = useMatch('/register');
  const title = isRegister ? 'Register your Account' : 'Login to your Account';

  return (
    <Row style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Col span={14}>
        <img src={authImg} width="100%" />
      </Col>
      <Col
        span={10}
        style={{
          placeContent: 'center',
          placeItems: 'center',
        }}>
        <Title level={2}>{title}</Title>
        <Paragraph>See what is going on with your business</Paragraph>
        <Outlet />
      </Col>
    </Row>
  );
}

export default AuthLayout;
