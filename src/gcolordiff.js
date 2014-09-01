(function () {
	"use strict";

	var regexps = null;

	function colordiff(div) {
		if (!div || div.classList.contains("gcolordiff-message")) {
			return;
		}
		var html = div.innerHTML;
		if (!isDiffMessage(html)) {
			return;
		}

		div.classList.add("gcolordiff-message");

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
			};
		}

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

	function isDiffMessage(str) {
		return str && (str.indexOf('- Log -------------') >= 0 || str.indexOf('Changes diff:') >= 0 || str.indexOf('diff --git') >= 0);
	}

	function scanNodes(nodeList, callback) {
		if (nodeList) {
			for (var i = 0; i < nodeList.length; i++) {
				var node = nodeList[i];
				if (node.nodeType == 1) {
					if (node.classList && node.classList.contains("a3s")) {
						callback(node);
					} else if (node.querySelector) {
						scanNodes(node.querySelectorAll(".ii.gt .a3s"), callback);
					}
				}
			}
		}
	}

	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			scanNodes(mutation.addedNodes, colordiff);
		});
	});
	observer.observe(document.body, {
		childList: true, subtree: true, attributes: false, characterData: false
	});


})();
