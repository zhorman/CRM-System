import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { getUsers } from '../../api/api';
import { useNavigate } from 'react-router-dom';

interface DataType {
  id: string;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: string[];
  phoneNumber: string;
}

const UsersTable = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsers();
        console.log(data);
        setUsers(data);
        console.log(users);
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleGoToProfile = (user: DataType) => {
    navigate(`/users/${user.id}`); // <<< Переход на страницу пользователя
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Cтатус блокировки',
      dataIndex: 'isBlocked',
      key: 'isBlocked',
      render: (isBlocked: boolean) =>
        isBlocked ? 'Заблокирован' : 'Не заблокирован',
    },
    {
      title: 'Роли',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <>
          {(roles || []).map((role) => {
            let color = role.length > 5 ? 'geekblue' : 'green';
            if (role === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Номер телефона',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <a onClick={()=> handleGoToProfile(record)}>Перейти к профилю {record.username}</a>
        </Space>
      ),
    },
  ];

  return <Table<DataType> rowKey="id" columns={columns} dataSource={users} />;
};

export default UsersTable;
