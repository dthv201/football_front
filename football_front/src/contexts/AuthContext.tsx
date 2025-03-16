import React, {
  createContext, useContext,
  ReactNode, useCallback
} from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";

interface User {
  _id: string;
  username: string;
  email: string;
  skillLevel: string;
  profile_img: string;
}

interface AuthContextType {
  user: User | undefined;
  accessToken: string | undefined;
  isLoading: boolean;
  setAuthInfo: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);



export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useLocalStorage<string>("accessToken");

  const { data: user, isLoading  } = useQuery<User | undefined>({
    queryKey: ["userFetching"],
    queryFn: async () => {
      const response = await fetch("/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return await response.json();
    },

  });
  


  const setAuthInfo = (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => {
    setAccessToken(accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    console.log("User:", JSON.stringify(user));
    
  };

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, setAuthInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
