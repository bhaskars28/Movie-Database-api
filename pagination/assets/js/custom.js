var page = 1;
var totalResults = 0;

$(document).ready(() => {
  if(page == 1){
    $('.prev').hide();
  }


  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
		console.log(searchText)
		getMovies(searchText);
		e.preventDefault();
  });
});

function Pagination(pageType) {
  let resultPerPage = 10;

  if(pageType == 'next'){
    page+=1;
  }
  else {
    page-=1;
  }
  if(page != 1){
    $('.prev').show();
  }

  mod = totalResults % resultPerPage;
  if(mod > 0) {
    if(page == parseInt(totalResults/resultPerPage)+1){
      $('.next').hide();
    }
  }
  if(page == parseInt(totalResults/resultPerPage)){
    $('.next').hide();
  }

  // logic ends
  getMovies($('#searchText').val());
}
function getMovies(movieId){

	//ajax method to make api calls
	$.ajax({
		url: "http://www.omdbapi.com/?apikey=290e70a7&s="+movieId+"&page="+page,
		type: "POST",
		success: function(data){
			console.log(data);

			let movies = data.Search;
      totalResults = data.totalResults;
			      let output = '';
			      $.each(movies, (index, movie) => {
              console.log(movie,index,movies);
			        output += `<div class="col-md-2 col-sm-4 col-xs-6 col-xxs-12">
			            <div class="well text-center">
			              <img class="image" src="${movie.Poster}">
			              <h5>${movie.Title}</h5>
			              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" data-toggle="modal" data-target="#movieDetails" href="#">Movie Details</a>
			            </div>
			          </div>
			        `;
			      });

			      $('#movies').html(output);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
};


function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  getMovie(id)
  return false;
}
function getMovie(id) {
let movieId = id;
console.log(id)
$.ajax({
	url: "http://www.omdbapi.com/?apikey=290e70a7&i="+movieId,
	type: "POST",
	success: function(data){
		debugger;
		console.log(data);

		let movie = data;

		let output =`
			<div class="row">
				<div class="col-md-3 col-sm-4 col-xs-12">
					<img src="${movie.Poster}" class="img-responsive thumbnail">
				</div>
				<div class="col-md-9 col-sm-8 col-xs-12">
					<h2>${movie.Title} <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="view-imdb">View IMDB</a></h2>
          <h6>${movie.Plot}</h6>
					<ul class="list-group">
						<li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
						<li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
						<li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
						<li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
						<li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
						<li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
						<li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
					</ul>
				</div>
			</div>

		`;

		$('#movie').html(output);
		},
	})
}
