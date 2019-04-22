import { getBrowser } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";

const setupBrowser = node => {
	const b = getBrowser();
	let id = b.name;

	if (id) {
		if (id === b.BROWSER.SAFARI && b.mobile) {
			id = `m${id}`;
		}
		id += (b.version === -1 ? "" : Math.floor(b.version));
		node.dataset.sapUiBrowser = id;
	}
};

export default setupBrowser;
