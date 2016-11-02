
function changeById(id, newText, nextTime) {
	var c = document.getElementById(id);
	c.style.transition = "all 0.5s";
	c.style.WebKitTransition = "all 0.5s";
	setTimeout(function(){c.style.opacity = 0;}, nextTime + 500);
	setTimeout(function(){c.style.opacity = 1;}, nextTime + 999);
	setTimeout(function(){c.innerHTML = newText;}, nextTime + 1000);
	return nextTime;
}