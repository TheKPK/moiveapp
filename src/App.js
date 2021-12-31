import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import MovieList from "./Components/MovieList";
import MovieListHeading from "./Components/MovieListHeading";
import AddFavourites from "./Components/AddFavourites";
import RemoveFavourites from "./Components/RemoveFavourites";
import { Button } from "bootstrap";

function App() {
  const [movies, setMovies] = useState([
   
  ]);
  const [searcValue, setSearchValue] = useState("");
  const [favourite, setFavourite] = useState([]);

  // creating search bar function
  const getSearchValue = async (search) => {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=79555010`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  useEffect(() => {
    getSearchValue(searcValue);
  }, [searcValue]);
  const handleSearch = (e) => {
    e.preventDefault();
    let inputVal = e.target.value;
    setSearchValue(inputVal);
  };
  // rendering favourite components
  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourite(movieFavourites);
    }
  }, []);

  // saving to localStorage
  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  //add to favourites
  const addFavouriteMovie = (movieData) => {
    const newFav = [...favourite, movieData];
    setFavourite(newFav);
    saveToLocalStorage(newFav);
  };

  //   remove from favourites
  const removeFavouriteMovies = (movieData) => {
    const newFav = favourite.filter((fav) => fav.imdbID !== movieData.imdbID);
    setFavourite(newFav);
    saveToLocalStorage(newFav);
  };

  return (
    <div>
      <div >
        <MovieListHeading heading="Movies" />
        <input type="text" value={searcValue} onChange={handleSearch} />
      </div>
      <div>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div >
        <MovieListHeading heading="Favourite Movies" />
      </div>
      <div>
        <MovieList
          movies={favourite}
          handleFavouritesClick={removeFavouriteMovies}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
