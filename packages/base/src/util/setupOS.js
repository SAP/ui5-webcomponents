import { getOS } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";

const setupOS = node => {
	let osCSS = null;
	const osInfo = getOS();
	const osName = osInfo.name;

	node.dataset.sapUiOs = osName + osInfo.versionStr;

	if (osName === osInfo.OS.IOS) {
		osCSS = "sap-ios";
	} else if (osName === osInfo.OS.ANDROID) {
		osCSS = "sap-android";
	}

	if (osCSS) {
		node.classList.add(osCSS);
	}
};

export default setupOS;
