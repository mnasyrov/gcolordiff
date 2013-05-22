(function($) {

	/**
	* @function
	* @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
	* @param {function} handler A function to execute at the time when the element is inserted
	* @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
	* @example $(selector).waitUntilExists(function);
	*/

	$.fn.waitUntilExists = function (handler, shouldRunHandlerOnce, isChild) {
		var found = 'found';
		var $this = $(this.selector);
		var $elements = $this.not(function() { return $(this).data(found); }).each(handler); //.data(found, true);

		if (!isChild){
	    	(window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
				window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce, true); }, 500);
		}
		else if (shouldRunHandlerOnce && $elements.length) {
			window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
		}

		return $this;
	}


	function colordiff() {
		var $div = $(this)[0];
		if ($(div).hasClass('gcolordiff-message')) {
			return;
		}

		var div = $(this)[0];
		if (div) {
			var html = div.innerHTML;
			if (!isDiffMessage(html)) {
				return;
			}

			$(div).addClass('gcolordiff-message');
			
			var oldRevRegExp = /\n(--- .*)(<br\/?>)/g;
			var newRevRegExp = /\n(\+\+\+ .*)(<br\/?>)/g;
			var lineIndexRegExp = /\n(@@.*@@)/g;
			var oldRevLineRegExp = /\n(-.*)(<br\/?>)/g;
			var newRevLineRegExp = /\n(\+.*)(<br\/?>)/g;
			
			html = html
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
			
			div.innerHTML = html;
		}
	}	

	function isDiffMessage(str) {
		return str && (str.indexOf('- Log -------------') >= 0 || str.indexOf('Changes diff:') >= 0 || str.indexOf('diff --git') >= 0);
	}

	$(function() {
		$('.ii.gt, .message, .msg').waitUntilExists(colordiff);
	})


})(jQuery);
