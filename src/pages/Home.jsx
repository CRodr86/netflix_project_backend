import { Container } from "react-bootstrap";
import NavbarComponent from "../components/navbar/Navbar";
import GenresSelection from "../components/firstAccess/GenresSelection";

const Home = () => {
  const token = localStorage.getItem("jwt-token");

  return (
    <Container fluid className="p-0">
      <NavbarComponent />
      {token ? <GenresSelection /> : <h1>Home</h1>}
    </Container>
  );
};
export default Home;
