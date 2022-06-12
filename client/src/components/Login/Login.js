import {Form, Button} from 'react-bootstrap'
import React, { useState } from 'react';
import apiService from '../../services/userApi'
import './Login.css'
import { useLocation, useNavigate, Link} from 'react-router-dom';

function Login(props) {
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isError, setIsError] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.pathname || '/dashboard'
  const handleSubmit = async (event)=>{
    event.preventDefault();
    setIsSubmiting(true);
    let data = await apiService.loginUser({Username: username, Password: password});
    if(data.isError){
        setIsError(data.error)
        setIsSubmiting(false)
        return
    }
    props.setToken(data.Token);
    localStorage.setItem('User',JSON.stringify(data.User))
    setIsSubmiting(false)
    console.log(from)
    navigate(from, {replace: true})
  }
    return (
        <div className="Login">
          <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" onChange={(e) => setUserame(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your username with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button disabled={isSubmiting} variant="primary" type="submit">
                    Login
                </Button>
                <Link to='/register'>Create account</Link>
            </Form>
            {isError && (<p>{isError}</p>)}
        </div>
    );
}

export default Login;
