import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom"
import { ItemListContainer } from "../components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from '../components/ItemDetailContainer/ItemDetailContainer';
import { Cart } from '../components/Cart/Cart';
import { LoginScreen } from '../components/LoginScreen/LoginScreen';
import { RegisterScreen } from '../components/LoginScreen/RegisterScreen';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Checkout } from "../components/Checkout/Checkout";
import { NavBar } from "../components/NavBar/NavBar"
import { Footer } from "../components/Footer/Footer"
import { Error404 } from "../components/Error404/Error404";


export const AppRouter = () => {

    const { user } = useContext(AuthContext)

  return ( 
    <>
        
        {/* <BrowserRouter> */}
        <HashRouter>
        { 
            user.logged
            ? <>
                <NavBar/>
                <Routes>
                    {/* rutas privadas */}
                    <Route path='/' element={ <ItemListContainer/> }/>
                    <Route path='/category/:categoryId' element={ <ItemListContainer />}/>
                    <Route path='/item/:itemId' element={ <ItemDetailContainer/> }/>
                    <Route path='*' element={<Error404/>} />
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/checkout' element={ <Checkout/> }/>
                </Routes>
                <Footer/>
              </>
              : <Routes>
                    {/* rutas públicas */}
                    <Route path='/login' element={<LoginScreen/>}/>
                    <Route path='/register' element={<RegisterScreen/>}/>
                    <Route path='*' element={<Error404/>}/>
                </Routes>
        }
        
        </HashRouter>
        {/* </BrowserRouter> */}
    </>
  )
}
