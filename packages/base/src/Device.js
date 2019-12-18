/**
 * Device and Feature Detection API: Provides information about the used browser / device and cross platform support for certain events
 * like media queries, orientation change or resizing.
 *
 * This API is independent from any other part of the UI5 framework. This allows it to be loaded beforehand, if it is needed, to create the UI5 bootstrap
 * dynamically depending on the capabilities of the browser or device.
 *
 * @namespace
 * @name Device
 */

const Device = {};

//* ******* OS Detection ********

/**
 * Contains information about the operating system of the Device.
 * @name Device.os
 */

/**
 * Enumeration containing the names of known operating systems.
 * @name Device.os.OS
 */

/**
 * The name of the operating system.
 * @name Device.os.name
 * @type String
 */

/**
 * The version of the operating system as <code>string</code>. Might be empty if no version can be determined.
 * @name Device.os.versionStr
 * @type String
 */

/**
 * The version of the operating system as <code>float</code>. Might be <code>-1</code> if no version can be determined.
 * @name Device.os.version
 * @type float
 */

/**
 * If this flag is set to <code>true</code>, a Windows operating system is used.
 * @name Device.os.windows
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, a Mac operating system is used.
 * @name Device.os.macintosh
 * @type boolean
 */

/*
 * If this flag is set to <code>true</code>, an iOS operating system is used.
 * @name Device.os.ios
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, an Android operating system is used.
 * @name Device.os.android
 * @type boolean
 */

/*
 * Windows operating system name.
 * @see Device.os.name
 * @name Device.os.OS.WINDOWS
 */

/**
 * MAC operating system name.
 * @see Device.os.name
 * @name Device.os.OS.MACINTOSH
 */

/**
 * iOS operating system name.
 * @see Device.os.name
 * @name Device.os.OS.IOS
 */

/**
 * Android operating system name.
 * @see Device.os.name
 * @name Device.os.OS.ANDROID
 */

const OS = {
	"WINDOWS": "win",
	"MACINTOSH": "mac",
	"IOS": "iOS",
	"ANDROID": "Android",
};

const _getMobileOS = () => {
	const userAgent = navigator.userAgent;

	let rPlatform, // regular expression for platform
		aMatches;

	// iOS, Android
	rPlatform = /\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[)][^\d]*)([\d.]*)\s/;
	aMatches = userAgent.match(rPlatform);

	if (aMatches) {
		const rAppleDevices = /iPhone|iPad|iPod/;

		if (aMatches[0].match(rAppleDevices)) {
			aMatches[3] = aMatches[3].replace(/_/g, ".");

			return ({
				"name": OS.IOS,
				"versionStr": aMatches[3],
			});
		}

		if (aMatches[2].match(/Android/)) {
			aMatches[2] = aMatches[2].replace(/\s/g, "");
			return ({
				"name": OS.ANDROID,
				"versionStr": aMatches[3],
			});
		}
	}

	// Firefox on Android
	rPlatform = /\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;
	aMatches = userAgent.match(rPlatform);
	if (aMatches) {
		return ({
			"name": OS.ANDROID,
			"versionStr": aMatches.length === 3 ? aMatches[2] : "",
		});
	}
};

const _getDesktopOS = () => {
	const sPlatform = navigator.platform;
	if (sPlatform.indexOf("Win") !== -1) {
		const rVersion = /Windows NT (\d+).(\d)/i; // userAgent since windows 10: Windows NT 10[...]
		const uaResult = navigator.userAgent.match(rVersion);

		return {
			"name": OS.WINDOWS,
			"versionStr": uaResult[1],
		};
	}

	if (sPlatform.indexOf("Mac") !== -1) {
		return {
			"name": OS.MACINTOSH,
			"versionStr": "",
		};
	}

	return null;
};

const _getOS = () => {
	return _getMobileOS() || _getDesktopOS();
};

const _setOS = () => {
	if (Device.os) {
		return;
	}

	Device.os = _getOS() || {};
	Device.os.OS = OS;
	Device.os.version = Device.os.versionStr ? parseFloat(Device.os.versionStr) : -1;

	if (Device.os.name) {
		Object.keys(OS).forEach(name => {
			if (OS[name] === Device.os.name) {
				Device.os[name.toLowerCase()] = true;
			}
		});
	}
};

const getOS = () => {
	if (!Device.os) {
		_setOS();
	}

	return Device.os;
};

const isAndroid = () => {
	if (!Device.os) {
		_setOS();
	}

	return !!Device.os.android;
};

//* ******* Browser Detection ********

