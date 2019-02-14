/*!
* UI development toolkit for HTML5 (OpenUI5)
* (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
* Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/

/**
 * Device and Feature Detection API: Provides information about the used browser / device and cross platform support for certain events
 * like media queries, orientation change or resizing.
 *
 * This API is independent from any other part of the UI5 framework. This allows it to be loaded beforehand, if it is needed, to create the UI5 bootstrap
 * dynamically depending on the capabilities of the browser or device.
 *
 * @version 1.61.2
 * @namespace
 * @name sap.ui.Device
 * @public
 */

/*global console */


var Device = {};



//******** OS Detection ********

/**
 * Contains information about the operating system of the Device.
 *
 * @namespace
 * @name sap.ui.Device.os
 * @public
 */
/**
 * Enumeration containing the names of known operating systems.
 *
 * @namespace
 * @name sap.ui.Device.os.OS
 * @public
 */
/**
 * The name of the operating system.
 *
 * @see sap.ui.Device.os.OS
 * @name sap.ui.Device.os.name
 * @type String
 * @public
 */
/**
 * The version of the operating system as <code>string</code>.
 *
 * Might be empty if no version can be determined.
 *
 * @name sap.ui.Device.os.versionStr
 * @type String
 * @public
 */
/**
 * The version of the operating system as <code>float</code>.
 *
 * Might be <code>-1</code> if no version can be determined.
 *
 * @name sap.ui.Device.os.version
 * @type float
 * @public
 */
/**
 * If this flag is set to <code>true</code>, a Windows operating system is used.
 *
 * @name sap.ui.Device.os.windows
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, a Linux operating system is used.
 *
 * @name sap.ui.Device.os.linux
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, a Mac operating system is used.
 *
 * @name sap.ui.Device.os.macintosh
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, an iOS operating system is used.
 *
 * @name sap.ui.Device.os.ios
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, an Android operating system is used.
 *
 * @name sap.ui.Device.os.android
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, a Blackberry operating system is used.
 *
 * @name sap.ui.Device.os.blackberry
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, a Windows Phone operating system is used.
 *
 * @name sap.ui.Device.os.windows_phone
 * @type boolean
 * @public
 */

/**
 * Windows operating system name.
 *
 * @see sap.ui.Device.os.name
 * @name sap.ui.Device.os.OS.WINDOWS
 * @public
 */
/**
 * MAC operating system name.
 *
 * @see sap.ui.Device.os.name
 * @name sap.ui.Device.os.OS.MACINTOSH
 * @public
 */
/**
 * Linux operating system name.
 *
 * @see sap.ui.Device.os.name
 * @name sap.ui.Device.os.OS.LINUX
 * @public
 */
/**
 * iOS operating system name.
 *
 * @see sap.ui.Device.os.name
 * @name sap.ui.Device.os.OS.IOS
 * @public
 */
/**
 * Android operating system name.
 *
 * @see sap.ui.Device.os.name
 * @name sap.ui.Device.os.OS.ANDROID
 * @public
 */
/**
 * Blackberry operating system name.
 *
 * @see sap.ui.Device.os.name
 * @name sap.ui.Device.os.OS.BLACKBERRY
 * @public
 */
/**
 * Windows Phone operating system name.
 *
 * @see sap.ui.Device.os.name
 * @name sap.ui.Device.os.OS.WINDOWS_PHONE
 * @public
 */

var OS = {
    "WINDOWS": "win",
    "MACINTOSH": "mac",
    "LINUX": "linux",
    "IOS": "iOS",
    "ANDROID": "Android",
    "BLACKBERRY": "bb",
    "WINDOWS_PHONE": "winphone"
};

