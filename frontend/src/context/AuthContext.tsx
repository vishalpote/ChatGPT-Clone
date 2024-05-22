import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helper/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean,
  user: User | null,
  login: (email: string, passwordL: string) => void,
  signup: (name: string, email: string, password: string) => void,
  logout: () => void,
};

const AuthContext = createContext<UserAuth | null>(null);



export const AuthProvider = ({children } : {children:ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    const checkStatus=async () => {
       const data=await checkAuthStatus();
       if(data){
         setUser({email:data.email,name:data.name});
      setIsloggedIn(true);
       }
    }
    checkStatus();
  }, []);

  const login = async(email: string, password: string) => {
    const data=await loginUser(email,password);
    if(data){
      setUser({email:data.email,name:data.name});
      setIsloggedIn(true);
    }
  };
  const signup = async(name: string, email: string, password: string) => {
     const data=await signupUser(name,email,password);
    if(data){
      setUser({email:data.email,name:data.name});
      setIsloggedIn(true);
    }
  };
  const logout = async() => {
      await logoutUser();
      setIsloggedIn(false); 
      setUser(null);
      window.location.reload();
  };

  let value= {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const userAuth = () => useContext(AuthContext);