/**
 * Contains information about the used browser.
 * @name Device.browser
 */

/**
 * Enumeration containing the names of known browsers.
 * @name Device.browser.BROWSER
 *
 * The name of the browser.
 * @name Device.browser.name
 * @type String
 */

/**
 * The version of the browser as <code>string</code>. Might be empty if no version can be determined.
 * @name Device.browser.versionStr
 * @type String
 */

/**
 * The version of the browser as <code>float</code>. Might be <code>-1</code> if no version can be determined.
 * @name Device.browser.version
 * @type float
 */

/**
 * If this flag is set to <code>true</code>, the mobile variant of the browser is used or
 * a tablet or phone device is detected. This information might not be available for all browsers.
 * @name Device.browser.mobile
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Microsoft Internet Explorer browser is used.
 * @name Device.browser.internet_explorer
 * @type boolean
 * @deprecated since 1.20, use {@link Device.browser.msie} instead.
 */

/**
 * If this flag is set to <code>true</code>, the Microsoft Internet Explorer browser is used.
 * @name Device.browser.msie
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Microsoft Edge browser is used.
 * @name Device.browser.edge
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Mozilla Firefox browser is used.
 * @name Device.browser.firefox
 */

/**
 * If this flag is set to <code>true</code>, the Google Chrome browser is used.
 * @name Device.browser.chrome
 * @type boolean
 *
 * If this flag is set to <code>true</code>, the Apple Safari browser is used.
 *
 * <b>Note:</b>
 * This flag is also <code>true</code> when the standalone (fullscreen) mode or webview is used on iOS devices.
 * Please also note the flags {@link Device.browser.fullscreen} and {@link Device.browser.webview}.
 *
 * @name Device.browser.safari
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, a browser featuring a Webkit engine is used.
 *
 * <b>Note:</b>
 * This flag is also <code>true</code> when the used browser was based on the Webkit engine, but
 * uses another rendering engine in the meantime. For example the Chrome browser started from version 28 and above
 * uses the Blink rendering engine.
 *
 * @name Device.browser.webkit
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Safari browser runs in standalone fullscreen mode on iOS.
 *
 * <b>Note:</b> This flag is only available if the Safari browser was detected. Furthermore, if this mode is detected,
 * technically not a standard Safari is used. There might be slight differences in behavior and detection, e.g.
 * the availability of {@link Device.browser.version}.
 *
 * @name Device.browser.fullscreen
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Safari browser runs in webview mode on iOS.
 *
 * <b>Note:</b> This flag is only available if the Safari browser was detected. Furthermore, if this mode is detected,
 * technically not a standard Safari is used. There might be slight differences in behavior and detection, e.g.
 * the availability of {@link Device.browser.version}.
 *
 * @name Device.browser.webview
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Phantom JS browser is used.
 * @name Device.browser.phantomJS
 * @type boolean
 */

/**
 * The version of the used Webkit engine, if available.
 * @name Device.browser.webkitVersion
 * @type String
 */

/**
 * If this flag is set to <code>true</code>, a browser featuring a Mozilla engine is used.
 * @name Device.browser.mozilla
 * @type boolean
 */

/**
 * Internet Explorer browser name.
 * @name Device.browser.BROWSER.INTERNET_EXPLORER
 */

/**
 * Edge browser name.
 * @name Device.browser.BROWSER.EDGE
 */

/**
 * Firefox browser name.
 * @name Device.browser.BROWSER.FIREFOX
 */

/**
 * Chrome browser name.
 * @name Device.browser.BROWSER.CHROME
 */

/**
 * Safari browser name.
 * @name Device.browser.BROWSER.SAFARI
 */

/**
 * Android stock browser name.
 * @name Device.browser.BROWSER.ANDROID
 */

const BROWSER = {
	"INTERNET_EXPLORER": "ie",
	"EDGE": "ed",
	"FIREFOX": "ff",
	"CHROME": "cr",
	"SAFARI": "sf",
	"ANDROID": "an",
};

