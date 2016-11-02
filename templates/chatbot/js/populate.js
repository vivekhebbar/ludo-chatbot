var idPopulate = 'for-populate';
var idTitle = 'title-ludo';
var user_dict = {};

window.onload = function() {initial();};

function initial() {
	var str1 = '<a href="index.html">WELCOME TO LuDO</a>'
	var nexttime = changeById(idTitle, str1, 0);
	var nT = '<h2>LuDO is a chatbot that will recommend you activities for you to enjoy!</h2></br><h2 onclick="showInput()">Click here to begin&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-arrow-circle-down"></i></h2>';
	changeById(idPopulate, nT, nexttime + 2000);
}

function showInput(){
	var nT = '<div class="form-group"><input type="text" class="form-control" id="name" placeholder = "Hi! Give me your name/nickname" autocomplete="off" autofocus="autofocus" onkeydown="if (event.keyCode == 13) { takeName(); return false; }"><h2 id="pressenter" onclick="takeName()">ENTER</h2></div>';
	changeById(idPopulate, nT, 0);
}

function takeName() {
	var nameInput = document.getElementById('name');
	var userName = nameInput.value;
	user_dict.name = userName;
	changeById(idPopulate, "", 0);
	start(userName);
}

function start(name) {
	var str1 = '<h2>Well hey there,  ' + name + '! Nice to meet you.</h2>';
	var nexttime = changeById(idPopulate, str1, 0);
	var str2 = '<h2>My name\'s LuDO, and I\'m here for you if you\'re bored and want something to do...</h2></br>';
	var strbtn = '<h2 id="im-game" onclick=askInitialQueries(name)>' + '<i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;' + "I'M GAME" +'&nbsp;&nbsp;&nbsp;&nbsp;</h2>';
	changeById(idPopulate, str2 + strbtn, nexttime + 2000);
}

function askInitialQueries(name) {
	//determine user's desired activity location.
	var userQuery = '<h2>Ok, ' + user_dict.name + ', I am going to need to ask a couple questions. </h2>';
	userQuery += '<h2>What location do you want to explore for activities?</h2></br>'
	var nT = '<div class="form-group"><input type="text" class="form-control" id="location" placeholder = "Enter Location and Press Enter" autocomplete="off" autofocus="autofocus" onkeydown="if (event.keyCode == 13) { takeLocation(); return false; }"><h2 id="pressenter" onclick="takeLocation()">ENTER</h2></div>';
	changeById(idPopulate, userQuery + nT, 0);
}

function takeLocation() {
	var locationInput = document.getElementById('location');
	var location = locationInput.value;
	user_dict.location = location;
	alert(location);
}

function queryDecisionTree(){
	alert("yo");
}

function choices() {
	choiceList = bogusChoices();
	var labels = choiceList[0]
	probs = choiceList[1]
	alert(labels);
}

function bogusChoices() {
	var arr1 = ['Steel', 'Coal', 'Mining', 'Education', 'Medical', 'Law']
	var arr2 = [1 , 2, 3, 1, 2, 4]
	var sum2 = arr2.reduce(function(a,b) { return a+ b;}, 0);
	for(var i=0; i<arr2.length; i++) { arr2[i] /= sum2;};
	return [arr1, arr2];
}