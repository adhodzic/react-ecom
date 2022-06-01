import { useEffect, useState } from "react";
import apiService from "../../services/userApi";
import {Nav} from 'react-bootstrap'
import useDashboard from '../../hooks/fetchDashboard'
import User from "../User/User";
import './Dashboard.css'
function Dashboard() {
    const {dashboadData, isError, isLoading, getDashboard, saveDashboard} = useDashboard();

    function saveData(data){
        saveDashboard(data)
    }

    useEffect(() => {
        getDashboard()
    }, []);
    return (
        <div className="Dashboard">
            <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <br/>
            <h1>Dashboard</h1>
            {isLoading && <p>Loading...</p>}
            {dashboadData && <User className="User-data" saveData={()=>saveData} user={dashboadData}/>}
            {/*<button onClick={() => setIsEditMode(!isEditMode)}>Edit</button>*/}
        </div>
    );
}

export default Dashboard;
