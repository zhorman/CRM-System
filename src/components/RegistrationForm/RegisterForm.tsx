import type { FormProps } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useAppDispatch } from '../../store/hooks';
import { signup } from '../../store/authThunk';
import {
  MIN_LOGIN_LENGTH,
  MAX_LOGIN_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from '../../utils/constants';

import { Typography, Button, Form, Input, notification } from 'antd';
import { PHONE_REGEX } from '../../utils/constants';

const { Paragraph } = Typography;

function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      console.log(values);
      await dispatch(signup(values)).unwrap();
      notification.success({
        message: 'Регистрация успешна!',
        description: (
          <div>
            Аккаунт создан. Перейдите на страницу входа.
            <div style={{ marginTop: 8 }}>
              <Button
                type="primary"
                onClick={() => {
                  navigate('/login');
                }}>
                Перейти к входу
              </Button>
            </div>
          </div>
        ),
        duration: 5,
      });
    } catch (error: any) {
      notification.error({ message: 'Ошибка регистрации: ' + error.message });
      console.log('Ошибка регистрации:', error);
    }
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="register"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ minWidth: 300 }}
      scrollToFirstError>
      <Form.Item
        name="username"
        label="Имя пользователя"
        rules={[
          {
            required: true,
            message: 'Введите имя пользователя!',
            whitespace: true,
          },
          {
            min: MIN_USERNAME_LENGTH,
            message: `Минимальная длина — ${MIN_USERNAME_LENGTH} символа`,
            transform: (value) => value.trim(),
          },
          {
            max: MAX_USERNAME_LENGTH,
            message: `Максимальная длина — ${MAX_USERNAME_LENGTH} символов`,
            transform: (value) => value.trim(),
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="login"
        label="Логин"
        rules={[
          {
            required: true,
            message: 'Ведите логин!',
            whitespace: true,
          },
          {
            min: MIN_LOGIN_LENGTH,
            message: `Минимальная длина — ${MIN_LOGIN_LENGTH} символа`,
            transform: (value) => value.trim(),
          },
          {
            max: MAX_LOGIN_LENGTH,
            message: `Максимальная длина — ${MAX_LOGIN_LENGTH} символов`,
            transform: (value) => value.trim(),
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: 'Введите пароль!',
          },
          {
            min: MIN_PASSWORD_LENGTH,
            message: `Минимальная длина — ${MIN_PASSWORD_LENGTH} символа`,
            transform: (value) => value.trim(),
          },
          {
            max: MAX_PASSWORD_LENGTH,
            message: `Максимальная длина — ${MAX_PASSWORD_LENGTH} символов`,
            transform: (value) => value.trim(),
          },
        ]}
        hasFeedback>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Повторите пароль"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Повторите пароль',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="email"
        label="Почтовый адрес"
        rules={[
          {
            type: 'email',
            message: 'Некорректный E-mail!',
          },
          {
            required: true,
            message: 'Введите ваш E-mail!',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Телефон"
        rules={[
          { message: 'Введите номер телефона!' },
          {
            pattern: PHONE_REGEX,
            message: 'Номер в формате +79991234567',
          },
        ]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
      <Paragraph>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </Paragraph>
    </Form>
  );
}

export default RegisterForm;
