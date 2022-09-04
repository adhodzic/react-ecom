import {Nav, Navbar, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import {cartContext} from '../../App'
function NavBar() {
    const cart = useContext(cartContext)
    function getCartCount(){
        const {cartItems} = cart
        return cartItems.length
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>E-comm</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Items</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/cart">
                        <div className="cart-icon">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <p>{getCartCount()}</p>
                        </div>
                        
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
