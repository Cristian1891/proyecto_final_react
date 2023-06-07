import { createContext, useEffect, useState } from "react";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const history = useNavigate();

    const [user, setUser] = useState({
        email: null,
        logged: false
    })

    const login = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then(() => {
                // Redirecciona a la ruta deseada después de la autenticación exitosa
                navigate('/');
            })
            .catch(e => console.log(e))

    }

    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
            })
    }

    const register = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .catch(e => console.log(e))
    }  

    const logout = () => {
        signOut(auth)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {

            if (user) {
                setUser({
                    email: user.email,
                    logged: true
                })
            } else {
                setUser({
                    email: null,
                    logged: false
                })
            }
        })
    }, [])

  return (
    <>
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            loginWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    </>
  )
}
