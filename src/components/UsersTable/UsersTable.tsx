import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../utils/useDebounce';
import { useAppSelector } from '../../store/hooks';
import { Roles, UserFilters } from '../../types/admin';
import {
  getUsers,
  deleteUser,
  blockUserById,
  unblockUserById,
  updateUserRoles,
} from '../../api/usersApi';
import {
  Table,
  Tag,
  Button,
  Flex,
  Popconfirm,
  Input,
  Select,
  Space,
  Modal,
  notification,
} from 'antd';
import type { TableProps } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Search } = Input;

interface DataType {
  id: string;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
}

const ROLE_COLORS = {
  ADMIN: 'red',
  MODERATOR: 'orange',
  USER: 'green',
};

const UsersTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<DataType[]>([]);
  const user = useAppSelector((state) => state.user.userData);
  const [searchText, setSearchText] = useState('');
  const debouncedValue = useDebounce(searchText);
  const [sortAndFilters, setSortAndFilters] = useState<UserFilters>({});
  const [totalUsersAmount, setTotalUsersAmount] = useState<number>(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
    showSizeChanger: false,
  });
  const [editingUserId, setEditingUserId] = useState<string>('');
  const [editingRoles, setEditingRoles] = useState<Roles[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const isAdmin = user && user.roles.includes(Roles.ADMIN);

  const roleOptions = [Roles.ADMIN, Roles.MODERATOR, Roles.USER];

  const fetchUsers = async () => {
    try {
      const { data, meta } = await getUsers({ search: debouncedValue });
      setUsers(data);
      setTotalUsersAmount(meta.totalAmount);
      setPagination({
        ...pagination,
        total: meta.totalAmount,
      });
      console.log(meta.totalAmount);
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
      notification.error({
        message: 'Не удалось загрузить пользователей',
        description: (error as any).message || 'Неизвестная ошибка',
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedValue]);

  const handleGoToProfile = (user: DataType) => {
    navigate(`/users/${user.id}`);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      notification.error({
        message: 'Не удалось удалить пользователя',
        description: (error as any).message || 'Неизвестная ошибка',
      });
    }
  };

  const handleTableChange = async (
    newPagination: any,
    filters: any,
    sorter: any
  ) => {
    console.log(newPagination, filters, sorter);

    const newSortFilters = {
      sortBy: sorter.field,
      sortOrder: (sorter.order === 'ascend'
        ? 'asc'
        : sorter.order === 'descend'
        ? 'desc'
        : undefined) as 'asc' | 'desc' | undefined,
      search: searchText || undefined,
      isBlocked:
        filters.isBlocked?.[0] === 'all'
          ? undefined
          : filters.isBlocked?.[0] === true
          ? true
          : false,
      limit: newPagination.pageSize,
      offset: newPagination.current - 1,
    };

    const { data, meta } = await getUsers(newSortFilters);
    setSortAndFilters(newSortFilters);
    setUsers(data);
    setPagination(newPagination);
    setTotalUsersAmount(meta.totalAmount);
  };

  const handleSearch = async () => {
    fetchUsers();
  };

  const handleBlockUser = async (userId: string) => {
    try {
      await blockUserById(userId);
      const { data } = await getUsers(sortAndFilters);
      setUsers(data);
    } catch (error: any) {
      notification.error({
        message: 'Не удалось заблокировать пользователя',
        description: error.message || 'Неизвестная ошибка',
      });
    }
  };

  const handleUnblockUser = async (userId: string) => {
    try {
      await unblockUserById(userId);
      const { data } = await getUsers(sortAndFilters);
      setUsers(data);
    } catch (error: any) {
      notification.error({
        message: 'Не удалось разблокировать пользователя',
        description: error.message || 'Неизвестная ошибка',
      });
    }
  };

  const startEdit = (record: DataType) => {
    console.log(record, 'record');
    setEditingUserId(record.id);
    setEditingRoles(record.roles);
  };

  const saveEdit = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    setEditingUserId('');
    setEditingRoles([]);
    setModalVisible(false);
    updateUserRoles(editingUserId, {
      roles: editingRoles,
    });
    fetchUsers();
  };

  const handleModalCancel = () => {
    setEditingUserId('');
    setEditingRoles([]);
    setModalVisible(false);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) =>
        new Date(date).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
    },
    {
      title: 'Cтатус пользователя',
      dataIndex: 'isBlocked',
      key: 'isBlocked',
      render: (isBlocked: boolean) => (isBlocked ? 'Заблокирован' : 'Активен'),
      filters: isAdmin
        ? [
            {
              text: 'Все пользователи',
              value: 'all',
            },
            {
              text: 'Заблокирован',
              value: true,
            },
            {
              text: 'Активен',
              value: false,
            },
          ]
        : undefined,
      filterMultiple: false,
      defaultFilteredValue: ['all'],
      filterResetToDefaultFilteredValue: true,
    },
    {
      title: 'Роли',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <>
          {(roles || []).map((role) => {
            const color = ROLE_COLORS[role] || 'default';
            return (
              <Tag color={color} key={role}>
                {role}
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
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Flex wrap gap="small">
          <Button
            block
            size="small"
            type="default"
            color="primary"
            onClick={() => handleGoToProfile(record)}>
            Профиль <b>{record.username}</b>
          </Button>

          {record.isBlocked ? (
            <Popconfirm
              title="Разблокировка пользователя"
              description="Действительно хотите разблокировать пользователя?"
              onConfirm={() => handleUnblockUser(record.id)}
              okText="Да"
              cancelText="Нет">
              <Button color="red" variant="dashed" size="small">
                Разблокировать
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Блокировка пользователя"
              description="Действительно хотите заблокировать пользователя?"
              onConfirm={() => handleBlockUser(record.id)}
              okText="Да"
              cancelText="Нет">
              <Button danger size="small">
                Блокировать
              </Button>
            </Popconfirm>
          )}
          <Popconfirm
            title="Удаление пользователя"
            description="Действительно хотите удалить пользователя?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Да"
            cancelText="Нет">
            <Button type="primary" danger size="small">
              Удалить
            </Button>
          </Popconfirm>
          {isAdmin &&
            (editingUserId === record.id ? (
              <Flex vertical gap="small">
                <Select
                  mode="multiple"
                  value={editingRoles}
                  onChange={setEditingRoles}
                  style={{ minWidth: '150px' }}
                  showSearch={false}
                  size="small"
                  options={(roleOptions || []).map((role) => ({
                    label: role,
                    value: role,
                  }))}
                  placeholder="Выберите роли"
                />
                <Space>
                  <Button
                    color="green"
                    variant="outlined"
                    onClick={saveEdit}
                    icon={<CheckOutlined />}
                  />
                  <Button
                    danger
                    onClick={handleModalCancel}
                    icon={<CloseOutlined />}
                  />
                </Space>
              </Flex>
            ) : (
              <Button
                color="primary"
                variant="outlined"
                size="small"
                onClick={() => startEdit(record)}>
                Изменить роли
              </Button>
            ))}
        </Flex>
      ),
    },
  ];

  const tablePagination =
    totalUsersAmount <= 20 ? false : { ...pagination, total: totalUsersAmount };

  return (
    <>
      <Search
        placeholder="Поиск по имени или email"
        onSearch={handleSearch}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, maxWidth: 400 }}
        allowClear
      />
      <Table<DataType>
        rowKey="id"
        columns={columns}
        pagination={tablePagination}
        dataSource={users}
        onChange={handleTableChange}
      />
      <Modal
        title="Подтвердите изменения ролей"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Подтвердить"
        cancelText="Отмена">
        <p>Вы уверены, что хотите сохранить эти роли?</p>
        <div>
          {(editingRoles || []).map((role) => (
            <Tag key={role}>{role}</Tag>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default UsersTable;