/*!
* Taken from jQuery JavaScript Library v1.7.1
* http://jquery.com/
*
* Copyright 2011, John Resig
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* Includes Sizzle.js
* http://sizzlejs.com/
* Copyright 2011, The Dojo Foundation
* Released under the MIT, BSD, and GPL Licenses.
*
* Date: Mon Nov 21 21:11:03 2011 -0500
*/
const _calcBrowser = () => {
	const sUserAgent = navigator.userAgent.toLowerCase();

	const rwebkit = /(webkit)[ /]([\w.]+)/;
	const rmsie = /(msie) ([\w.]+)/;
	const rmsie11 = /(trident)\/[\w.]+;.*rv:([\w.]+)/;
	const redge = /(edge)[ /]([\w.]+)/;
	const rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

	// WinPhone IE11 and MS Edge userAgents contain "WebKit" and "Mozilla" and therefore must be checked first
	const browserMatch = redge.exec(sUserAgent)
		|| rmsie11.exec(sUserAgent)
		|| rwebkit.exec(sUserAgent)
		|| rmsie.exec(sUserAgent)
		|| (sUserAgent.indexOf("compatible") < 0 && rmozilla.exec(sUserAgent)) || [];

	const oRes = {
		browser: browserMatch[1] || "",
		version: browserMatch[2] || "0",
	};
	oRes[oRes.browser] = true;
	return oRes;
};

const _getBrowser = () => {
	const oBrowser = _calcBrowser();
	const sUserAgent = navigator.userAgent;
	const oNavigator = window.navigator;

	// jQuery checks for user agent strings. We differentiate between browsers
	let oExpMobile;
	let oResult;
	let fVersion;

	// Mozilla
	if (oBrowser.mozilla) {
		oExpMobile = /Mobile/;
		if (sUserAgent.match(/Firefox\/(\d+\.\d+)/)) {
			fVersion = parseFloat(RegExp.$1);
			oResult = {
				name: BROWSER.FIREFOX,
				versionStr: `${fVersion}`,
				version: fVersion,
				mozilla: true,
				mobile: oExpMobile.test(sUserAgent),
			};
		} else {
			// unknown mozilla browser
			oResult = {
				mobile: oExpMobile.test(sUserAgent),
				mozilla: true,
				version: -1,
			};
		}
	} else if (oBrowser.webkit) {
		// webkit version is needed for calculation if the mobile android device is a tablet (calculation of other mobile devices work without)
		const regExpWebkitVersion = sUserAgent.toLowerCase().match(/webkit[/]([\d.]+)/);
		let webkitVersion;
		if (regExpWebkitVersion) {
			webkitVersion = regExpWebkitVersion[1];
		}
		oExpMobile = /Mobile/;
		const aChromeMatch = sUserAgent.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/);
		const aFirefoxMatch = sUserAgent.match(/FxiOS\/(\d+\.\d+)/);
		const aAndroidMatch = sUserAgent.match(/Android .+ Version\/(\d+\.\d+)/);

		if (aChromeMatch || aFirefoxMatch || aAndroidMatch) {
			let sName,
				sVersion,
				bMobile;

			if (aChromeMatch) {
				sName = BROWSER.CHROME;
				bMobile = oExpMobile.test(sUserAgent);
				sVersion = parseFloat(aChromeMatch[2]);
			} else if (aFirefoxMatch) {
				sName = BROWSER.FIREFOX;
				bMobile = true;
				sVersion = parseFloat(aFirefoxMatch[1]);
			} else if (aAndroidMatch) {
				sName = BROWSER.ANDROID;
				bMobile = oExpMobile.test(sUserAgent);
				sVersion = parseFloat(aAndroidMatch[1]);
			}

			oResult = {
				name: sName,
				mobile: bMobile,
				versionStr: `${sVersion}`,
				version: sVersion,
				webkit: true,
				webkitVersion,
			};
		} else { // Safari might have an issue with sUserAgent.match(...); thus changing
			const oExp = /(Version|PhantomJS)\/(\d+\.\d+).*Safari/;
			const bStandalone = oNavigator.standalone;
			if (oExp.test(sUserAgent)) {
				const aParts = oExp.exec(sUserAgent);
				fVersion = parseFloat(aParts[2]);
				oResult = {
					name: BROWSER.SAFARI,
					versionStr: `${fVersion}`,
					fullscreen: false,
					webview: false,
					version: fVersion,
					mobile: oExpMobile.test(sUserAgent),
					webkit: true,
					webkitVersion,
					phantomJS: aParts[1] === "PhantomJS",
				};
			} else if (/iPhone|iPad|iPod/.test(sUserAgent) && !(/CriOS/.test(sUserAgent)) && !(/FxiOS/.test(sUserAgent)) && (bStandalone === true || bStandalone === false)) {
				// WebView or Standalone mode on iOS
				oResult = {
					name: BROWSER.SAFARI,
					version: -1,
					fullscreen: bStandalone,
					webview: !bStandalone,
					mobile: oExpMobile.test(sUserAgent),
					webkit: true,
					webkitVersion,
				};
			} else { // other webkit based browser
				oResult = {
					mobile: oExpMobile.test(sUserAgent),
					webkit: true,
					webkitVersion,
					version: -1,
				};
			}
		}
	} else if (oBrowser.msie || oBrowser.trident) {
		fVersion = parseFloat(oBrowser.version);

		oResult = {
			name: BROWSER.INTERNET_EXPLORER,
			versionStr: `${fVersion}`,
			version: fVersion,
			msie: true,
			mobile: false,
		};
	} else if (oBrowser.edge) {
		fVersion = parseFloat(oBrowser.version);
		oResult = {
			name: BROWSER.EDGE,
			versionStr: `${fVersion}`,
			version: fVersion,
			edge: true,
		};
	} else {
		oResult = {
			name: "",
			versionStr: "",
			version: -1,
			mobile: false,
		};
	}

	return oResult;
};

