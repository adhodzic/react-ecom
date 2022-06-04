import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import useDashboard from '../../hooks/fetchDashboard'
import "./User.css";


function User() {
    const {dashboadData, isError, isLoading, getDashboard, saveDashboard} = useDashboard();
    const [username, setUsername] = useState();
    const [role, setRole] = useState();
    const [fullName, setFullName] = useState();
    const [isInEdit, setIsInEdit] = useState(false);
    useEffect(() => {
        getDashboard()
        console.log(dashboadData)
    }, []);

    function inEditMode(){
        const {Username, FullName, Role} = dashboadData;
        setFullName(FullName);
        setUsername(Username);
        setRole(Role);
        setIsInEdit(!isInEdit)
    }

    function saveData(event) {
        event.preventDefault()
        saveDashboard({username, role, fullName})
        setIsInEdit(false);
    }

    return (
        <div className="User-info">
            {isLoading && <p>Loading...</p>}
            {(!isInEdit && dashboadData) && (
                <div className="User-view">
                    <p>{dashboadData.FullName}</p>
                    <p>{dashboadData.Role}</p>
                    <p>{dashboadData.Username}</p>
                    <Button onClick={() => inEditMode()}>Edit</Button>
                </div>
            )}
            {isInEdit && (
                <Form onSubmit={saveData}>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>FullName</Form.Label>
                        <Form.Control value={fullName} onChange={(e)=> setFullName(e.target.value)} type="text" placeholder="Full Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Control value={role} onChange={(e)=> setRole(e.target.value)} type="text" placeholder="Role" disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={username} onChange={(e)=> setUsername(e.target.value)} type="text" placeholder="Username" />
                    </Form.Group>
                    <Button variant="outline-success" type="submit">
                        Save
                    </Button>
                    <Button variant="outline-danger" onClick={() => setIsInEdit(!isInEdit)}>
                        Cancel
                    </Button>
                </Form>
            )}
        </div>
    );
}

export default User;