function getOS(userAgent) { // may return null!!

    userAgent = userAgent || navigator.userAgent;

    var rPlatform, // regular expression for platform
        aMatches;

    function getDesktopOS() {
        var sPlatform = navigator.platform;
        if (sPlatform.indexOf("Win") != -1) {
            // userAgent in windows 7 contains: windows NT 6.1
            // userAgent in windows 8 contains: windows NT 6.2 or higher
            // userAgent since windows 10: Windows NT 10[...]
            var rVersion = /Windows NT (\d+).(\d)/i;
            var uaResult = userAgent.match(rVersion);
            var sVersionStr = "";
            if (uaResult[1] == "6") {
                if (uaResult[2] == 1) {
                    sVersionStr = "7";
                } else if (uaResult[2] > 1) {
                    sVersionStr = "8";
                }
            } else {
                sVersionStr = uaResult[1];
            }
            return {
                "name": OS.WINDOWS,
                "versionStr": sVersionStr
            };
        } else if (sPlatform.indexOf("Mac") != -1) {
            return {
                "name": OS.MACINTOSH,
                "versionStr": ""
            };
        } else if (sPlatform.indexOf("Linux") != -1) {
            return {
                "name": OS.LINUX,
                "versionStr": ""
            };
        }
        oLogger.log(INFO, "OS detection returned no result");
        return null;
    }

    // Windows Phone. User agent includes other platforms and therefore must be checked first:
    rPlatform = /Windows Phone (?:OS )?([\d.]*)/;
    aMatches = userAgent.match(rPlatform);
    if (aMatches) {
        return ({
            "name": OS.WINDOWS_PHONE,
            "versionStr": aMatches[1]
        });
    }

    // BlackBerry 10:
    if (userAgent.indexOf("(BB10;") > 0) {
        rPlatform = /\sVersion\/([\d.]+)\s/;
        aMatches = userAgent.match(rPlatform);
        if (aMatches) {
            return {
                "name": OS.BLACKBERRY,
                "versionStr": aMatches[1]
            };
        } else {
            return {
                "name": OS.BLACKBERRY,
                "versionStr": '10'
            };
        }
    }

    // iOS, Android, BlackBerry 6.0+:
    rPlatform = /\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[\)][^\d]*)([\d.]*)\s/;
    aMatches = userAgent.match(rPlatform);
    if (aMatches) {
        var rAppleDevices = /iPhone|iPad|iPod/;
        var rBbDevices = /PlayBook|BlackBerry/;
        if (aMatches[0].match(rAppleDevices)) {
            aMatches[3] = aMatches[3].replace(/_/g, ".");
            //result[1] contains info of devices
            return ({
                "name": OS.IOS,
                "versionStr": aMatches[3]
            });
        } else if (aMatches[2].match(/Android/)) {
            aMatches[2] = aMatches[2].replace(/\s/g, "");
            return ({
                "name": OS.ANDROID,
                "versionStr": aMatches[3]
            });
        } else if (aMatches[0].match(rBbDevices)) {
            return ({
                "name": OS.BLACKBERRY,
                "versionStr": aMatches[4]
            });
        }
    }

    //Firefox on Android
    rPlatform = /\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;
    aMatches = userAgent.match(rPlatform);
    if (aMatches) {
        return ({
            "name": OS.ANDROID,
            "versionStr": aMatches.length == 3 ? aMatches[2] : ""
        });
    }

    // Desktop
    return getDesktopOS();
}

function setOS(customUA) {
    Device.os = getOS(customUA) || {};
    Device.os.OS = OS;
    Device.os.version = Device.os.versionStr ? parseFloat(Device.os.versionStr) : -1;

    if (Device.os.name) {
        for (var name in OS) {
            if (OS[name] === Device.os.name) {
                Device.os[name.toLowerCase()] = true;
            }
        }
    }
}
setOS();
// expose for unit test
Device._setOS = setOS;



//******** Browser Detection ********

/**
 * Contains information about the used browser.
 *
 * @namespace
 * @name sap.ui.Device.browser
 * @public
 */

/**
 * Enumeration containing the names of known browsers.
 *
 * @namespace
 * @name sap.ui.Device.browser.BROWSER
 * @public
 */

