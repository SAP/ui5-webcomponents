const whenDOMReady = _ => {
	return new Promise(function (resolve, reject) {
		if (document.body) {
			resolve();
		} else {
			document.addEventListener("DOMContentLoaded", function () {
				resolve();
			});
		}
	});
};

export default whenDOMReady;