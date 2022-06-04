import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import useToken from './hooks/authToken.js'
import { useEffect } from 'react';
import User from './components/User/User';
import UserList from './components/UserList/UserList'
function App() {
  const { token, setToken } = useToken()
  if(!token || token === "null"){
    return (
      <Login setToken={setToken}></Login>
    )
  }
  return (
   < Router>
    <div className="App">
        <header className="App-header">
          <h4>Navbar</h4>
        </header>
        <div className='content'>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>}>
              <Route path='account'  element={<User/>}></Route>
              <Route path='users'  element={<UserList/>}></Route>
            </Route>
          </Routes>
        </div>
      </div>
   </Router>
  );
}

export default App;
