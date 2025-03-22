import {LoggedUser} from '../types/User';
import {axiosInstance} from './api-client';

const updateUser = async (userId: string, formData: FormData) => {
  const response = await axiosInstance.put<LoggedUser>(`/auth/users/${userId}`, formData);

  return response.data;
};

export { updateUser };
