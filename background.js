
// Store settings when installing the plugin
chrome.runtime.onInstalled.addListener(() => {
	const settings = {
		removeParams: true,
		removeShipping: true
	};

	chrome.storage.sync.set(settings);
});
