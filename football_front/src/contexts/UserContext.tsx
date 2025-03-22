import Cookies from 'js-cookie';
import {Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import { LoggedUser } from "../types/User";

interface UserContextType {
  user: LoggedUser | null;
  setUser: Dispatch<SetStateAction<LoggedUser | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const navigate = useNavigate();
  const accessToken = Cookies.get('access_token');

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        const response = await fetch("http://localhost:3000/auth/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
         const userData = await response.json();
        setUser(userData);

        if (location.pathname === '/') {
          navigate('/profile');
        }
      }
    };

    fetchUserData();
  }, [accessToken, navigate]);

  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export {UserProvider, useUserContext};
