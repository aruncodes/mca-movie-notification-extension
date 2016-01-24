
document.addEventListener('DOMContentLoaded', function () {

	/* populate fields in settings page*/
	chrome.storage.local.get(['uname','pass','interval'],function(items){
		var u = document.getElementById('username');
		var p = document.getElementById('password');
		var i = document.getElementById('interval');

		if(!u.value) {
			u.value = items['uname'];
		}
		if(!p.value) {
			p.value = items['pass'];
		}

		if(items['interval'])
			i.value = items['interval'];
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
});