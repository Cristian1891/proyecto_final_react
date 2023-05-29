import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { Navigate } from 'react-router-dom'
import { collection, getDoc, addDoc, getDocs, writeBatch, query, where, documentId, doc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


const schema = Yup.object().shape({
    nombre: Yup.string()
                .required("Este campo es requerido")
                .min(3, "El nombre es muy corto")
                .max(20, "El nombre es demasiado largo"),
    direccion: Yup.string()
                .required("Este campo es requerido")
                .min(6, "La direccion es muy corta")
                .max(20, "La direccion es demasiado larga"),
    email: Yup.string()
                .email("El email no es válido")
                .required("Este campo es requerido")
})

export const Checkout = () => {

    const { cart, totalCompra, emptyCart } = useContext(CartContext)

    const [orderId, setOrderId] = useState(null)

    const generarOrden = async (values) => {
        
        const orden = {
            client: values,
            items: cart.map(item => ({id: item.id, nombre: item.nombre, cantidad: item.cantidad})),
            total: totalCompra(),
            fyh: new Date()
        }

        const batch = writeBatch(db)
        const productosRef = collection(db, "productos")
        const ordersRef = collection(db, "orders")

        const promesas = cart.map((item) => {
            const ref = doc(productosRef, item.id)
            return getDoc(ref)
        })

        const productos = await Promise.all(promesas)

        // const q = query(productosRef, where( documentId(), "in", cart.map(item => item.id) ))
        // const productos = await getDocs(q)

        const outOfStock = []


        productos.forEach((doc) => {
            const item = cart.find((i) => i.id === doc.id)
            const stock = doc.data().stock
            
            if (stock >= item.cantidad) {
                batch.update(doc.ref, {
                    stock: stock - item.cantidad
                })
            } else {
                outOfStock.push(item)
            }
        })

        if (outOfStock.length === 0) {
            addDoc(ordersRef, orden)
                .then((doc) => {
                        batch.commit()
                        setOrderId(doc.id)
                        emptyCart()
                    })
        } else {
            console.log(outOfStock)
            alert("Hay items sin stock")
        }
        
    }

    if (orderId) {
        return (
            <div className="flex justify-center items-center flex-col pt-24">
                <h2>Tu compra se registró exitosamente!</h2>
                <hr/>
                <p>Guardá tu número de orden: {orderId}</p>

                <Link to="/">
                    <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded my-5'>Volver</button>
                </Link>
            </div>
        )
    }

    if (cart.length === 0) {
        return <Navigate to="/" />
    }


  return (
    <>
        <h2 className="text-center py-24">Checkout</h2>

        <div className="flex justify-center items-center flex-wrap">
            <Formik
                initialValues={{
                    nombre: '',
                    direccion: '',
                    email: ''
                }}
                validationSchema={schema}
                onSubmit={generarOrden}
            >
                {() => (
                    <Form className="w-full max-w-lg">
                        <div className="flex justify-items-center items-center flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    Nombre
                                </label>
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="nombre"
                                    type="text"
                                    placeholder="Tu nombre"
                                />
                                <ErrorMessage name="nombre" component={"p"}/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    Direccion
                                </label>
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="direccion"
                                    type="text"
                                    placeholder="Tu direccion"
                                />
                                <ErrorMessage name="direccion" component={"p"}/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    Email
                                </label>
                                <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="email"
                                    type="email"
                                    placeholder="Tu email"
                                />
                                <ErrorMessage name="direccion" component={"p"}/>
                            </div>
                        </div>

                        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" type="submit">Enviar</button>
                    </Form>
                )}
            </Formik>

        </div>
    </>
  )
}
