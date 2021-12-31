import React from "react";
import FavoriteMovies from "./FavoriteMovies";

function MovieList(props) {
  // console.log(props);
	const FavouriteComponent = props.favouriteComponent;

const movieListStyle={
  display:"flex"

}

  return (
    <div className="container pratibha" >
      {props.movies.map((item,index)=>
      <div key={index}  >
        <img src={item.Poster} />
      <div onClick={props.handleFavouritesClick}> 
      <FavouriteComponent />
      </div>
      </div>)}
      </div>
  );
}

export default MovieList;
