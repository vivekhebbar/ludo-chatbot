function hasClass (e, classname) {
    return e.className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)'));
}
// Add a class
function addClass (e, classname) {
    if (!hasClass(e, classname)) { e.className += " " + classname };
}
// Remove a class
function removeClass (e, classname) {
    if (hasClass(e, classname)) {
        var reg = new RegExp('(\\s|^)' + classname + '(\\s|$)');
        e.className = e.className.replace(reg,' ');
    }       
}

function changeById(id, newText) {
	var c = document.getElementById(id);
	// Transitions only happen when a property changes
	addClass(c, "invisible");
	// After 1.5s, change innerHTML and fade-in
	setTimeout(function () {
	    c.innerHTML = newText;
	    removeClass(c, "invisible");
	}, 1500);
}