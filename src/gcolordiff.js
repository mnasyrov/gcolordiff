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

	var regexps = null;

	function colordiff() {
		var div = this;
		if ($(div).hasClass('gcolordiff-message')) {
			return;
		}
		if (div) {
			var html = div.innerHTML;
			if (!isDiffMessage(html)) {
				return;
			}

			if (!regexps) {
				regexps = {
					summaryAuthor: /(Author:)/g,
					summaryDate: /\n(Date:)/g,
					summaryNewRevision: /\n(New Revision:)/g,
					summaryModified: /\n(Modified:)/g,
					summaryAdded: /\n(Added:)/g,
					summaryDeleted: /\n(Deleted:)/g,
					summaryLog: /\n(Log:)/g,
					summaryUrl: /\n(URL:)/g,
					summarySeparator: /\n(=====.*<br>)/g,
					diffOldRev: /\n(--- .*)(<br\/?>)/g,
					diffNewRev: /\n(\+\+\+ .*)(<br\/?>)/g,
					diffLineIndex: /\n(@@.*@@)/g,
					diffOldLine: /\n(-.*)(<br\/?>)/g,
					diffNewLine: /\n(\+.*)(<br\/?>)/g
				}
				console.log(1)
			}

			$(div).addClass('gcolordiff-message');
			
			html = html
			.replace(regexps.summaryAuthor, '\n<span class="gcolordiff-summary-author">$1</span>')
			.replace(regexps.summaryDate, '\n<span class="gcolordiff-summary-date">$1</span>')
			.replace(regexps.summaryNewRevision, '\n<span class="gcolordiff-summary-newrevision">$1</span>')
			.replace(regexps.summaryModified, '\n<hr/><span class="gcolordiff-summary-modified">$1</span>')
			.replace(regexps.summaryAdded, '\n<hr><span class="gcolordiff-summary-added">$1</span>')
			.replace(regexps.summaryDeleted, '\n<hr><span class="gcolordiff-summary-deleted">$1</span>')
			.replace(regexps.summaryLog, '\n<span class="gcolordiff-summary-log">$1</span>')
			.replace(regexps.summaryUrl, '\n<span class="gcolordiff-summary-url">$1</span>')
			.replace(regexps.summarySeparator, '\n<span class="gcolordiff-summary-separator">$1</span>')
			.replace(regexps.diffOldRev, '\n<span class="gcolordiff-diff-oldrev">$1</span>$2')
			.replace(regexps.diffNewRev, '\n<span class="gcolordiff-diff-newrev">$1</span>$2')
			.replace(regexps.diffLineIndex, '\n<span class="gcolordiff-diff-lineindex">$1</span>')
			.replace(regexps.diffOldLine, '\n<span class="gcolordiff-diff-oldline">$1</span>$2')
			.replace(regexps.diffNewLine, '\n<span class="gcolordiff-diff-newline">$1</span>$2');
			
			div.innerHTML = html;
		}
	}	

	function isDiffMessage(str) {
		return str && (str.indexOf('- Log -------------') >= 0 || str.indexOf('Changes diff:') >= 0 || str.indexOf('diff --git') >= 0);
	}

	$(function() {
		$('.ii.gt .a3s').waitUntilExists(colordiff);
	})


})(jQuery);
