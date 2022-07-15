import {Nav} from 'react-bootstrap'
import './Dashboard.css'
import { Outlet,Link, Navigate, useLocation} from "react-router-dom";
function Dashboard() {
    const location = useLocation()
    const path = location.pathname
    const user = JSON.parse(localStorage.getItem('User'))
    return (
        <div className="Dashboard">
            <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link as={Link} to="account">Account</Nav.Link>
                </Nav.Item>
                {user?.Role == 'Admin' && <Nav.Item>
                    <Nav.Link as={Link} to="users">Users</Nav.Link>
                </Nav.Item>}
                {user?.Role == 'Admin' && <Nav.Item>
                    <Nav.Link as={Link} to="item-group">Item Group</Nav.Link>
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