/**
 * The name of the browser.
 *
 * @see sap.ui.Device.browser.BROWSER
 * @name sap.ui.Device.browser.name
 * @type String
 * @public
 */
/**
 * The version of the browser as <code>string</code>.
 *
 * Might be empty if no version can be determined.
 *
 * @name sap.ui.Device.browser.versionStr
 * @type String
 * @public
 */
/**
 * The version of the browser as <code>float</code>.
 *
 * Might be <code>-1</code> if no version can be determined.
 *
 * @name sap.ui.Device.browser.version
 * @type float
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the mobile variant of the browser is used or
 * a tablet or phone device is detected.
 *
 * <b>Note:</b> This information might not be available for all browsers.
 *
 * @name sap.ui.Device.browser.mobile
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the Microsoft Internet Explorer browser is used.
 *
 * @name sap.ui.Device.browser.internet_explorer
 * @type boolean
 * @deprecated since 1.20, use {@link sap.ui.Device.browser.msie} instead.
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the Microsoft Internet Explorer browser is used.
 *
 * @name sap.ui.Device.browser.msie
 * @type boolean
 * @since 1.20.0
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the Microsoft Edge browser is used.
 *
 * @name sap.ui.Device.browser.edge
 * @type boolean
 * @since 1.30.0
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the Mozilla Firefox browser is used.
 *
 * @name sap.ui.Device.browser.firefox
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the Google Chrome browser is used.
 *
 * @name sap.ui.Device.browser.chrome
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the Apple Safari browser is used.
 *
 * <b>Note:</b>
 * This flag is also <code>true</code> when the standalone (fullscreen) mode or webview is used on iOS devices.
 * Please also note the flags {@link sap.ui.Device.browser.fullscreen} and {@link sap.ui.Device.browser.webview}.
 *
 * @name sap.ui.Device.browser.safari
 * @type boolean
 * @public
 */

/**
 * If this flag is set to <code>true</code>, a browser featuring a Webkit engine is used.
 *
 * <b>Note:</b>
 * This flag is also <code>true</code> when the used browser was based on the Webkit engine, but
 * uses another rendering engine in the meantime. For example the Chrome browser started from version 28 and above
 * uses the Blink rendering engine.
 *
 * @name sap.ui.Device.browser.webkit
 * @type boolean
 * @since 1.20.0
 * @public
 */

/**
 * If this flag is set to <code>true</code>, a browser featuring a Blink rendering engine is used.
 *
 * @name sap.ui.Device.browser.blink
 * @type boolean
 * @since 1.56.0
 * @public
 */

/**
 * If this flag is set to <code>true</code>, the Safari browser runs in standalone fullscreen mode on iOS.
 *
 * <b>Note:</b> This flag is only available if the Safari browser was detected. Furthermore, if this mode is detected,
 * technically not a standard Safari is used. There might be slight differences in behavior and detection, e.g.
 * the availability of {@link sap.ui.Device.browser.version}.
 *
 * @name sap.ui.Device.browser.fullscreen
 * @type boolean
 * @since 1.31.0
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the Safari browser runs in webview mode on iOS.
 *
 * <b>Note:</b> This flag is only available if the Safari browser was detected. Furthermore, if this mode is detected,
 * technically not a standard Safari is used. There might be slight differences in behavior and detection, e.g.
 * the availability of {@link sap.ui.Device.browser.version}.
 *
 * @name sap.ui.Device.browser.webview
 * @type boolean
 * @since 1.31.0
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the Phantom JS browser is used.
 *
 * @name sap.ui.Device.browser.phantomJS
 * @type boolean
 * @private
 */
/**
 * The version of the used Webkit engine, if available.
 *
 * @see sap.ui.Device.browser.webkit
 * @name sap.ui.Device.browser.webkitVersion
 * @type String
 * @since 1.20.0
 * @private
 */
