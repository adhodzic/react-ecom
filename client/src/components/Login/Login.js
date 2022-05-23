import {Form, Button} from 'react-bootstrap'
import React, { useState } from 'react';
import apiService from '../../services/userApi'
import './Login.css'

function Login(props) {
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const handleSubmit = async (event)=>{
    event.preventDefault();
    setIsSubmiting(true);
    let {Token} = await apiService.loginUser({username, password});
    console.log(Token)
    props.setToken(Token);
    setIsSubmiting(false)
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
            </Form>
        </div>
    );
}

export default Login;
