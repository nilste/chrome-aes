
// Replace long URL path with the ASIN path
chrome.storage.sync.get('removeParams', function(result) {
	if (result.removeParams === true) {
		const asinElement = document.querySelector(`
			#ASIN,
			input[name="idx.asin"],
			input[name="ASIN.0"],
			input[name="titleID"]
		`);

		if (asinElement !== null) {
			window.history.replaceState(null, '', `/dp/${asinElement.value}`);
		}
	}
});

/* -------------------------------------------------------------------------- */

let searchPatterns = [];

chrome.storage.sync.get('removeShipping', function(result) {
	if (result.removeShipping === true) {
		searchPatterns.push('[aria-label$="kr frakt"]');
	}
});

// Remove search results
const mutationObserver = new MutationObserver(function(mutations){
	if (searchPatterns.length > 0) {
		const products = document.querySelectorAll('div[data-asin');
		for (const product of products) {
			for (const pattern of searchPatterns) {
				if (product.querySelector(pattern) !== null) {
					product.remove();
					break;
				}
			}
		}
	}
});

// Create search observer
const observeElement = document.querySelector('.s-desktop-content');
if (observeElement) {
	mutationObserver.observe(
		observeElement,
		{ childList: true, subtree: true }
	);
}

/* -------------------------------------------------------------------------- */
