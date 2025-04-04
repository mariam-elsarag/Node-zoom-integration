import { createContext, ReactNode, useContext, useState } from "react";
import Cookies from "js-cookie";

interface userType {
  full_name: string | undefined;
  avatar: string | undefined;
}
interface AuthContextType {
  token: string | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  user: userType;
  setUser: React.Dispatch<React.SetStateAction<userType>>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));
  const [user, setUser] = useState<userType>({
    full_name: Cookies.get("full_name") || "Mariam tarek",
    avatar: Cookies.get("avatar"),
  });
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === null)
    throw new Error("AuthContext used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
