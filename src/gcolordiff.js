function gcolordiff() {
	var divs = document.getElementsByClassName("ii gt");
	if (divs.length == 0) {
		divs = document.getElementsByClassName("message");
	}
	if (divs.length > 0) {
	    var div = divs[0];
		div.parentNode.style.fontFamily = "monospace";
		
		var oldRevRegExp = /\n(-{3} .*)<br>/g;
		var newRevRegExp = /\n(\+{3} .*)<br>/g;
		var lineIndexRegExp = /\n(@@.*@@)<br>/g;
		var oldRevLineRegExp = /\n(-.*)<br>/g;
		var newRevLineRegExp = /\n(\+.*)<br>/g;

		div.innerHTML = div.innerHTML
		.replace(/(Author:)/g, "\n<span style='font-weight:bold;text-decoration: underline'>$1</span>")
		.replace(/\n(Date:)/g, "\n<span style='font-weight:bold;text-decoration: underline'>$1</span>")
		.replace(/\n(New Revision:)/g, "\n<span style='font-weight:bold;text-decoration: underline'>$1</span>")
		.replace(/\n(Modified:)/g, "\n<hr><span style='font-weight:bold;text-decoration: underline'>$1</span>")
		.replace(/\n(Added:)/g, "\n<hr><span style='font-weight:bold;text-decoration: underline'>$1</span>")
		.replace(/\n(Deleted:)/g, "\n<hr><span style='font-weight:bold;text-decoration: underline'>$1</span>")
		.replace(/\n(Log:)/g, "\n<span style='font-weight:bold;text-decoration: underline'>$1</span>")
		.replace(/\n(URL:)/g, "\n<span style='font-weight:bold;text-decoration: underline'>$1</span>")
		.replace(/\n(=====.*<br>)/g, "\n<span style='color:lightgrey'>$1</span>")
		.replace(oldRevRegExp, "\n<span style='color:red;font-weight:bold'>$1</span><br>")
		.replace(newRevRegExp, "\n<span style='color:green;font-weight:bold'>$1</span><br>")
		.replace(lineIndexRegExp, "\n<span style='color:blue'>$1</span><br>")
		.replace(oldRevLineRegExp, "\n<span style='color:red'>$1</span><br>")
		.replace(newRevLineRegExp, "\n<span style='color:green'>$1</span><br>");
	}
}	

window.addEventListener('hashchange', gcolordiff);
window.addEventListener('load', gcolordiff);
