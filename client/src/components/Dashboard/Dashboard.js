import { useEffect, useState } from "react";
import apiService from "../../services/userApi";
import {Nav} from 'react-bootstrap'
function renderUserData(userData) {
    return Object.keys(userData).map((obj, i) => {
        console.log(userData[obj]);
        return <div key={i}>{userData[obj]}</div>;
    });
}

function renderUserDataEdit(userData, setUserData){
  return Object.keys(userData).map((obj, i) => {
    console.log(userData[obj]);
    return <input key={i} value={userData[obj]} onChange={(e)=>}/>
});
}

function editMode(userData, setUserData, isEditMode) {
    if (isEditMode) {
        return (
            <div>
                We are in edit more
                {renderUserDataEdit(userData, setUserData)}
            </div>
        );
    } else {
        return (
            <div>
                We are in normale mode
                {renderUserData(userData)}
            </div>
        );
    }
}

function Dashboard() {
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function getData() {
            setIsLoading(true);
            const data = await apiService.getUserData();
            if(data.isError){
              setUserData({});
            }else{ setUserData(data);}
           
            setIsLoading(false);
        }
        getData();
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
            <h1>Dashboard</h1>
            {isLoading ? <p>Loading...</p> : editMode(userData, setUserData, isEditMode)}
            <button onClick={() => setIsEditMode(!isEditMode)}>Edit</button>
        </div>
    );
}

export default Dashboard;
