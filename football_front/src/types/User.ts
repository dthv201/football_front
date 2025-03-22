export interface User {
  _id: string;
  username: string;
  skillLevel?: string;
  email: string;
  profile_img: string;
}

export interface LoggedUser extends User {
  accessToken: string;
  refreshToken: string;
}

export interface LoginData {
  email: string;
  password: string;
}