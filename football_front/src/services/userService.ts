import apiClient from './api-client';
import User from '../types/User'

const getUserById = async (userId: string) => {
  const response = await apiClient.get<User>(`/user/${userId}`);

  return response.data;
};

// const updateUserProfilePicture = async (imageUrl: string) => {
//   const response = await axiosInstance.put<LoggedUser>(`/${ServerRoutes.USERS}/profile-picture`, {imageUrl});

//   return response.data;
// };

// const updateUserName = async (userName: string) => {
//   const response = await axiosInstance.put<LoggedUser>(`/${ServerRoutes.USERS}/username`, {userName});

//   return response.data;
// };

export { getUserById };
