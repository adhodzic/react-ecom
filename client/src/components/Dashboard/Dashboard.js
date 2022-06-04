import { useEffect, useState } from "react";
import apiService from "../../services/userApi";
import {Nav} from 'react-bootstrap'
import './Dashboard.css'
import { Outlet,Link } from "react-router-dom";
function Dashboard() {
    return (
        <div className="Dashboard">
            <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link as={Link} to="account">Account</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="users">Users</Nav.Link>
                </Nav.Item>
            </Nav>
            <div className="Dashboard-content">
                <Outlet></Outlet>
                {/*<button onClick={() => setIsEditMode(!isEditMode)}>Edit</button>*/}
            </div>
        </div>
    );
}

export default Dashboard;
