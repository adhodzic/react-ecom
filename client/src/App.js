import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import useToken from './hooks/authToken.js'
import { useEffect } from 'react';
import User from './components/User/User';
import UserList from './components/UserList/UserList'
import NavBar from './components/NavBar/NavBar';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';

function App() {
  const { token, setToken } = useToken()
  return (
    <Routes>
      <Route path='/' element={<Layout></Layout>}>
        <Route path='/login' element={<Login setToken={setToken}/>}></Route>
        <Route path='/register' element={<Register setToken={setToken}/>}></Route>
        <Route element={<RequireAuth/>}>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='dashboard' element={<Dashboard/>}>
            <Route path='account'  element={<User/>}></Route>
            <Route path='users'  element={<UserList/>}></Route>
            <Route index element={<User/>}></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
