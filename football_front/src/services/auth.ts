import { CredentialResponse } from "@react-oauth/google";
export interface IUser {
    username: string;
    email: string;
    password?: string;
    skillLevel: string;
    img?: FileList;
    accessToken?: string;
    refreshToken?: string;
  }

export const registerUser = async (data: IUser, file?: File) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    if (data.password) {
      formData.append("password", data.password);
    }
    formData.append("skillLevel", data.skillLevel);
    if (file) {
      formData.append("profile_img", file);
    }
  
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      return { success: response.ok, data: result };
    } catch (error) {
      console.error("Error submitting form:", error);
      return { success: false, error: "Something went wrong. Please try again." };
    }
  };

  export const googleSignin = async (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (!credential) {
      throw new Error("No credential found in Google response");
    }
  
    try {
      const response = await fetch("/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Google signin error:", error);
      throw error;
    }
  };


  export const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token found");
  
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
  
      if (!response.ok) {
        throw new Error("Logout failed");
      }
  
      localStorage.removeItem("refreshToken"); 
      return await response.json();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  