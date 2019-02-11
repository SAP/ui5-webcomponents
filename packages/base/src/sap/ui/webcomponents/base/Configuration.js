import Configuration from "@ui5/webcomponents-core/dist/sap/ui/core/Configuration";

function readConfiguration() {
	function normalize(o) {
		for (var i in o) {
			var v = o[i];
			var il = i.toLowerCase();
			if ( !o.hasOwnProperty(il) ) {
				o[il] = v;
				delete o[i];
			}
		}
		return o;
	}

	var jsonConfig = document.querySelector("[data-id='sap-ui-config']");
	if (jsonConfig && jsonConfig.type === "application/json") {
		return normalize(JSON.parse(jsonConfig.innerHTML));
	}
	return {};
}

window['sap-ui-config'] = readConfiguration();
const configuration = new Configuration();

if (configuration.getTheme() === "base") {
	configuration._setTheme("sap_fiori_3");
}

export default configuration;