/**
 * If this flag is set to <code>true</code>, a browser featuring a Mozilla engine is used.
 *
 * @name sap.ui.Device.browser.mozilla
 * @type boolean
 * @since 1.20.0
 * @public
 */
/**
 * Internet Explorer browser name.
 *
 * @see sap.ui.Device.browser.name
 * @name sap.ui.Device.browser.BROWSER.INTERNET_EXPLORER
 * @public
 */
/**
 * Edge browser name.
 *
 * @see sap.ui.Device.browser.name
 * @name sap.ui.Device.browser.BROWSER.EDGE
 * @since 1.28.0
 * @public
 */
/**
 * Firefox browser name.
 *
 * @see sap.ui.Device.browser.name
 * @name sap.ui.Device.browser.BROWSER.FIREFOX
 * @public
 */
/**
 * Chrome browser name.
 *
 * @see sap.ui.Device.browser.name
 * @name sap.ui.Device.browser.BROWSER.CHROME
 * @public
 */
/**
 * Safari browser name.
 *
 * @see sap.ui.Device.browser.name
 * @name sap.ui.Device.browser.BROWSER.SAFARI
 * @public
 */
/**
 * Android stock browser name.
 *
 * @see sap.ui.Device.browser.name
 * @name sap.ui.Device.browser.BROWSER.ANDROID
 * @public
 */

var BROWSER = {
    "INTERNET_EXPLORER": "ie",
    "EDGE": "ed",
    "FIREFOX": "ff",
    "CHROME": "cr",
    "SAFARI": "sf",
    "ANDROID": "an"
};

var ua = navigator.userAgent;



