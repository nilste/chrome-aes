
function save_options() {
	const removeParams = document.getElementById('remove-params').checked;
	const removeShipping = document.getElementById('remove-shipping').checked;
	
	chrome.storage.sync.set({
		removeParams: removeParams,
		removeShipping: removeShipping
	}, function() {});
}
document.getElementById('remove-params').addEventListener('click', save_options);
document.getElementById('remove-shipping').addEventListener('click', save_options);

function restore_options() {
	chrome.storage.sync.get({
		removeParams: true,
		removeShipping: true,
	}, function(settings) {
		document.getElementById('remove-params').checked = settings.removeParams;
		document.getElementById('remove-shipping').checked = settings.removeShipping;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
