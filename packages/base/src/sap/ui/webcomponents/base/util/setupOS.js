import Device from "@ui5/webcomponents-core/dist/sap/ui/Device";

const setupOS = () => {
	var html = document.documentElement;

	html.dataset.sapUiOs = Device.os.name + Device.os.versionStr;

	var osCSS = null;
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
		html.classList.add(osCSS);
	}
};

export default setupOS;