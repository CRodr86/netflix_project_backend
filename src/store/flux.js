const getState = ({ /*getStore, getActions,*/ setStore }) => {
  return {
    store: {
      token: null,
      currentUser: null,
      showLoginModal: false,
      userExistsResponse: null,
      emailExistsResponse: null,
      successfullRegistration: false,
      moviesData: [],
      seriesData: [],
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
            setStore({ currentUser: localStorage.getItem("user") });
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
      getMoviesData: async (genres) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/movies",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                genre: genres,
              }),
            }
          );
          const data = await response.json();
          setStore({ moviesData: data });
        } catch (error) {
          console.log(error);
        }
      },
      getSeriesData: async (genres) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/series",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                genre: genres,
              }),
            }
          );
          const data = await response.json();
          setStore({ seriesData: data });
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
            console.log("First access data sent successfully");
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
