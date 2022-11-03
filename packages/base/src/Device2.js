const ua = navigator.userAgent;
const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
const ie = /(msie|trident)/i.test(ua);
const chrome = !ie && /(Chrome|CriOS)/.test(ua);
const safari = !ie && !chrome && /(Version|PhantomJS)\/(\d+\.\d+).*Safari/.test(ua);
const webkit = !ie && /webkit/.test(ua);
const windows = navigator.platform.indexOf("Win") !== -1;
const iOS = navigator.platform.match(/iPhone|iPad|iPod/) || (navigator.userAgent.match(/Mac/) && "ontouchend" in document);
const android = !windows && /Android/.test(ua);
const androidPhone = android && /(?=android)(?=.*mobile)/i.test(ua);
const ipad = /ipad/i.test(ua) || (/Macintosh/i.test(ua) && "ontouchend" in document);
// With iOS 13 the string 'iPad' was removed from the user agent string through a browser setting, which is applied on all sites by default:
// "Request Desktop Website -> All websites" (for more infos see: https://forums.developer.apple.com/thread/119186).
// Therefore the OS is detected as MACINTOSH instead of iOS and the device is a tablet if the Device.support.touch is true.

let windowsVersion;
let webkitVersion;
let tablet;

const isWindows8OrAbove = () => {
	if (!windows) {
		return false;
	}

	if (windowsVersion === undefined) {
		const matches = ua.match(/Windows NT (\d+).(\d)/);
		windowsVersion = matches ? parseFloat(matches[1]) : 0;
	}

	return windowsVersion >= 8;
};

const isWebkit537OrAbove = () => {
	if (!webkit) {
		return false;
	}

	if (webkitVersion === undefined) {
		const matches = ua.match(/(webkit)[ /]([\w.]+)/);
		webkitVersion = matches ? parseFloat(matches[1]) : 0;
	}

	return webkitVersion >= 537.10;
};

const detectTablet = () => {
	if (tablet !== undefined) {
		return;
	}

	if (ipad) {
		tablet = true;
		return;
	}

	if (touch) {
		if (isWindows8OrAbove()) {
			tablet = true;
			return;
		}

		if (chrome && android) {
			tablet = !/Mobile Safari\/[.0-9]+/.test(ua);
			return;
		}

		let densityFactor = window.devicePixelRatio ? window.devicePixelRatio : 1; // may be undefined in Windows Phone devices
		if (android && isWebkit537OrAbove()) {
			densityFactor = 1;
		}

		tablet = (Math.min(window.screen.width / densityFactor, window.screen.height / densityFactor) >= 600);
		return;
	}

	tablet = (ie && ua.indexOf("Touch") !== -1) || (android && !androidPhone);
};

const supportsTouch = () => touch;
const isIE = () => ie;
const isSafari = () => safari;
const isChrome = () => chrome;

const isTablet = () => {
	detectTablet();
	return (touch || isWindows8OrAbove()) && tablet;
};

const isPhone = () => {
	detectTablet();
	return touch && !tablet;
};

const isDesktop = () => {
	return (!isTablet() && !isPhone()) || isWindows8OrAbove();
};

const isCombi = () => {
	return isTablet() && isDesktop();
};

const isIOS = () => {
	return iOS;
};

const isAndroid = () => {
	return android || androidPhone;
};

export {
	supportsTouch,
	isIE,
	isSafari,
	isChrome,
	isPhone,
	isTablet,
	isDesktop,
	isCombi,
	isIOS,
	isAndroid,
};
