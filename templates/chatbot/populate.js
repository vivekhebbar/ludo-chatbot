function init() {
	var forPop = document.getElementById('forPopulate');
	forPop.innerHTML = "";
	forPop.innerHTML = '<div class="form-group"><input type="text" class="form-control" id="name" placeholder = "Hi! I\'m Ludo. Enter your name!"><id="namesubmit" class="h2" onclick="takeName()">Submit</button></div>';
}

function takeName() {
	var nameInput = document.getElementById('name');
	var userName = nameInput.value;
	var forPop = document.getElementById('forPopulate');
	forPop.innerHTML = "";
}
