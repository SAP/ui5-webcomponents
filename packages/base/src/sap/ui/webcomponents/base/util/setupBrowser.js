import Device from "@ui5/webcomponents-core/dist/sap/ui/Device";

const setupBrowser = () => {
	var html = document.documentElement;

	var b = Device.browser;
	var id = b.name;

	if (id) {
		if (id === b.BROWSER.SAFARI && b.mobile) {
			id = "m" + id;
		}
		id = id + (b.version === -1 ? "" : Math.floor(b.version));
		html.dataset.sapUiBrowser = id;
	}
};

export default setupBrowser;