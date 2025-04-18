import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../../store/authThunk';
import { useAppDispatch } from '../../store/hooks';
import type { FormProps } from 'antd';
import {
  Typography,
  Flex,
  Button,
  Checkbox,
  Form,
  Input,
  notification,
} from 'antd';

const { Text } = Typography;

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: FormProps['onFinish'] = async (values) => {
    try {
      console.log(values);
      await dispatch(signin(values)).unwrap();
      navigate('/todolist');
    } catch (error: any) {
      notification.error({ message: 'Ошибка логина: ' + error.message });
      console.log('Ошибка входа:', error);
    }
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="signinForm"
      layout="vertical"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
      requiredMark={false}>
      <Form.Item
        name="login"
        label="Login"
        rules={[{ required: true, message: 'Please input your Login!' }]}>
        <Input placeholder="mail@abv.com" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input type="password" placeholder="***********" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          style={{ marginBottom: '20px' }}>
          Log in
        </Button>
        <Text>
          Not Register Yet? <Link to="/register">Create an account</Link>
        </Text>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
