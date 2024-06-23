import { useContext } from "react";
import { Context } from "../../store/appContext";
import { Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import LoginModal from "../login/LoginModal";

const NavbarComponent = () => {
  const { actions } = useContext(Context);
  const { setShowLoginModal, logout } = actions;

  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Movies Recommendations</Navbar.Brand>
        <Nav className="ms-auto">
          {currentUser ? (
            <NavDropdown
              title={`Cuenta de ${currentUser.username}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">
                Mis valoraciones
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => logout()}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Button variant="dan" onClick={() => setShowLoginModal(true)}>
              Iniciar sesión
            </Button>
          )}
        </Nav>
      </Container>
      <LoginModal />
    </Navbar>
  );
};

export default NavbarComponent;
