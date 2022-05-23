import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'

import useToken from './hooks/authToken.js'

function App() {
  const { token, setToken } = useToken()
  if(!token){
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
            <Route path='/' element={<Dashboard/>}>
            </Route>
          </Routes>
        </div>
      </div>
   </Router>
  );
}

export default App;
