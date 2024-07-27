import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used with an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        setLoading(true);
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setisAuthenticated(true);
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    const signin = async (user) => {
        setLoading(true);
        try {
            const res = await loginRequest(user);
            setisAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data.message]);
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setisAuthenticated(false);
        setUser(null);
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setisAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setisAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setisAuthenticated(true);
                setUser(res.data);
            } catch (error) {
                console.log(error);
                setisAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            signup,
            signin,
            logout,
            isAuthenticated,
            errors,
            loading,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
