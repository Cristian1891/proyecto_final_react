import { useState } from "react"
import './LoginScreen.scss'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"


export const RegisterScreen = () => {

    const { register } = useContext(AuthContext)

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        register(values)
    }

  return (
    <>
        <div className="login">
            <div className="login-container">
                <h2 className="my-3">Registrarme</h2>
                <hr/>

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={values.email}
                            type="email" 
                            placeholder="Ingrese su usuario"
                            name="email"
                            onChange={handleInput}
                        />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password" 
                            value={values.password}
                            placeholder="Ingrese su contraseña"
                            name="password"
                            onChange={handleInput}
                        />
                    </div>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded my-4" type="submit">Registrarme</button>
                    <Link to="/login">
                        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">Ya estoy registrado, iniciar sesión</button>
                    </Link>
                </form>
            </div>
        </div>
    </>
  )
}
