import Configuration from "@ui5/webcomponents-core/dist/sap/ui/core/Configuration";

function readConfiguration() {
	function normalize(o) {
		for (const i in o) { // eslint-disable-line
			const v = o[i];
			const il = i.toLowerCase();
			if (!o.hasOwnProperty(il)) { // eslint-disable-line
				o[il] = v;
				delete o[i];
			}
		}
		return o;
	}

	const jsonConfig = document.querySelector("[data-id='sap-ui-config']");
	if (jsonConfig && jsonConfig.type === "application/json") {
		return normalize(JSON.parse(jsonConfig.innerHTML));
	}
	return {};
}

window["sap-ui-config"] = readConfiguration();
const configuration = new Configuration();

if (configuration.getTheme() === "base") {
	configuration._setTheme("sap_fiori_3");
}

export default configuration;
