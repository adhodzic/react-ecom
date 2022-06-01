import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./User.css";

function User(props) {
    const { Username, Role, FullName } = props.user;
    const [username, setUsername] = useState(Username);
    const [role, setRole] = useState(Role);
    const [fullName, setFullName] = useState(FullName);
    const [isInEdit, setIsInEdit] = useState(false);
    

    function saveData(event) {
        event.preventDefault()
        props.saveData({username, role, fullName})
        setIsInEdit(false);
        
    }

    function cancelData() {
        setUsername(Username);
        setRole(Role);
        setFullName(FullName);
        setIsInEdit(false);
    }

    return (
        <div className="User-info">
            {!isInEdit && (
                <div className="User-view">
                    <p>{fullName}</p>
                    <p>{role}</p>
                    <p>{username}</p>
                    <Button onClick={() => setIsInEdit(!isInEdit)}>Edit</Button>
                </div>
            )}
            {isInEdit && (
                <Form onSubmit={saveData}>
                    <Form.Group className="mb-3" controlId="fullName">

                        <Form.Control type="text" placeholder="Full Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="role">

                        <Form.Control type="text" placeholder="Role" disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="username">

                        <Form.Control type="text" placeholder="Username" />
                    </Form.Group>
                    <Button variant="outline-success" type="submit">
                        Save
                    </Button>
                    <Button variant="outline-danger" type="submit">
                        Cancel
                    </Button>
                </Form>
            )}
        </div>
    );
}

export default User;