function getBrowser(customUa, customNav) {
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
    function calcBrowser(customUa) {
        var sUserAgent = (customUa || ua).toLowerCase(); // use custom user-agent if given

        var rwebkit = /(webkit)[ \/]([\w.]+)/;
        var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
        var rmsie = /(msie) ([\w.]+)/;
        var rmsie11 = /(trident)\/[\w.]+;.*rv:([\w.]+)/;
        var redge = /(edge)[ \/]([\w.]+)/;
        var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

        // WinPhone IE11 and MS Edge userAgents contain "WebKit" and "Mozilla" and therefore must be checked first
        var browserMatch = redge.exec(sUserAgent) ||
            rmsie11.exec(sUserAgent) ||
            rwebkit.exec(sUserAgent) ||
            ropera.exec(sUserAgent) ||
            rmsie.exec(sUserAgent) ||
            sUserAgent.indexOf("compatible") < 0 && rmozilla.exec(sUserAgent) || [];

        var oRes = {
            browser: browserMatch[1] || "",
            version: browserMatch[2] || "0"
        };
        oRes[oRes.browser] = true;
        return oRes;
    }

    var oBrowser = calcBrowser(customUa);
    var sUserAgent = customUa || ua;
    var oNavigator = customNav || window.navigator;

    // jQuery checks for user agent strings. We differentiate between browsers
    var oExpMobile;
    var oResult;
    if (oBrowser.mozilla) {
        oExpMobile = /Mobile/;
        if (sUserAgent.match(/Firefox\/(\d+\.\d+)/)) {
            var fVersion = parseFloat(RegExp.$1);
            oResult = {
                name: BROWSER.FIREFOX,
                versionStr: "" + fVersion,
                version: fVersion,
                mozilla: true,
                mobile: oExpMobile.test(sUserAgent)
            };
        } else {
            // unknown mozilla browser
            oResult = {
                mobile: oExpMobile.test(sUserAgent),
                mozilla: true,
                version: -1
            };
        }
    } else if (oBrowser.webkit) {
        // webkit version is needed for calculation if the mobile android device is a tablet (calculation of other mobile devices work without)
        var regExpWebkitVersion = sUserAgent.toLowerCase().match(/webkit[\/]([\d.]+)/);
        var webkitVersion;
        if (regExpWebkitVersion) {
            webkitVersion = regExpWebkitVersion[1];
        }
        oExpMobile = /Mobile/;
        var aChromeMatch = sUserAgent.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/);
        var aFirefoxMatch = sUserAgent.match(/FxiOS\/(\d+\.\d+)/);
        var aAndroidMatch = sUserAgent.match(/Android .+ Version\/(\d+\.\d+)/);

        if (aChromeMatch || aFirefoxMatch || aAndroidMatch) {
            var sName, sVersion, bMobile;
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
                versionStr: "" + sVersion,
                version: sVersion,
                webkit: true,
                webkitVersion: webkitVersion
            };
        } else { // Safari might have an issue with sUserAgent.match(...); thus changing
            var oExp = /(Version|PhantomJS)\/(\d+\.\d+).*Safari/;
            var bStandalone = oNavigator.standalone;
            if (oExp.test(sUserAgent)) {
                var aParts = oExp.exec(sUserAgent);
                var fVersion = parseFloat(aParts[2]);
                oResult =  {
                    name: BROWSER.SAFARI,
                    versionStr: "" + fVersion,
                    fullscreen: false,
                    webview: false,
                    version: fVersion,
                    mobile: oExpMobile.test(sUserAgent),
                    webkit: true,
                    webkitVersion: webkitVersion,
                    phantomJS: aParts[1] === "PhantomJS"
                };
            } else if (/iPhone|iPad|iPod/.test(sUserAgent) && !(/CriOS/.test(sUserAgent)) && !(/FxiOS/.test(sUserAgent)) && (bStandalone === true || bStandalone === false)) {
                //WebView or Standalone mode on iOS
                oResult = {
                    name: BROWSER.SAFARI,
                    version: -1,
                    fullscreen: bStandalone,
                    webview: !bStandalone,
                    mobile: oExpMobile.test(sUserAgent),
                    webkit: true,
                    webkitVersion: webkitVersion
                };
            } else { // other webkit based browser
                oResult = {
                    mobile: oExpMobile.test(sUserAgent),
                    webkit: true,
                    webkitVersion: webkitVersion,
                    version: -1
                };
            }
        }
    } else if (oBrowser.msie || oBrowser.trident) {
        var fVersion;
        // recognize IE8 when running in compat mode (only then the documentMode property is there)
        if (document.documentMode && !customUa) { // only use the actual documentMode when no custom user-agent was given
            if (document.documentMode === 7) { // OK, obviously we are IE and seem to be 7... but as documentMode is there this cannot be IE7!
                fVersion = 8.0;
            } else {
                fVersion = parseFloat(document.documentMode);
            }
        } else {
            fVersion = parseFloat(oBrowser.version);
        }
        oResult = {
            name: BROWSER.INTERNET_EXPLORER,
            versionStr: "" + fVersion,
            version: fVersion,
            msie: true,
            mobile: false // TODO: really?
        };
    } else if (oBrowser.edge) {
        var fVersion = fVersion = parseFloat(oBrowser.version);
        oResult = {
            name: BROWSER.EDGE,
            versionStr: "" + fVersion,
            version: fVersion,
            edge: true
        };
    } else {
        oResult = {
            name: "",
            versionStr: "",
            version: -1,
            mobile: false
        };
    }

    // Check for Blink rendering engine (https://stackoverflow.com/questions/20655470/how-to-detect-blink-in-chrome)
    if ((oBrowser.chrome || window.Intl && window.Intl.v8BreakIterator) && 'CSS' in window) {
        oResult.blink = true;
    }

    return oResult;
}
Device._testUserAgent = getBrowser; // expose the user-agent parsing (mainly for testing), but don't let it be overwritten

function setBrowser() {
    Device.browser = getBrowser();
    Device.browser.BROWSER = BROWSER;

    if (Device.browser.name) {
        for (var b in BROWSER) {
            if (BROWSER[b] === Device.browser.name) {
                Device.browser[b.toLowerCase()] = true;
            }
        }
    }
}
setBrowser();




//******** Support Detection ********

