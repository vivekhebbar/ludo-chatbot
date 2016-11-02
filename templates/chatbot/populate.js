function init() {
	var forPop = document.getElementById('forPopulate');
	forPop.innerHTML = "";
	forPop.innerHTML = '<div class="form-group"><input type="text" class="form-control" id="name" placeholder = "Hi! I\'m Ludo. Enter your name!"><h2 id="namesubmit" onclick="takeName()">Submit</h2></div>';
}

function takeName() {
	var nameInput = document.getElementById('name');
	var userName = nameInput.value;
	var forPop = document.getElementById('forPopulate');
	forPop.innerHTML = "";
	forPop.innerHTML = ""
	start(userName);
}

function start(name) {
	var forPop = document.getElementById('forPopulate');
	forPop.innerHTML = "<h2>hello</h2>"
	// var strHTML = "<div class="container"><h2>A</h2></div>"
	// forPop.innerHTML = strHTML;
}
