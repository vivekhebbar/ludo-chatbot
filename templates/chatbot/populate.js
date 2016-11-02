function init() {
	var id = 'forPopulate';
	var nT = '<div class="form-group"><input type="text" class="form-control" id="name" placeholder = "Hi! I\'m Ludo. Enter your name!" autocomplete="off"><h2 id="namesubmit" onclick="takeName()">Submit</h2></div>';
	changeById(id, nT);
}

function takeName() {
	var nameInput = document.getElementById('name');
	var userName = nameInput.value;
	var id = 'forPopulate';
	changeById(id, "");
	start(userName);
}

function start(name) {
	var id = 'forPopulate';
	var strname = "hello " + name;
	changeById(id, "<h2>" + strname + "</h2>");
}
