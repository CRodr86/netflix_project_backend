const getState = ({ /*getStore,*/ getActions, setStore }) => {
  return {
    store: {
      token: null,
      currentUser: null,
      showLoginModal: false,
      userExistsResponse: null,
      emailExistsResponse: null,
      successfullRegistration: false,
      firstMoviesData: [],
      moviesData: [],
      firstSeriesData: [],
      seriesData: [],
      page: "movies",
      movieInfo: {},
      serieInfo: {},
      ratedMoviesData: [],
      ratedSeriesData: [],
    },
    actions: {
      login: async (username, password) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            }
          );
          const data = await response.json();
          const accessToken = data.token;
          const userData = data.user;

          if (accessToken === undefined || accessToken === null) {
            alert("Invalid credentials");
          } else {
            localStorage.setItem("jwt-token", accessToken);
            localStorage.setItem("user", JSON.stringify(userData));

            setStore({ token: localStorage.getItem("jwt-token") });
            setStore({ currentUser: JSON.parse(localStorage.getItem("user")) });
            setStore({ showLoginModal: false });
          }
        } catch (error) {
          console.log(error);
        }
      },
      logout: () => {
        localStorage.removeItem("jwt-token");
        localStorage.removeItem("user");
        setStore({ token: null });
        setStore({ currentUser: null });
      },
      register: async (email, username, password, age) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                age: age,
              }),
            }
          );
          const data = await response.json();

          if (response.status === 201) {
            setStore({ userExistsResponse: null });
            setStore({ emailExistsResponse: null });
            setStore({ successfullRegistration: true });
          } else if (response.status === 409) {
            if (
              data.message === "User with the given username already exists"
            ) {
              setStore({
                userExistsResponse:
                  "Ya existe una cuenta con este nombre de usuario",
              });
            }
            if (data.message === "User with the given email already exists") {
              setStore({
                emailExistsResponse: "Ya existe una cuenta con este email",
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      setShowLoginModal: (value) => {
        setStore({ showLoginModal: value });
      },
      finishRegistration: () => {
        setStore({ successfullRegistration: false });
      },
      clearEmailExistsResponse: () => {
        setStore({ emailExistsResponse: null });
      },
      clearUserExistsResponse: () => {
        setStore({ userExistsResponse: null });
      },
      getFirstMoviesData: async (genres, user_id) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/first-movies",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                genre: genres,
                user_id: user_id,
              }),
            }
          );
          const data = await response.json();
          setStore({ firstMoviesData: data });
        } catch (error) {
          console.log(error);
        }
      },
      getMoviesData: async (user_id) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/recommend-movies",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: user_id,
              }),
            }
          );
          const data = await response.json();
          setStore({ moviesData: data });
        } catch (error) {
          console.log(error);
        }
      },
      getFirstSeriesData: async (genres, user_id) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/first-series",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                genre: genres,
                user_id: user_id,
              }),
            }
          );
          const data = await response.json();
          setStore({ firstSeriesData: data });
        } catch (error) {
          console.log(error);
        }
      },
      getSeriesData: async (user_id) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/recommend-series",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: user_id,
              }),
            }
          );
          const data = await response.json();
          setStore({ seriesData: data });
        } catch (error) {
          console.log(error);
        }
      },
      getUserById: async (id) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + `/user/${id}`
          );
          const data = await response.json();
          setStore({ currentUser: data });
          localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
          console.log(error);
        }
      },
      sendFirstAccessData: async (user_id, genres, movies, series) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/first-access",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: user_id,
                genres: genres,
                movies: movies,
                series: series,
              }),
            }
          );
          if (response.status === 201) {
            getActions().getUserById(user_id);
            setStore({ firstMoviesData: [] });
            setStore({ firstSeriesData: [] });
            setStore({ page: "movies" });
          }
        } catch (error) {
          console.log(error);
        }
      },
      setPage: (value) => {
        if (value === "movies" || value === "series") {
          setStore({ movieInfo: {} });
          setStore({ serieInfo: {} });
        } else if (value === "movieInfo") {
          setStore({ movieInfo: {} });
        } else if (value === "serieInfo") {
          setStore({ serieInfo: {} });
        } else if (value === "ratedMovies") {
          setStore({ ratedMoviesData: [] });
          setStore({ ratedSeriesData: [] });
        }
        setStore({ page: value });
      },
      getMovieById: async (movie_id, user_id) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + `/movie/${movie_id}/${user_id}`
          );
          const data = await response.json();
          setStore({ movieInfo: data });
        } catch (error) {
          console.log(error);
        }
      },
      getSerieById: async (movie_id, user_id) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + `/serie/${movie_id}/${user_id}`
          );
          const data = await response.json();
          setStore({ serieInfo: data });
        } catch (error) {
          console.log(error);
        }
      },
      getUserMoviesRatings: async (user_id) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + `/user-ratings/${user_id}/movies`
          );
          const data = await response.json();
          setStore({ ratedMoviesData: data });
        } catch (error) {
          console.log(error);
        }
      },
      rateMovie: async (user_id, movie_id, rating) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/rate-movie",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: user_id,
                movie_id: movie_id,
                rating: rating,
              }),
            }
          );
          if (response.status === 201) {
            getActions().getUserById(user_id);
          }
        } catch (error) {
          console.log(error);
        }
      },
      getUserSeriesRatings: async (user_id) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + `/user-ratings/${user_id}/series`
          );
          const data = await response.json();
          setStore({ ratedSeriesData: data });
        } catch (error) {
          console.log(error);
        }
      },
      rateSerie: async (user_id, serie_id, rating) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/rate-serie",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: user_id,
                serie_id: serie_id,
                rating: rating,
              }),
            }
          );
          if (response.status === 201) {
            getActions().getUserById(user_id);
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
