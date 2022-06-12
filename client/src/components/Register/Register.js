import {Form, Button} from 'react-bootstrap'
import React, { useState } from 'react';
import apiService from '../../services/userApi'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Register.css'
function Register(props) {
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isError, setIsError] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.pathname || '/dashboard'
  const handleSubmit = async (event)=>{
    event.preventDefault();
    setIsSubmiting(true);
    let data = await apiService.registerUser({Username: username, Password: password, FullName: fullName});
    if(data.isError){
        setIsError(data.error)
        setIsSubmiting(false)
        return
    }
    props.setToken(data.Token);
    setIsSubmiting(false)
    console.log(data.Token)
    navigate('/', {replace: true})
  }
    return (
        <div className="Register">
          <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Full Name" onChange={(e) => setFullName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUserame(e.target.value)} required />
                    <Form.Text className="text-muted">
                        We'll never share your username with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Button disabled={isSubmiting} variant="primary" type="submit">
                    Register
                </Button>
                <Link to={'/login'}>Already have account ?</Link>
            </Form>
            {isError && (<p>{isError}</p>)}
        </div>
    );
}

export default Register;
