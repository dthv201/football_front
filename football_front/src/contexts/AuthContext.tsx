// import React, {
//   createContext, useContext,
//   ReactNode, useCallback
// } from "react";
// import { useLocalStorage } from "@uidotdev/usehooks";
// import { useQuery } from "@tanstack/react-query";
// import { User } from "../types/User";


// interface AuthContextType {
//   user: User | undefined;
//   accessToken: string | undefined;
//   isLoading: boolean;
//   setAuthInfo: (user: User, accessToken: string, refreshToken: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);



// const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [accessToken, setAccessToken] = useLocalStorage<string>("accessToken");

//   const { data: user, isLoading } = useQuery<User | undefined>({
//     queryKey: ["userFetching"],
//     queryFn: async () => {
//         const response = await fetch("http://localhost:3000/auth/user", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }
//         return await response.json();
//     },

//   });



//   const setAuthInfo = (
//     user: User,
//     accessToken: string,
//     refreshToken: string
//   ) => {
//     setAccessToken(accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     console.log("User:", JSON.stringify(user));

//   };

//   const logout = useCallback(() => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     // localStorage.removeItem("user");
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, accessToken, isLoading, setAuthInfo, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export { AuthProvider, useAuth }
