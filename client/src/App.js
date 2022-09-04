import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import { useState, createContext } from 'react';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import useToken from './hooks/authToken.js'
import User from './components/User/User';
import UserList from './components/UserList/UserList'
import ItemLayout from './components/Item/ItemLayout'
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import ItemDetails from './components/Item/ItemDetails'
import Cart from './components/Cart/Cart';

const cartContext = createContext()


function App() {
  const { token, setToken } = useToken()
  const [cartItems, setCartItems] = useState([])
  return (
    <cartContext.Provider value={{cartItems, setCartItems}}>
    <Routes>
      <Route path='/' element={<Layout></Layout>}>
        <Route path='/login' element={<Login setToken={setToken}/>}></Route>
        <Route path='/register' element={<Register setToken={setToken}/>}></Route>
        <Route element={<RequireAuth/>}>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='item-details/:id' element={<ItemDetails/>}></Route>
          <Route path='cart' element={<Cart/>}></Route>
          <Route path='dashboard' element={<Dashboard/>}>
            <Route path='account'  element={<User/>}></Route>
            <Route path='users'  element={<UserList/>}></Route>
            <Route path='item-group'  element={<ItemLayout/>}></Route>
            <Route index element={<User/>}></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
    </cartContext.Provider>
  );
}
export {cartContext}
export default App;
