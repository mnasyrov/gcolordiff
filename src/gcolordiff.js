(function() {
	function gcolordiff() {
		var div = getMessageContainer();
		if (div && isDiffMessage(div.innerText)) {
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

	function getMessageContainer() {
		var elements = document.getElementsByClassName("ii gt");
		if (elements.length == 0) {
			elements = document.getElementsByClassName("message");
		}
		if (elements.length > 0) {
		    return elements[0];
	    }
	    return null;
	}

	function isDiffMessage(str) {
		return str && (str.indexOf('- Log -------------') >= 0 || str.indexOf('Changes diff:') >= 0);
	}

	window.addEventListener('hashchange', gcolordiff);
	window.addEventListener('load', gcolordiff);
})();