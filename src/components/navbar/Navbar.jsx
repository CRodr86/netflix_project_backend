import { useContext } from "react";
import { Context } from "../../store/appContext";
import {
  Container,
  Nav,
  Navbar,
  Button,
  NavDropdown,
  Stack,
} from "react-bootstrap";
import LoginModal from "../login/LoginModal";

const NavbarComponent = () => {
  const { actions } = useContext(Context);
  const { setShowLoginModal, logout, setPage } = actions;

  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Movies Recommendations</Navbar.Brand>
        <Nav className={`d-flex ${currentUser ? 'justify-content-between' : ''} w-75`}>
          {currentUser ? (
            <>
              <Stack direction="horizontal" gap={3}>
                <Nav.Link onClick={()=>setPage("movies")}>Movies</Nav.Link>
                <Nav.Link onClick={()=>setPage("series")}>Series</Nav.Link>
              </Stack>
              <NavDropdown
                title={`Cuenta de ${currentUser.username}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => setPage("ratedMovies")}>
                  Mis valoraciones
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Button className="ms-auto" variant="dan" onClick={() => setShowLoginModal(true)}>
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
