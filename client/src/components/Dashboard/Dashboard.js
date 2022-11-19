import {Nav} from 'react-bootstrap'
import './Dashboard.css'
import { Outlet,Link, Navigate, useLocation} from "react-router-dom";
function Dashboard() {
    const location = useLocation()
    const path = location.pathname
    const user = JSON.parse(localStorage.getItem('User'))
    return (
        <div className="Dashboard">
            <Nav fill variant="tabs" defaultActiveKey="/account">
                <Nav.Item>
                    <Nav.Link as={Link} to="account" className={path == '/dashboard/account'?'isActive':''}>Account</Nav.Link>
                </Nav.Item>
                {user?.Role == 'Admin' && <Nav.Item>
                    <Nav.Link as={Link} to="users" className={path == '/dashboard/users'?'isActive':''}>Users</Nav.Link>
                </Nav.Item>}
                {user?.Role == 'Admin' && <Nav.Item>
                    <Nav.Link as={Link} to="item-group" className={path == '/dashboard/item-group'?'isActive':''}>Item Group</Nav.Link>
                </Nav.Item>}
            </Nav>
            <div className="Dashboard-content">
                {path == '/dashboard' && <Navigate to='/dashboard/account' replace></Navigate>}
                <Outlet></Outlet>
                {/*<button onClick={() => setIsEditMode(!isEditMode)}>Edit</button>*/}
            </div>
        </div>
    );
}

export default Dashboard;
