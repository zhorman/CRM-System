import React from 'react';
import RegisterForm from '../components/RegistrationForm/RegisterForm';
import { Typography, Row, Col} from 'antd';
import loginImg from '../assets/illustration.svg';

const { Title, Paragraph } = Typography;

function RegisterPage() {
  return (
    <Row>
      <Col span={14}>
        <img src={loginImg} width="100%" />
      </Col>
      <Col
        span={10}
        style={{
          placeContent: 'center',
          placeItems: 'center',
        }}>
        <Title level={2}>Login to your Account</Title>
        <Paragraph>See what is going on with your business</Paragraph>
        <RegisterForm />
      </Col>
    </Row>
  );
}

export default RegisterPage;
