import { useEffect } from 'react'
import {Outlet, useLocation, Navigate} from 'react-router-dom'
import NavBar from './NavBar/NavBar'
function Layout(){
    const location = useLocation()
    const path = location?.pathname || '/'
    return(
        <div className='App'>
            {(path != '/login' && path != '/register') && <NavBar/>}
            <Outlet/>
        </div>
    )
}

export default Layout