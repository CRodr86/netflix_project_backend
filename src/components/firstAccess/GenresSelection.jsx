import { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Row, Col, Button } from "react-bootstrap";
import "./GenresSelection.css"; // Asegúrate de crear este archivo y definir los estilos necesarios

const GenresSelection = () => {
  const { actions, store } = useContext(Context);
  const { getMoviesData, getSeriesData, sendFirstAccessData } = actions;
  const { moviesData, seriesData } = store;

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [isSelectingMovies, setIsSelectingMovies] = useState(false);
  const [isSelectingSeries, setIsSelectingSeries] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const genresList = [
    "Drama",
    "Comedy",
    "Action",
    "Romance",
    "Crime",
    "Thriller",
    "Documentary",
    "Adventure",
    "Mystery",
    "Horror",
    "Biography",
    "Family",
    "Animation",
    "Fantasy",
    "History",
    "Sci-Fi",
    "Music",
    "Sport",
    "Musical",
    "War",
    "Western",
    "News",
    "Game-Show",
    "Reality-TV",
  ];

  const toggleGenreSelection = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 6) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const toggleMovieSelection = (movieId) => {
    if (selectedMovies.includes(movieId)) {
      setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
    } else {
      setSelectedMovies([...selectedMovies, movieId]);
    }
  };

  const toggleSeriesSelection = (seriesId) => {
    if (selectedSeries.includes(seriesId)) {
      setSelectedSeries(selectedSeries.filter((id) => id !== seriesId));
    } else {
      setSelectedSeries([...selectedSeries, seriesId]);
    }
  };

  const handleContinueFromGenres = () => {
    getMoviesData(selectedGenres);
    setIsSelectingMovies(true);
  };

  const handleContinueFromMovies = () => {
    getSeriesData(selectedGenres);
    setIsSelectingMovies(false);
    setIsSelectingSeries(true);
  };

  if (isSelectingSeries && seriesData && seriesData.length > 0) {
    return (
      <>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <h1>Elige tus series favoritas</h1>
            <p className="fs-5">
              Selecciona tus series favoritas para que podamos hacerte
              recomendaciones personalizadas
            </p>
            <p>Selecciona al menos 5 series</p>
          </Col>
        </Row>
        <Row className="justify-content-center px-3">
          {seriesData.map((series, index) => (
            <Col
              xs={4}
              md={2}
              key={index}
              onClick={() => toggleSeriesSelection(series.id)}
            >
              {series.poster_url ? (
                <img
                  src={series.poster_url}
                  alt={series.title}
                  className={`w-100 ${
                    selectedSeries.includes(series.id) ? "selected" : ""
                  }`}
                />
              ) : (
                <div className="w-100 h-100 bg-secondary">
                  <p className="text-center text-light fs-3 fw-bold"></p>
                </div>
              )}
              <p className="w-100 pb-3 fw-bold text-center">
                {series.title.toUpperCase()}
              </p>
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center">
          <Button
            variant="success"
            className="m-2"
            size="lg"
            disabled={selectedSeries.length < 5}
            onClick={() =>
              sendFirstAccessData(
                Number(currentUser.id),
                selectedGenres.join(", "),
                selectedMovies,
                selectedSeries
              )
            }
          >
            Continuar {">>"}
          </Button>
        </Row>
      </>
    );
  } else if (isSelectingMovies && moviesData && moviesData.length > 0) {
    return (
      <>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <h1>Elige tus películas favoritas</h1>
            <p className="fs-5">
              Selecciona tus películas favoritas para que podamos hacerte
              recomendaciones personalizadas
            </p>
            <p>Selecciona al menos 5 películas</p>
          </Col>
        </Row>
        <Row className="justify-content-center px-3">
          {moviesData.map((movie, index) => (
            <Col
              xs={4}
              md={2}
              key={index}
              onClick={() => toggleMovieSelection(movie.id)}
            >
              {movie.poster_url ? (
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className={`w-100 ${
                    selectedMovies.includes(movie.id) ? "selected" : ""
                  }`}
                />
              ) : (
                <div className="w-100 h-100 bg-secondary">
                  <p className="text-center text-light fs-3 fw-bold"></p>
                </div>
              )}
              <p className="w-100 pb-3 fw-bold text-center">
                {movie.title.toUpperCase()}
              </p>
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center">
          <Button
            variant="success"
            className="m-2"
            size="lg"
            disabled={selectedMovies.length < 5}
            onClick={handleContinueFromMovies}
          >
            Continuar {">>"}
          </Button>
        </Row>
      </>
    );
  } else {
    return (
      <>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <h1>Elige tus géneros favoritos</h1>
            <p className="fs-5">
              Seleccionas tus géneros favoritos para que podamos hacerte
              recomendaciones personalizadas
            </p>
            <p>Selecciona al menos 3 géneros y máximo 6</p>
            <Row className="justify-content-center">
              {genresList.map((genre, index) => (
                <Col xs={6} md={3} key={index}>
                  <Button
                    variant={
                      selectedGenres.includes(genre) ? "primary" : "secondary"
                    }
                    className="m-2 w-100 py-3 fw-bold"
                    size="lg"
                    onClick={() => toggleGenreSelection(genre)}
                  >
                    {genre}
                  </Button>
                </Col>
              ))}
            </Row>
            <Button
              variant="success"
              className="m-2"
              size="lg"
              disabled={selectedGenres.length < 3 || selectedGenres.length > 6}
              onClick={handleContinueFromGenres}
            >
              Continuar {">>"}
            </Button>
          </Col>
        </Row>
      </>
    );
  }
};

export default GenresSelection;