/**
 * Contains information about detected capabilities of the used browser or Device.
 *
 * @namespace
 * @name sap.ui.Device.support
 * @public
 */

/**
 * If this flag is set to <code>true</code>, the used browser supports touch events.
 *
 * <b>Note:</b> This flag indicates whether the used browser supports touch events or not.
 * This does not necessarily mean that the used device has a touchable screen.
 *
 * @name sap.ui.Device.support.touch
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the used browser supports pointer events.
 *
 * @name sap.ui.Device.support.pointer
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the used browser natively supports media queries via JavaScript.
 *
 * <b>Note:</b> The {@link sap.ui.Device.media media queries API} of the device API can also be used when there is no native support.
 *
 * @name sap.ui.Device.support.matchmedia
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the used browser natively supports events of media queries via JavaScript.
 *
 * <b>Note:</b> The {@link sap.ui.Device.media media queries API} of the device API can also be used when there is no native support.
 *
 * @name sap.ui.Device.support.matchmedialistener
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the used browser natively supports the <code>orientationchange</code> event.
 *
 * <b>Note:</b> The {@link sap.ui.Device.orientation orientation event} of the device API can also be used when there is no native support.
 *
 * @name sap.ui.Device.support.orientation
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the device has a display with a high resolution.
 *
 * @name sap.ui.Device.support.retina
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the used browser supports web sockets.
 *
 * @name sap.ui.Device.support.websocket
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the used browser supports the <code>placeholder</code> attribute on <code>input</code> elements.
 *
 * @name sap.ui.Device.support.input.placeholder
 * @type boolean
 * @public
 */

Device.support = {};

//Maybe better to but this on Device.browser because there are cases that a browser can touch but a device can't!
Device.support.touch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);

// FIXME: PhantomJS doesn't support touch events but exposes itself as touch
//        enabled browser. Therfore we manually override that in jQuery.support!
//        This has been tested with PhantomJS 1.9.7 and 2.0.0!
if (Device.browser.phantomJS) {
    oLogger.log(ERROR, "PhantomJS is not supported! UI5 might break on PhantomJS in future releases. Please use Chrome Headless instead.");
    Device.support.touch = false;
}

Device.support.pointer = !!window.PointerEvent;

Device.support.matchmedia = !!window.matchMedia;
var m = Device.support.matchmedia ? window.matchMedia("all and (max-width:0px)") : null; //IE10 doesn't like empty string as argument for matchMedia, FF returns null when running within an iframe with display:none
Device.support.matchmedialistener = !!(m && m.addListener);

Device.support.orientation = !!("orientation" in window && "onorientationchange" in window);

Device.support.retina = (window.retina || window.devicePixelRatio >= 2);

Device.support.websocket = ('WebSocket' in window);

Device.support.input = {};
Device.support.input.placeholder = ('placeholder' in document.createElement("input"));


//******** System Detection ********

/**
 * Provides a basic categorization of the used device based on various indicators.
 *
 * These indicators are for example the support of touch events, the screen size, the used operation system or
 * the user agent of the browser.
 *
 * <b>Note:</b> Depending on the capabilities of the device it is also possible that multiple flags are set to <code>true</code>.
 *
 * @namespace
 * @name sap.ui.Device.system
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the device is recognized as a tablet.
 *
 * Furthermore, a CSS class <code>sap-tablet</code> is added to the document root element.
 *
 * <b>Note:</b> This flag is also true for some browsers on desktop devices running on Windows 8 or higher. Also see the
 * documentation for {@link sap.ui.Device.system.combi} devices.
 * You can use the following logic to ensure that the current device is a tablet device:
 *
 * <pre>
 * if(sap.ui.Device.system.tablet && !sap.ui.Device.system.desktop){
 *	...tablet related commands...
    * }
    * </pre>
    *
    * @name sap.ui.Device.system.tablet
    * @type boolean
    * @public
    */
