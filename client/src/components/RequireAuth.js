import useToken from '../hooks/authToken'
import {useLocation, Navigate, Outlet} from 'react-router-dom'
function RequireAuth(){
    const {token} = useToken()
    const location = useLocation()
    return(
        token?<Outlet/> : <Navigate to='/login' state={{location}} replace />
    )
}

export default RequireAuth