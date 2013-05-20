(function() {

	var style = 
		'<style type="text/css"> ' +
		'.gcolordiff-message { font-family: monospace; }' +

		'.gcolordiff-summary-author, .gcolordiff-summary-date, .gcolordiff-summary-newrevision, ' +
		'.gcolordiff-summary-modified, .gcolordiff-summary-added, .gcolordiff-summary-deleted, ' +
		'.gcolordiff-summary-log, .gcolordiff-summary-url ' + 
		'{ font-weight: bold; text-decoration: underline; } ' +

		'.gcolordiff-summary-separator { color: lightgrey; } ' + 

		'.gcolordiff-diff-oldrev { color:red;font-weight:bold } ' + 
		'.gcolordiff-diff-newrev { color:green;font-weight:bold } ' +
		'.gcolordiff-diff-lineindex { color: blue; } ' +
		'.gcolordiff-diff-oldline { color: red; } ' +
		'.gcolordiff-diff-newline { color: green; } ' +
		'</style>';

	function gcolordiff() {
		var div = getMessageContainer();
		if (div && isDiffMessage(div.innerText)) {
			div.parentNode.style.fontFamily = "monospace";
			
			var oldRevRegExp = /\n(--- .*)(<br\/?>)/g;
			var newRevRegExp = /\n(\+\+\+ .*)(<br\/?>)/g;
			var lineIndexRegExp = /\n(@@.*@@)/g;
			var oldRevLineRegExp = /\n(-.*)(<br\/?>)/g;
			var newRevLineRegExp = /\n(\+.*)(<br\/?>)/g;

			div.innerHTML = div.innerHTML
			.replace(/(Author:)/g, '\n<span class="gcolordiff-summary-author">$1</span>')
			.replace(/\n(Date:)/g, '\n<span class="gcolordiff-summary-date">$1</span>')
			.replace(/\n(New Revision:)/g, '\n<span class="gcolordiff-summary-newrevision">$1</span>')
			.replace(/\n(Modified:)/g, '\n<hr/><span class="gcolordiff-summary-modified">$1</span>')
			.replace(/\n(Added:)/g, '\n<hr><span class="gcolordiff-summary-added">$1</span>')
			.replace(/\n(Deleted:)/g, '\n<hr><span class="gcolordiff-summary-deleted">$1</span>')
			.replace(/\n(Log:)/g, '\n<span class="gcolordiff-summary-log">$1</span>')
			.replace(/\n(URL:)/g, '\n<span class="gcolordiff-summary-url">$1</span>')
			.replace(/\n(=====.*<br>)/g, '\n<span class="gcolordiff-summary-separator">$1</span>')
			.replace(oldRevRegExp, '\n<span class="gcolordiff-diff-oldrev">$1</span>$2')
			.replace(newRevRegExp, '\n<span class="gcolordiff-diff-newrev">$1</span>$2')
			.replace(lineIndexRegExp, '\n<span class="gcolordiff-diff-lineindex">$1</span>')
			.replace(oldRevLineRegExp, '\n<span class="gcolordiff-diff-oldline">$1</span>$2')
			.replace(newRevLineRegExp, '\n<span class="gcolordiff-diff-newline">$1</span>$2');
		}
	}	

	function getMessageContainer() {
		var elements = document.getElementsByClassName("ii gt");
		if (elements.length == 0) {
			elements = document.getElementsByClassName("message");
		}
		if (elements.length == 0) {
			elements = document.getElementsByClassName("msg");
		}
		if (elements.length > 0) {
		    return elements[0];
	    }
	    return null;
	}

	function isDiffMessage(str) {
		return str && (str.indexOf('- Log -------------') >= 0 || str.indexOf('Changes diff:') >= 0 || str.indexOf('diff --git') >= 0);
	}

	function handler() {
		setTimeout(gcolordiff, 1000);
	}

	window.addEventListener('hashchange', handler);
	window.addEventListener('load', handler);
	document.addEventListener('DOMContentLoaded', handler);

	$(function() {
		$('head').append(style);
	})
})();
