function initial() {
	var id = 'forPopulate';
	var nT = '<div class="form-group"><input type="text" class="form-control" id="name" placeholder = "Hi! I\'m Ludo. Enter your name!" autocomplete="off" onkeydown="if (event.keyCode == 13) { takeName(); return false; }"><h2 id="namesubmit" onclick="takeName()">Submit</h2></div>';
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
	var str1 = '<h2>Well hey there,  ' + name + '! Nice to meet you.</h2>';
	var str2 = '<h2>My name\'s Ludo, and I\'m here for you if you\'re bored and want something to do...</h2></br>';
	var strbtn = '<h2 id="im-game" onclick=next()>' + '<i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;' + "I'M GAME" +'&nbsp;&nbsp;&nbsp;&nbsp;</h2>';
	//changeById(id, str1);
	//changeById(id, str1 + str2);
	changeById(id, str1 + str2 + strbtn);
}

function next() {
	alert("Hey");
}
