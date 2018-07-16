$(document).ready(function (){
	 $('form').on('submit', function(event) {
	 	let userInput = $('#userInput').val();
	 	getMovie(userInput);
	 	event.preventDefault();
	 })
});

function movieDetails(imdbID){


	/*-----------IMDBid request-----------------*/
		let xhr = new XMLHttpRequest;
        xhr.open('GET', 'http://www.omdbapi.com/?i=' + imdbID + "&apikey=bc855c27");
        xhr.timeout = 0;
		xhr.onload = function (e) {
		  if (xhr.readyState === 4) {
		    if (xhr.status === 200) {
		    /*-----------if OK then Draw content-----------------*/
		      let movie = JSON.parse(xhr.responseText);
		      console.log(movie);
				let output =`
			        <div class="row">
			          <div class="col-md-4">
			            <img src="${movie.Poster}" class="thumbnail" onerror = this.src="img/Clapboard.png">
			          </div>
			          <div class="col-md-8">
			            <h2>${movie.Title}</h2>
			            <ul class="list-group">
			              <li class="list-group-item"><strong>Genre:</strong> ${movie.Title}</li>
			              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
			              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
			              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
			              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
			              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
			              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
			            </ul>
			          </div>
			        </div>
			        <div class="row" id = "plotModal">
			          <div class="well">
			            <h3>Plot</h3>
			            ${movie.Plot}
			            <hr>
			            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
			            
			          </div>
			        </div>
		        `;
		        $('#movies2').html(output);
		    } else {
		      console.error(xhr.statusText);
		    }
		  }
		};
		xhr.onerror = function (e) {
		  console.error(xhr.statusText);
		};

		xhr.ontimeout = function (e) {
			let output =`
			        <div class="row">
			          <div class="col-md-4">
			            <p> Sorry, there is no info regards this movie <p>
			          </div>
			        </div>
			        `;
		   $('#movies2').html(output);
		};
        xhr.send();

	/*-----------MODAL WINDOW-----------------*/
	$('#myModal').css('display',"block");
	$('.close').on('click', function() {
		$('#myModal').css('display',"none");
		 $('#movies2').html('');
	});
	window.onclick = function(event) {
		if (event.target == document.getElementById('myModal')) {
			$('#myModal').css('display',"none");
		}
	};
}
function drawResult(moviesArr){
	let output = '';
	moviesArr.forEach(function(curr, i) {
    	output += `
			<div class="col-md-3">
				<div class="well text-center">
					<img src="${moviesArr[i].Poster}" onerror=this.src="img/Clapboard.png">
					<h5>${moviesArr[i].Title}</h5>
					<a href="#" id = "myBtn" class = "btn btn-primary" onclick = "movieDetails('${moviesArr[i].imdbID}')">Movie Details</a>
				</div>
			</div>
    	`;
	});

	$('#movies').html(output);
}

function getMovie(userInput){
	let xhr = new XMLHttpRequest;
        xhr.open('GET', 'http://www.omdbapi.com/?s=' + userInput + "&apikey=bc855c27");
        xhr.timeout = 5000;
		xhr.onload = function (e) {
		  if (xhr.readyState === 4) {
		    if (xhr.status === 200) {
		      let moviesArr = JSON.parse(xhr.responseText).Search;
		      console.log(moviesArr);
		      drawResult(moviesArr);
		    } else {
		      console.error(xhr.statusText);
		    }
		  }
		};
		xhr.onerror = function (e) {
		  console.error(xhr.statusText);
		};

		xhr.ontimeout = function (e) {
		  console.log("API didnt work")
		};
        xhr.send();
}