const _setBrowser = () => {
	Device.browser = _getBrowser();
	Device.browser.BROWSER = BROWSER;

	if (Device.browser.name) {
		Object.keys(BROWSER).forEach(b => {
			if (BROWSER[b] === Device.browser.name) {
				Device.browser[b.toLowerCase()] = true;
			}
		});
	}
};

const getBrowser = () => {
	if (!Device.browser) {
		_setBrowser();
	}
	return Device.browser;
};

const isIE = () => {
	if (!Device.browser) {
		_setBrowser();
	}
	return !!Device.browser.msie;
};

const isEdge = () => {
	if (!Device.browser) {
		_setBrowser();
	}
	return !!Device.browser.edge;
};

const isChrome = () => {
	if (!Device.browser) {
		_setBrowser();
	}
	return !!Device.browser.chrome;
};

const isFF = () => {
	if (!Device.browser) {
		_setBrowser();
	}
	return !!Device.browser.firefox;
};

const isSafari = () => {
	if (!Device.browser) {
		_setBrowser();
	}
	return !!Device.browser.safari;
};

//* ******* Support Detection ********

const _setSupport = () => {
	if (Device.support) {
		return;
	}

	if (!Device.browser) {
		_setBrowser();
	}

	Device.support = {};
	Device.support.touch = !!(("ontouchstart" in window) || (navigator.maxTouchPoints > 0) || (window.DocumentTouch && document instanceof window.DocumentTouch));
};

const supportTouch = () => {
	if (!Device.support) {
		_setSupport();
	}

	return !!Device.support.touch;
};

//* ******* System Detection ********

/**
 * Provides a basic categorization of the used device based on various indicators.
 *
 * <b>Note:</b> Depending on the capabilities of the device it is also possible that multiple flags are set to <code>true</code>.
 *
 * @namespace
 * @name Device.system
 */

/**
 * If this flag is set to <code>true</code>, the device is recognized as a tablet.
 *
 * <b>Note:</b> This flag is also true for some browsers on desktop devices running on Windows 8 or higher.
 * Also see the documentation for {@link Device.system.combi} devices.
 * You can use the following logic to ensure that the current device is a tablet device:
 *
 * <pre>
 * if(Device.system.tablet && !Device.system.desktop){
 *	...tablet related commands...
 * }
 * </pre>
 *
 * @name Device.system.tablet
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the device is recognized as a phone.
 *
 * @name Device.system.phone
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the device is recognized as a desktop system.
 *
 * @name Device.system.desktop
 * @type boolean
 */

/**
 * Indicates if the device is recognized as a combination of a desktop system and tablet.
 *
 * <b>Note:</b> This property is mainly for Microsoft Windows 8 (and following) devices where the mouse and touch event may be supported
 * natively by the browser being used. This property is set to <code>true</code> only when both mouse and touch event are natively supported.
 *
 * @name Device.system.combi
 * @type boolean
 */

/**
 * @name Device.system.SYSTEMTYPE
 * Enumeration containing the names of known types of the devices.
 */

const SYSTEMTYPE = {
	"TABLET": "tablet",
	"PHONE": "phone",
	"DESKTOP": "desktop",
	"COMBI": "combi",
};

