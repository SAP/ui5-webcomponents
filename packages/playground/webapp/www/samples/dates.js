(function() {
	const getFormatterInstance = window["sap-ui-webcomponents-main-bundle"].getFormatterInstance;
	getFormatterInstance({
		style: "short"
	}).then(formatter => {
		var dp = document.getElementById('myDatepicker1');
		dp.setAttribute('value', formatter.format(new Date()));
	});
})();