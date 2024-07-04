import { useContext } from "react";
import { Context } from "../store/appContext";
import { Container } from "react-bootstrap";
import NavbarComponent from "../components/navbar/Navbar";
import GenresSelection from "../components/firstAccess/GenresSelection";
import MoviesFirstPage from "../components/movies/MoviesFirstPage";
import SeriesFirstPage from "../components/series/SeriesFirstPage";
import MovieInfo from "../components/movies/MovieInfo";
import SerieInfo from "../components/series/SerieInfo";
import RatedMovies from "../components/movies/RatedMovies";

const Home = () => {
  const { store } = useContext(Context);

  const { page, movieInfo, nlpMoviesData, serieInfo, nlpSeriesData } = store;

  const token = localStorage.getItem("jwt-token");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <Container fluid className="p-0">
      <NavbarComponent />
      {token && !currentUser.favorite_genres && <GenresSelection />}
      {token && currentUser.favorite_genres && page == "movies" && (
        <MoviesFirstPage />
      )}
      {token &&
        currentUser.favorite_genres &&
        page == "movieInfo" &&
        nlpMoviesData &&
        movieInfo && <MovieInfo />}
      {token && currentUser.favorite_genres && page == "series" && (
        <SeriesFirstPage />
      )}
      {token &&
        currentUser.favorite_genres &&
        page == "serieInfo" &&
        nlpSeriesData &&
        serieInfo && <SerieInfo />}
      {token && currentUser.favorite_genres && page == "ratedMovies" && (
        <RatedMovies />
      )}
      {!token && <h1>Home</h1>}
    </Container>
  );
};
export default Home;