const _isTablet = () => {
	const sUserAgent = navigator.userAgent;
	if (Device.os.name === Device.os.OS.IOS) {
		return /ipad/i.test(sUserAgent);
	}
	// in real mobile device
	if (supportTouch()) {
		if (Device.os.windows && Device.os.version >= 8) {
			return true;
		}

		if (Device.browser.chrome && Device.os.android && Device.os.version >= 4.4) {
			// From Android version 4.4, WebView also uses Chrome as Kernel.
			// We can use the user agent pattern defined in Chrome to do phone/tablet detection
			// According to the information here: https://developer.chrome.com/multidevice/user-agent#chrome_for_android_user_agent,
			//  the existence of "Mobile" indicates it's a phone. But because the crosswalk framework which is used in Fiori Client
			//  inserts another "Mobile" to the user agent for both tablet and phone, we need to check whether "Mobile Safari/<Webkit Rev>" exists.
			return !/Mobile Safari\/[.0-9]+/.test(sUserAgent);
		}
		let densityFactor = window.devicePixelRatio ? window.devicePixelRatio : 1; // may be undefined in Windows Phone devices
		// On Android sometimes window.screen.width returns the logical CSS pixels, sometimes the physical device pixels;
		// Tests on multiple devices suggest this depends on the Webkit version.
		// The Webkit patch which changed the behavior was done here: https://bugs.webkit.org/show_bug.cgi?id=106460
		// Chrome 27 with Webkit 537.36 returns the logical pixels,
		// Chrome 18 with Webkit 535.19 returns the physical pixels.
		// The BlackBerry 10 browser with Webkit 537.10+ returns the physical pixels.
		// So it appears like somewhere above Webkit 537.10 we do not hve to divide by the devicePixelRatio anymore.
		if (Device.os.android && Device.browser.webkit && (parseFloat(Device.browser.webkitVersion) > 537.10)) {
			densityFactor = 1;
		}

		// this is how android distinguishes between tablet and phone
		// http://android-developers.blogspot.de/2011/07/new-tools-for-managing-screen-sizes.html
		const bTablet = (Math.min(window.screen.width / densityFactor, window.screen.height / densityFactor) >= 600);

		// special workaround for Nexus 7 where the window.screen.width is 600px or 601px in portrait mode (=> tablet)
		// but window.screen.height 552px in landscape mode (=> phone), because the browser UI takes some space on top.
		// So the detected device type depends on the orientation :-(
		// actually this is a Chrome bug, as "width"/"height" should return the entire screen's dimensions and
		// "availWidth"/"availHeight" should return the size available after subtracting the browser UI

		/*
				if (isLandscape() &&
					(window.screen.height === 552 || window.screen.height === 553) // old/new Nexus 7
					&&
					(/Nexus 7/i.test(sUserAgent))) {
					bTablet = true;
				}
				*/

		return bTablet;
	}
	// This simple android phone detection can be used here because this is the mobile emulation mode in desktop browser
	const bAndroidPhone = (/(?=android)(?=.*mobile)/i.test(sUserAgent));
	// in desktop browser, it's detected as tablet when
	// 1. Windows 8 device with a touch screen where "Touch" is contained in the userAgent
	// 2. Android emulation and it's not an Android phone
	return (Device.browser.msie && sUserAgent.indexOf("Touch") !== -1) || (Device.os.android && !bAndroidPhone);
};

const _getSystem = () => {
	const bTabletDetected = _isTablet();
	const isWin8Upwards = Device.os.windows && Device.os.version >= 8;

	const oSystem = {};
	oSystem.tablet = !!((Device.support.touch || isWin8Upwards) && bTabletDetected);
	oSystem.phone = !!((Device.os.windows_phone || (Device.support.touch)) && !bTabletDetected);
	oSystem.desktop = !!((!oSystem.tablet && !oSystem.phone) || isWin8Upwards);
	oSystem.combi = oSystem.desktop && oSystem.tablet;
	oSystem.SYSTEMTYPE = SYSTEMTYPE;

	return oSystem;
};

const _setSystem = () => {
	_setSupport();
	_setOS();

	Device.system = {};
	Device.system = _getSystem();
	if (Device.system.tablet || Device.system.phone) {
		Device.browser.mobile = true;
	}
};

const getSystem = () => {
	if (!Device.system) {
		_setSystem();
	}

	return Device.system;
};

const isDesktop = () => {
	if (!Device.system) {
		_setSystem();
	}

	return Device.system.desktop;
};

const isTablet = () => {
	if (!Device.system) {
		_setSystem();
	}

	return Device.system.tablet;
};

const isPhone = () => {
	if (!Device.system) {
		_setSystem();
	}

	return Device.system.phone;
};

const isMobile = () => {
	if (!Device.system) {
		_setSystem();
	}

	return Device.browser.mobile;
};

export {
	isIE,
	isEdge,
	isChrome,
	isFF,
	isSafari,
	isMobile,
	isDesktop,
	isTablet,
	isPhone,
	isAndroid,
	getOS,
	getSystem,
	getBrowser,
	supportTouch,
};
