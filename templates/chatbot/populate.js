var id = 'forPopulate';

function initial() {
	var nT = '<div class="form-group"><input type="text" class="form-control" id="name" placeholder = "Hi! I\'m Ludo. Enter your name!" autocomplete="off" autofocus="autofocus" onkeydown="if (event.keyCode == 13) { takeName(); return false; }"><h2 id="pressenter" onclick="takeName()">Enter</h2></div>';
	changeById(id, nT, 0);
}

function takeName() {
	var nameInput = document.getElementById('name');
	var userName = nameInput.value;
	changeById(id, "", 0);
	start(userName);
}

function start(name) {
	var str1 = '<h2>Well hey there,  ' + name + '! Nice to meet you.</h2>';
	var nexttime = changeById(id, str1, 0);
	var str2 = '<h2>My name\'s Ludo, and I\'m here for you if you\'re bored and want something to do...</h2></br>';
	var strbtn = '<h2 id="im-game" onclick=next(name)>' + '<i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;' + "I'M GAME" +'&nbsp;&nbsp;&nbsp;&nbsp;</h2>';
	changeById(id, str2 + strbtn, nexttime + 2000);
}

function next(name) {
	choices();
	
}


function choices() {
	choiceList = bogusChoices();
	labels = choiceList[0]
	probs = choiceList[1]
	alert(labels);
}

function bogusChoices() {
	arr1 = ['Steel', 'Coal', 'Mining', 'Education', 'Medical', 'Law']
	arr2 = [1 , 2, 3, 1, 2, 4]
	var sum2 = arr2.reduce(function(a,b) { return a+ b;}, 0);
	for(var i=0; i<arr2.length; i++) {
    	arr2[i] /= sum2;
	}
	return [arr1, arr2];


}