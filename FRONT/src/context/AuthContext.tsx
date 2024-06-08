import React,{ useState, useEffect,  createContext, useContext } from 'react';
import { loginUser, checkAuthStatus, logoutUser, signupUser } from './../helpers/api-communicator';import Signup from './../pages/Signup';

type User = {
    name: string;
    email: string;
    role:string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null; // Add token to UserAuth
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string,role:string, email: string, password: string) => Promise<void>;
    logout: ()=> Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: {children: ReactNode})=>{

    const [user, setuser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null); // State to hold token
     const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        // Fetch if the user's cookies are valid then skip login
        async function checkStatus() {
            const data = await checkAuthStatus();
            if(data){
                setuser({email: data.email, name: data.name, role: data.role});
                setIsLoggedIn(true);
                setToken(data); // Set token from data
                setIsAdmin(data.isAdmin);
            }
        }
        checkStatus();
    }, []);

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        console.log("login data:",data);
        if(data){
            setuser({email: data.email, name: data.name , role: data.role});
            setIsLoggedIn(true);
            setToken(data);
            setIsAdmin(data.isAdmin);
           //window.location.href = "/";
        }
    }
    const signup = async (name: string, email: string, password: string,role:string) => {
        const data = await signupUser(name, email, password);
        if(data){
            setuser({name: data.name, email: data.email, role:data.role});

        }
    }
    const logout = async () => {
        await logoutUser();
        setIsLoggedIn(false);
        setuser(null);
        setToken(null); // Clear token on logout
     window.location.href = "/login";
    }

    //useEffect(() => {
    //if (isLoggedIn) {
      //  window.location.href = "/login";
  //  }
//}, [isLog]);


    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
         token,
         isAdmin,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);
