
document.addEventListener('DOMContentLoaded', function () {

	/* populate fields in settings page*/
	chrome.storage.local.get(['uname','pass','interval','lastMovie','lastMovieName'],function(items){
		var u = document.getElementById('username');
		var p = document.getElementById('password');
		var i = document.getElementById('interval');
		var l = document.getElementById('lastMovie');

		if(!u.value) {
			u.value = items['uname'];
		}
		if(!p.value) {
			p.value = items['pass'];
		}

		if(items['interval'])
			i.value = items['interval'];

		if(items['lastMovieName'])
			l.innerHTML = "<b>Last Movie :</b> "+items['lastMovie']+' - '+items['lastMovieName'];
	});

	/* save values when save button is pressed */
	document.getElementById('save').addEventListener('click',function() {
		// alert('hi');

		var uname = document.getElementById('username').value;
		var pass = document.getElementById('password').value;
		var interval = document.getElementById('interval').value;

		if(!uname || ! pass) {
			// alert("Username and password are required!");
			document.getElementById("status").innerText = "Username and password are required!";
			document.getElementById("status").style.color = "red";
			return false;
		}
		
		chrome.storage.local.set({'uname':uname,'pass':pass,'interval':interval});

		document.getElementById("status").innerText = "Saved!";
		document.getElementById("status").style.color = "green";
		
		chrome.runtime.sendMessage({msg:"updateAlarm"});

		return false;
	});

	/* notification test */
	document.getElementById('test').addEventListener('click',function() {

		chrome.storage.local.get(['host','movieList'],function(items) {
			var movieList = items['movieList'];

			if(movieList.length > 0) {
				chrome.notifications.create(movieList[0].id, {
					type:"image",
					iconUrl:'icon.png',
					title:movieList[0].name,
					message:  "New movie uploaded in MCA\n" + movieList[0].imdb,
					imageUrl: items['host']+movieList[0].thumb
				});
			} else {
				chrome.storage.local.set({'firstTime':true,'lastMovie':9999999,'lastMovieName':''});
				chrome.runtime.sendMessage({msg:"checkMovies"});
			}
		});
	});
});