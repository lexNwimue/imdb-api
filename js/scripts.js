$(document).ready(() => {
  $("#form").submit((e) => {
    const searchText = $("#searchText").val();
    e.preventDefault();
    getMovies(searchText);
  });
});

const getMovies = (searchText) => {
  axios
    .get("https://www.omdbapi.com/?apikey=cd82fde1&s=" + searchText)
    .then((response) => {
      console.log(response);
      const movies = response.data.Search;
      let htmlOutput = "";
      movies.forEach((movie) => {
        htmlOutput += `
          <div class="card mb-2" style="width: 15rem; height: 25rem">
          <img src=${movie.Poster} class="card-img-top h-75" alt="...">
          <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <a onclick="selectedMovie('${movie.imdbID}')" class="btn btn-primary">More Details</a>
          </div>
          </div>
          `;
      });
      $("#display").html(htmlOutput);
    })
    .catch((err) =>
      console.log("There was some error fetching the movie", err)
    );
};

const selectedMovie = (id) => {
  sessionStorage.setItem("id", id);
  window.location = "movieDetails.html";
  return false;
};

const getSelectedMovie = () => {
  const movieID = sessionStorage.getItem("id");
  axios
    .get("http://www.omdbapi.com/?apikey=cd82fde1&i=" + movieID)
    .then((response) => {
      const movie = response.data;
      console.log(movie);
      let output = `
        <div class="card w-75">
        <div class = "container-fluid">
        <div class = "row">
            <div class= "col-md-4">
                <img src="${movie.Poster}" class="w-100" alt="...">
            </div>
            <div class = "col-md-8">
                <div class="card-body">
                <h2 class="card-title">${movie.Title}</h2>
                <ul class = "list-group list-group-flush">
                    <li class = "list-group-item"><strong>Language: </strong> ${movie.Language} </li>
                    <li class = "list-group-item"><strong>Genre: </strong> ${movie.Genre} </li>
                    <li class = "list-group-item"><strong>Released: </strong> ${movie.Year} </li>
                    <li class = "list-group-item"><strong>Ratings: </strong> ${movie.Ratings[0].Source} - ${movie.Ratings[0].Value} </li>
                    <li class = "list-group-item"><strong>IMDB Ratings: </strong> ${movie.imdbRating} </li>
                    <li class = "list-group-item"><strong>Ratings: </strong> ${movie.Runtime}</li>
                </ul>
            </div>
        </div>
        </div>
        <div class = "mb-2">
            <h3> Plot </h3>
            <p> ${movie.Plot} </p>
            <a href="index.html" class="btn btn-secondary">Go Back</a>
            <a href = "http://imdb.com/title/${movie.imdbID}" class = "btn btn-primary" target = "_blank"> View on IMDB </a>
        </div>
        </div>
        </div>
          `;
      $("#movie-details").html(output);
    })
    .catch((err) => console.log(err));
};