/**
 * If this flag is set to <code>true</code>, the device is recognized as a phone.
 *
 * Furthermore, a CSS class <code>sap-phone</code> is added to the document root element.
 *
 * @name sap.ui.Device.system.phone
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the device is recognized as a desktop system.
 *
 * Furthermore, a CSS class <code>sap-desktop</code> is added to the document root element.
 *
 * @name sap.ui.Device.system.desktop
 * @type boolean
 * @public
 */
/**
 * If this flag is set to <code>true</code>, the device is recognized as a combination of a desktop system and tablet.
 *
 * Furthermore, a CSS class <code>sap-combi</code> is added to the document root element.
 *
 * <b>Note:</b> This property is mainly for Microsoft Windows 8 (and following) devices where the mouse and touch event may be supported
 * natively by the browser being used. This property is set to <code>true</code> only when both mouse and touch event are natively supported.
 *
 * @name sap.ui.Device.system.combi
 * @type boolean
 * @public
 */
/**
 * Enumeration containing the names of known types of the devices.
 *
 * @namespace
 * @name sap.ui.Device.system.SYSTEMTYPE
 * @private
 */

var SYSTEMTYPE = {
    "TABLET": "tablet",
    "PHONE": "phone",
    "DESKTOP": "desktop",
    "COMBI": "combi"
};

Device.system = {};

function getSystem(simMobileOnDesktop, customUA) {
    var bTabletDetected = isTablet(customUA);
    var isWin8Upwards = Device.os.windows && Device.os.version >= 8;
    var isWin7 = Device.os.windows && Device.os.version === 7;

    var oSystem = {};
    oSystem.tablet = !!(((Device.support.touch && !isWin7) || isWin8Upwards || !!simMobileOnDesktop) && bTabletDetected);
    oSystem.phone = !!(Device.os.windows_phone || ((Device.support.touch && !isWin7) || !!simMobileOnDesktop) && !bTabletDetected);
    oSystem.desktop = !!((!oSystem.tablet && !oSystem.phone) || isWin8Upwards || isWin7 || Device.os.linux);
    oSystem.combi = oSystem.desktop && oSystem.tablet;
    oSystem.SYSTEMTYPE = SYSTEMTYPE;

    for (var type in SYSTEMTYPE) {
        // changeRootCSSClass("sap-" + SYSTEMTYPE[type], !oSystem[SYSTEMTYPE[type]]);
    }
    return oSystem;
}

function isTablet(customUA) {
    var sUserAgent = customUA || navigator.userAgent;
    if (Device.os.name === Device.os.OS.IOS) {
        return /ipad/i.test(sUserAgent);
    } else {
        //in real mobile device
        if (Device.support.touch) {
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
            } else {
                var densityFactor = window.devicePixelRatio ? window.devicePixelRatio : 1; // may be undefined in Windows Phone devices
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

                //this is how android distinguishes between tablet and phone
                //http://android-developers.blogspot.de/2011/07/new-tools-for-managing-screen-sizes.html
                var bTablet = (Math.min(window.screen.width / densityFactor, window.screen.height / densityFactor) >= 600);

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

        } else {
            // This simple android phone detection can be used here because this is the mobile emulation mode in desktop browser
            var bAndroidPhone = (/(?=android)(?=.*mobile)/i.test(sUserAgent));
            // in desktop browser, it's detected as tablet when
            // 1. Windows 8 device with a touch screen where "Touch" is contained in the userAgent
            // 2. Android emulation and it's not an Android phone
            return (Device.browser.msie && sUserAgent.indexOf("Touch") !== -1) || (Device.os.android && !bAndroidPhone);
        }
    }
}

function setSystem(simMobileOnDesktop, customUA) {
    Device.system = getSystem(simMobileOnDesktop, customUA);
    if (Device.system.tablet || Device.system.phone) {
        Device.browser.mobile = true;
    }
}
setSystem();
// expose the function for unit test
Device._getSystem = getSystem;

export default Device;
