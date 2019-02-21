import Device from "@ui5/webcomponents-core/dist/sap/ui/Device";

const setupOS = node => {
	node.dataset.sapUiOs = Device.os.name + Device.os.versionStr;

	let osCSS = null;
	switch (Device.os.name) {
	case Device.os.OS.IOS:
		osCSS = "sap-ios";
		break;
	case Device.os.OS.ANDROID:
		osCSS = "sap-android";
		break;
	case Device.os.OS.BLACKBERRY:
		osCSS = "sap-bb";
		break;
	case Device.os.OS.WINDOWS_PHONE:
		osCSS = "sap-winphone";
		break;
	}
	if (osCSS) {
		node.classList.add(osCSS);
	}
};

export default setupOS;
