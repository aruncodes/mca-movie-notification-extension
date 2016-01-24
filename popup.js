/*

	Extension to check for new movies in MCA server

	Author: Arun Babu
	Date: 24/01/2016

*/

/* display movie list from array*/
function displayMovieList(host, movieList) {

	if(movieList.length <= 0) {
		document.getElementById("result").innerHTML = "<i> Couldn't load movie list, press 'Check Now' button! </i>";
		return;
	}

	// var html = '<h3><a id="click" href="'+host+'movies.php"> MCA Movies</a> </h3>';
	var html = "<ul class='movieList'>";
	for (var i = 0; i < movieList.length; i++) {
		html += "<li class='listItem'>";
		html += "<a href='"+host+movieList[i].link+"'>";
		html += "<div class='movieDetails'>" + movieList[i].name + ", "+movieList[i].imdb +"</div>";
		html += '<img class="movieThumb" src="'+host+movieList[i].thumb+'">';
		html += "</a>";
		html += "</li>";
	}
	html += "</ul>";

	document.getElementById("result").innerHTML = html;
}

/* update current list */
function updateList() {
	chrome.storage.local.get(['host','movieList'],function(items) {
		var host = items['host'];
		var movieList = items['movieList'];

		/*open movies page when title is clicked*/
		document.getElementById('click').addEventListener('click',function(){
			chrome.tabs.create({url:host+"movies.php"});
		});

		/*open href links on click*/
		document.addEventListener('click',function(e){
		  if(e.target.parentNode.href!==undefined){
		    chrome.tabs.create({url:e.target.parentNode.href})
		  }
		})

		displayMovieList(host,movieList);
	});
}

document.addEventListener('DOMContentLoaded', function () {

	/* load movies when button is clicked*/
	document.getElementById('check').addEventListener('click',function() {
		document.getElementById('result').innerHTML =" <i> Loading... </i> <br> Note: This works only if you are inside IIT Bombay.";
		chrome.runtime.sendMessage({msg:"checkMovies"});
	});

	/*open settings when button is clicked */
	document.getElementById('settings').addEventListener('click',function() {
		chrome.tabs.create({url:"settings.html"});
	});

	updateList();

	/*when movie list is updated, call dynamic update of popup*/
	chrome.storage.onChanged.addListener(function(changes,areaName) {
		if('movieList' in changes) {
			updateList();
		}
	});

});