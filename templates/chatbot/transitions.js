function changeById(id, newText) {
	var c = document.getElementById(id);
	c.style.transition = "all 1s";
	c.style.WebKitTransition = "all 1s";
	c.style.opacity = 0;
	c.innerHTML = newText;
	setTimeout(function(){c.style.opacity = 1;}, 1000);
	c.innerHTML = newText;
}