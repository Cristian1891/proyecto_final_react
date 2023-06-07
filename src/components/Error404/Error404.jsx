import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Error404 = () => {
    const { user } = useContext(AuthContext)
  return (
    <>
        <h1>Error 404</h1>
        {
            user.logged
                ? <Link to="/">Redirijase al home haciendo click </Link>
                : <Link to="/login">Redirijase al login haciendo click </Link>
        }
    </>
  )
}
