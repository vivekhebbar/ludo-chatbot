function changeById(id, newText) {
	var c = document.getElementById(id);
	c.style.transition = "all 0.5s";
	c.style.WebKitTransition = "all 0.5s";
	setTimeout(function(){c.style.opacity = 0;}, 500);
	setTimeout(function(){c.style.opacity = 1;}, 999);
	setTimeout(function(){c.innerHTML = newText;}, 1000);

}