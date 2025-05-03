import { api } from './apiClient';
import { UserFilters, UserRolesRequest } from '../types/admin';
import { UserRequest } from '../types/admin';

export async function getUser() {
  try {
    const response = await api.get('/user/profile');

    console.log('Ответ сервера getUser:', response);
    return response.data;
  } catch (error) {
    console.error('Ошибка getUser:', error);
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const response = await api.get(`/admin/users/${id}`);

    console.log('Ответ сервера getUser:', response);
    return response.data;
  } catch (error) {
    console.error('Ошибка getUser:', error);
    return null;
  }
}

export async function blockUserById(id: string) {
  try {
    const response = await api.post(`/admin/users/${id}/block`);
    console.log('Ответ сервера blockUser:', response);
    return response.data;
  } catch (error) {
    console.error('Ошибка blockUser:', error);
    return null;
  }
}

export async function unblockUserById(id: string) {
  try {
    const response = await api.post(`/admin/users/${id}/unblock`);
    console.log('Ответ сервера unblockUser:', response);
    return response.data;
  } catch (error) {
    console.error('Ошибка unblockUser:', error);
    return null;
  }
}

export async function getUsers() {
  try {
    const response = await api.get('/admin/users');

    console.log('Ответ сервера getUsers:', response);
    return response.data;
  } catch (error) {
    console.error('Ошибка getUser:', error);
    return null;
  }
}
export async function getFilteredUsers(userFilters: UserFilters) {
  try {
    const response = await api.get('/admin/users', {
      params: {
        search: userFilters.search || undefined,
        sortBy: userFilters.sortBy || undefined,
        sortOrder: userFilters.sortOrder || undefined,
        isBlocked:
          userFilters.isBlocked !== undefined
            ? userFilters.isBlocked
            : undefined,
        offset: userFilters.offset || 0,
        limit: userFilters.limit || 20,
      },
    });

    console.log('Ответ сервера getUsers:', response);
    return response.data;
  } catch (error) {
    console.error('Ошибка getUser:', error);
    return null;
  }
}

export async function searchUsers(query: string) {
  try {
    const response = await api.get(`/admin/users`, {
      params: {
        search: query || undefined,
      },
    });

    console.log('Ответ сервера searchUsers:', response);
    return response.data;
  } catch (error) {
    console.error('Ошибка searchUsers:', error);
    return null;
  }
}

export async function updateUser(id: string, updatedUser: UserRequest) {
  try {
    const response = await api.put(`/admin/users/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Ошибка updateUser:', error);
    return null;
  }
}
export async function updateUserRoles(
  id: string,
  updatedUserights: UserRolesRequest
) {
  try {
    const response = await api.post(
      `/admin/users/${id}/rights`,
      updatedUserights
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка updateUser:', error);
    return null;
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка deleteUser:', error);
    return null;
  }
}
