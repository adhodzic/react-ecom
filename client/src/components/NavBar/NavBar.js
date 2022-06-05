import {Nav, Navbar, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>E-comm</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
