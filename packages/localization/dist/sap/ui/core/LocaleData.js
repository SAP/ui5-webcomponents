import Core from './Core.js';
import extend from '../../base/util/extend.js';
import BaseObject from '../base/Object.js';
import CalendarType from './CalendarType.js';
import Locale from './Locale.js';
import assert from '../../base/assert.js';
import LoaderExtensions from '../../base/util/LoaderExtensions.js';
var LocaleData = BaseObject.extend('sap.ui.core.LocaleData', {
    constructor: function (oLocale) {
        this.oLocale = oLocale;
        BaseObject.apply(this);
        var oDataLoaded = getData(oLocale);
        this.mData = oDataLoaded.mData;
        this.sCLDRLocaleId = oDataLoaded.sCLDRLocaleId;
    },
    _get: function () {
        return this._getDeep(this.mData, arguments);
    },
    _getMerged: function () {
        return this._get.apply(this, arguments);
    },
    _getDeep: function (oObject, aPropertyNames) {
        var oResult = oObject;
        for (var i = 0; i < aPropertyNames.length; i++) {
            oResult = oResult[aPropertyNames[i]];
            if (oResult === undefined) {
                break;
            }
        }
        return oResult;
    },
    getOrientation: function () {
        return this._get('orientation');
    },
    getCurrentLanguageName: function () {
        var oLanguages = this.getLanguages();
        var sCurrentLanguage;
        var sLanguage = this.oLocale.getModernLanguage();
        var sScript = this.oLocale.getScript();
        if (sLanguage === 'sr' && sScript === 'Latn') {
            sLanguage = 'sh';
            sScript = null;
        }
        if (this.oLocale.getRegion()) {
            sCurrentLanguage = oLanguages[sLanguage + '_' + this.oLocale.getRegion()];
        }
        if (!sCurrentLanguage && sScript) {
            sCurrentLanguage = oLanguages[sLanguage + '_' + sScript];
        }
        if (!sCurrentLanguage) {
            sCurrentLanguage = oLanguages[sLanguage];
        }
        return sCurrentLanguage;
    },
    getLanguages: function () {
        return this._get('languages');
    },
    getScripts: function () {
        return this._get('scripts');
    },
    getTerritories: function () {
        return this._get('territories');
    },
    getMonths: function (sWidth, sCalendarType) {
        assert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'months', 'format', sWidth);
    },
    getMonthsStandAlone: function (sWidth, sCalendarType) {
        assert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'months', 'stand-alone', sWidth);
    },
    getDays: function (sWidth, sCalendarType) {
        assert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide' || sWidth == 'short', 'sWidth must be narrow, abbreviate, wide or short');
        return this._get(getCLDRCalendarName(sCalendarType), 'days', 'format', sWidth);
    },
    getDaysStandAlone: function (sWidth, sCalendarType) {
        assert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide' || sWidth == 'short', 'sWidth must be narrow, abbreviated, wide or short');
        return this._get(getCLDRCalendarName(sCalendarType), 'days', 'stand-alone', sWidth);
    },
    getQuarters: function (sWidth, sCalendarType) {
        assert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'quarters', 'format', sWidth);
    },
    getQuartersStandAlone: function (sWidth, sCalendarType) {
        assert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'quarters', 'stand-alone', sWidth);
    },
    getDayPeriods: function (sWidth, sCalendarType) {
        assert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'dayPeriods', 'format', sWidth);
    },
    getDayPeriodsStandAlone: function (sWidth, sCalendarType) {
        assert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'dayPeriods', 'stand-alone', sWidth);
    },
    getDatePattern: function (sStyle, sCalendarType) {
        assert(sStyle == 'short' || sStyle == 'medium' || sStyle == 'long' || sStyle == 'full', 'sStyle must be short, medium, long or full');
        return this._get(getCLDRCalendarName(sCalendarType), 'dateFormats', sStyle);
    },
    getTimePattern: function (sStyle, sCalendarType) {
        assert(sStyle == 'short' || sStyle == 'medium' || sStyle == 'long' || sStyle == 'full', 'sStyle must be short, medium, long or full');
        return this._get(getCLDRCalendarName(sCalendarType), 'timeFormats', sStyle);
    },
    getDateTimePattern: function (sStyle, sCalendarType) {
        assert(sStyle == 'short' || sStyle == 'medium' || sStyle == 'long' || sStyle == 'full', 'sStyle must be short, medium, long or full');
        return this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', sStyle);
    },
    getCombinedDateTimePattern: function (sDateStyle, sTimeStyle, sCalendarType) {
        assert(sDateStyle == 'short' || sDateStyle == 'medium' || sDateStyle == 'long' || sDateStyle == 'full', 'sStyle must be short, medium, long or full');
        assert(sTimeStyle == 'short' || sTimeStyle == 'medium' || sTimeStyle == 'long' || sTimeStyle == 'full', 'sStyle must be short, medium, long or full');
        var sDateTimePattern = this.getDateTimePattern(sDateStyle, sCalendarType), sDatePattern = this.getDatePattern(sDateStyle, sCalendarType), sTimePattern = this.getTimePattern(sTimeStyle, sCalendarType);
        return sDateTimePattern.replace('{0}', sTimePattern).replace('{1}', sDatePattern);
    },
    getCombinedDateTimeWithTimezonePattern: function (sDateStyle, sTimeStyle, sCalendarType) {
        return this.applyTimezonePattern(this.getCombinedDateTimePattern(sDateStyle, sTimeStyle, sCalendarType));
    },
    applyTimezonePattern: function (sPattern) {
        var aPatterns = [sPattern];
        var aMissingTokens = [{
                group: 'Timezone',
                length: 2,
                field: 'zone',
                symbol: 'V'
            }];
        this._appendItems(aPatterns, aMissingTokens);
        return aPatterns[0];
    },
    getCustomDateTimePattern: function (sSkeleton, sCalendarType) {
        var oAvailableFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'availableFormats');
        return this._getFormatPattern(sSkeleton, oAvailableFormats, sCalendarType);
    },
    getIntervalPattern: function (sId, sCalendarType) {
        var oIntervalFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'intervalFormats'), aIdParts, sIntervalId, sDifference, oInterval, sPattern;
        if (sId) {
            aIdParts = sId.split('-');
            sIntervalId = aIdParts[0];
            sDifference = aIdParts[1];
            oInterval = oIntervalFormats[sIntervalId];
            if (oInterval) {
                sPattern = oInterval[sDifference];
                if (sPattern) {
                    return sPattern;
                }
            }
        }
        return oIntervalFormats.intervalFormatFallback;
    },
    getCombinedIntervalPattern: function (sPattern, sCalendarType) {
        var oIntervalFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'intervalFormats'), sFallbackPattern = oIntervalFormats.intervalFormatFallback;
        return sFallbackPattern.replace(/\{(0|1)\}/g, sPattern);
    },
    getCustomIntervalPattern: function (sSkeleton, vGreatestDiff, sCalendarType) {
        var oAvailableFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'intervalFormats');
        return this._getFormatPattern(sSkeleton, oAvailableFormats, sCalendarType, vGreatestDiff);
    },
    _getFormatPattern: function (sSkeleton, oAvailableFormats, sCalendarType, vDiff) {
        var vPattern, aPatterns, oIntervalFormats;
        if (!vDiff) {
            vPattern = oAvailableFormats[sSkeleton];
        } else if (typeof vDiff === 'string') {
            if (vDiff == 'j' || vDiff == 'J') {
                vDiff = this.getPreferredHourSymbol();
            }
            oIntervalFormats = oAvailableFormats[sSkeleton];
            vPattern = oIntervalFormats && oIntervalFormats[vDiff];
        }
        if (vPattern) {
            if (typeof vPattern === 'object') {
                aPatterns = Object.keys(vPattern).map(function (sKey) {
                    return vPattern[sKey];
                });
            } else {
                return vPattern;
            }
        }
        if (!aPatterns) {
            aPatterns = this._createFormatPattern(sSkeleton, oAvailableFormats, sCalendarType, vDiff);
        }
        if (aPatterns && aPatterns.length === 1) {
            return aPatterns[0];
        }
        return aPatterns;
    },
    _createFormatPattern: function (sSkeleton, oAvailableFormats, sCalendarType, vDiff) {
        var aTokens = this._parseSkeletonFormat(sSkeleton), aPatterns, oBestMatch = this._findBestMatch(aTokens, sSkeleton, oAvailableFormats), oToken, oAvailableDateTimeFormats, oSymbol, oGroup, sPattern, sSinglePattern, sDiffSymbol, sDiffGroup, rMixedSkeleton = /^([GyYqQMLwWEecdD]+)([hHkKjJmszZvVOXx]+)$/, bSingleDate, i;
        if (vDiff) {
            if (typeof vDiff === 'string') {
                sDiffGroup = mCLDRSymbols[vDiff] ? mCLDRSymbols[vDiff].group : '';
                if (sDiffGroup) {
                    bSingleDate = mCLDRSymbolGroups[sDiffGroup].index > aTokens[aTokens.length - 1].index;
                }
                sDiffSymbol = vDiff;
            } else {
                bSingleDate = true;
                if (aTokens[0].symbol === 'y' && oBestMatch && oBestMatch.pattern.G) {
                    oSymbol = mCLDRSymbols['G'];
                    oGroup = mCLDRSymbolGroups[oSymbol.group];
                    aTokens.splice(0, 0, {
                        symbol: 'G',
                        group: oSymbol.group,
                        match: oSymbol.match,
                        index: oGroup.index,
                        field: oGroup.field,
                        length: 1
                    });
                }
                for (i = aTokens.length - 1; i >= 0; i--) {
                    oToken = aTokens[i];
                    if (vDiff[oToken.group]) {
                        bSingleDate = false;
                        break;
                    }
                }
                for (i = 0; i < aTokens.length; i++) {
                    oToken = aTokens[i];
                    if (vDiff[oToken.group]) {
                        sDiffSymbol = oToken.symbol;
                        break;
                    }
                }
                if ((sDiffSymbol == 'h' || sDiffSymbol == 'K') && vDiff.DayPeriod) {
                    sDiffSymbol = 'a';
                }
            }
            if (bSingleDate) {
                return [this.getCustomDateTimePattern(sSkeleton, sCalendarType)];
            }
            if (oBestMatch && oBestMatch.missingTokens.length === 0) {
                sPattern = oBestMatch.pattern[sDiffSymbol];
                if (sPattern && oBestMatch.distance > 0) {
                    sPattern = this._expandFields(sPattern, oBestMatch.patternTokens, aTokens);
                }
            }
            if (!sPattern) {
                oAvailableDateTimeFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'availableFormats');
                if (rMixedSkeleton.test(sSkeleton) && 'ahHkKjJms'.indexOf(sDiffSymbol) >= 0) {
                    sPattern = this._getMixedFormatPattern(sSkeleton, oAvailableDateTimeFormats, sCalendarType, vDiff);
                } else {
                    sSinglePattern = this._getFormatPattern(sSkeleton, oAvailableDateTimeFormats, sCalendarType);
                    sPattern = this.getCombinedIntervalPattern(sSinglePattern, sCalendarType);
                }
            }
            aPatterns = [sPattern];
        } else if (!oBestMatch) {
            sPattern = sSkeleton;
            aPatterns = [sPattern];
        } else {
            if (typeof oBestMatch.pattern === 'string') {
                aPatterns = [oBestMatch.pattern];
            } else if (typeof oBestMatch.pattern === 'object') {
                aPatterns = [];
                for (var sKey in oBestMatch.pattern) {
                    sPattern = oBestMatch.pattern[sKey];
                    aPatterns.push(sPattern);
                }
            }
            if (oBestMatch.distance > 0) {
                if (oBestMatch.missingTokens.length > 0) {
                    if (rMixedSkeleton.test(sSkeleton)) {
                        aPatterns = [this._getMixedFormatPattern(sSkeleton, oAvailableFormats, sCalendarType)];
                    } else {
                        aPatterns = this._expandFields(aPatterns, oBestMatch.patternTokens, aTokens);
                        aPatterns = this._appendItems(aPatterns, oBestMatch.missingTokens, sCalendarType);
                    }
                } else {
                    aPatterns = this._expandFields(aPatterns, oBestMatch.patternTokens, aTokens);
                }
            }
        }
        if (sSkeleton.indexOf('J') >= 0) {
            aPatterns.forEach(function (sPattern, iIndex) {
                aPatterns[iIndex] = sPattern.replace(/ ?[abB](?=([^']*'[^']*')*[^']*)$/g, '');
            });
        }
        return aPatterns;
    },
    _parseSkeletonFormat: function (sSkeleton) {
        var aTokens = [], oToken = { index: -1 }, sSymbol, oSymbol, oGroup;
        for (var i = 0; i < sSkeleton.length; i++) {
            sSymbol = sSkeleton.charAt(i);
            if (sSymbol == 'j' || sSymbol == 'J') {
                sSymbol = this.getPreferredHourSymbol();
            }
            if (sSymbol == oToken.symbol) {
                oToken.length++;
                continue;
            }
            oSymbol = mCLDRSymbols[sSymbol];
            oGroup = mCLDRSymbolGroups[oSymbol.group];
            if (oSymbol.group == 'Other' || oGroup.diffOnly) {
                throw new Error('Symbol \'' + sSymbol + '\' is not allowed in skeleton format \'' + sSkeleton + '\'');
            }
            if (oGroup.index <= oToken.index) {
                throw new Error('Symbol \'' + sSymbol + '\' at wrong position or duplicate in skeleton format \'' + sSkeleton + '\'');
            }
            oToken = {
                symbol: sSymbol,
                group: oSymbol.group,
                match: oSymbol.match,
                index: oGroup.index,
                field: oGroup.field,
                length: 1
            };
            aTokens.push(oToken);
        }
        return aTokens;
    },
    _findBestMatch: function (aTokens, sSkeleton, oAvailableFormats) {
        var aTestTokens, aMissingTokens, oToken, oTestToken, iTest, iDistance, bMatch, iFirstDiffPos, oTokenSymbol, oTestTokenSymbol, oBestMatch = {
                distance: 10000,
                firstDiffPos: -1
            };
        for (var sTestSkeleton in oAvailableFormats) {
            if (sTestSkeleton === 'intervalFormatFallback' || sTestSkeleton.indexOf('B') > -1) {
                continue;
            }
            aTestTokens = this._parseSkeletonFormat(sTestSkeleton);
            iDistance = 0;
            aMissingTokens = [];
            bMatch = true;
            if (aTokens.length < aTestTokens.length) {
                continue;
            }
            iTest = 0;
            iFirstDiffPos = aTokens.length;
            for (var i = 0; i < aTokens.length; i++) {
                oToken = aTokens[i];
                oTestToken = aTestTokens[iTest];
                if (iFirstDiffPos === aTokens.length) {
                    iFirstDiffPos = i;
                }
                if (oTestToken) {
                    oTokenSymbol = mCLDRSymbols[oToken.symbol];
                    oTestTokenSymbol = mCLDRSymbols[oTestToken.symbol];
                    if (oToken.symbol === oTestToken.symbol) {
                        if (oToken.length === oTestToken.length) {
                            if (iFirstDiffPos === i) {
                                iFirstDiffPos = aTokens.length;
                            }
                        } else {
                            if (oToken.length < oTokenSymbol.numericCeiling ? oTestToken.length < oTestTokenSymbol.numericCeiling : oTestToken.length >= oTestTokenSymbol.numericCeiling) {
                                iDistance += Math.abs(oToken.length - oTestToken.length);
                            } else {
                                iDistance += 5;
                            }
                        }
                        iTest++;
                        continue;
                    } else {
                        if (oToken.match == oTestToken.match) {
                            iDistance += Math.abs(oToken.length - oTestToken.length) + 10;
                            iTest++;
                            continue;
                        }
                    }
                }
                aMissingTokens.push(oToken);
                iDistance += 50 - i;
            }
            if (iTest < aTestTokens.length) {
                bMatch = false;
            }
            if (bMatch && (iDistance < oBestMatch.distance || iDistance === oBestMatch.distance && iFirstDiffPos > oBestMatch.firstDiffPos)) {
                oBestMatch.distance = iDistance;
                oBestMatch.firstDiffPos = iFirstDiffPos;
                oBestMatch.missingTokens = aMissingTokens;
                oBestMatch.pattern = oAvailableFormats[sTestSkeleton];
                oBestMatch.patternTokens = aTestTokens;
            }
        }
        if (oBestMatch.pattern) {
            return oBestMatch;
        }
    },
    _expandFields: function (vPattern, aPatternTokens, aTokens) {
        var bSinglePattern = typeof vPattern === 'string';
        var aPatterns;
        if (bSinglePattern) {
            aPatterns = [vPattern];
        } else {
            aPatterns = vPattern;
        }
        var aResult = aPatterns.map(function (sPattern) {
            var mGroups = {}, mPatternGroups = {}, sResultPatterm = '', bQuoted = false, i = 0, iSkeletonLength, iPatternLength, iBestLength, iNewLength, oSkeletonToken, oBestToken, oSymbol, sChar;
            aTokens.forEach(function (oToken) {
                mGroups[oToken.group] = oToken;
            });
            aPatternTokens.forEach(function (oToken) {
                mPatternGroups[oToken.group] = oToken;
            });
            while (i < sPattern.length) {
                sChar = sPattern.charAt(i);
                if (bQuoted) {
                    sResultPatterm += sChar;
                    if (sChar == '\'') {
                        bQuoted = false;
                    }
                } else {
                    oSymbol = mCLDRSymbols[sChar];
                    if (oSymbol && mGroups[oSymbol.group] && mPatternGroups[oSymbol.group]) {
                        oSkeletonToken = mGroups[oSymbol.group];
                        oBestToken = mPatternGroups[oSymbol.group];
                        iSkeletonLength = oSkeletonToken.length;
                        iBestLength = oBestToken.length;
                        iPatternLength = 1;
                        while (sPattern.charAt(i + 1) == sChar) {
                            i++;
                            iPatternLength++;
                        }
                        if (iSkeletonLength === iBestLength || (iSkeletonLength < oSymbol.numericCeiling ? iPatternLength >= oSymbol.numericCeiling : iPatternLength < oSymbol.numericCeiling)) {
                            iNewLength = iPatternLength;
                        } else {
                            iNewLength = Math.max(iPatternLength, iSkeletonLength);
                        }
                        for (var j = 0; j < iNewLength; j++) {
                            sResultPatterm += sChar;
                        }
                    } else {
                        sResultPatterm += sChar;
                        if (sChar == '\'') {
                            bQuoted = true;
                        }
                    }
                }
                i++;
            }
            return sResultPatterm;
        });
        return bSinglePattern ? aResult[0] : aResult;
    },
    _appendItems: function (aPatterns, aMissingTokens, sCalendarType) {
        var oAppendItems = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'appendItems');
        aPatterns.forEach(function (sPattern, iIndex) {
            var sDisplayName, sAppendPattern, sAppendField;
            aMissingTokens.forEach(function (oToken) {
                sAppendPattern = oAppendItems[oToken.group];
                sDisplayName = '\'' + this.getDisplayName(oToken.field) + '\'';
                sAppendField = '';
                for (var i = 0; i < oToken.length; i++) {
                    sAppendField += oToken.symbol;
                }
                aPatterns[iIndex] = sAppendPattern.replace(/\{0\}/, sPattern).replace(/\{1\}/, sAppendField).replace(/\{2\}/, sDisplayName);
            }.bind(this));
        }.bind(this));
        return aPatterns;
    },
    _getMixedFormatPattern: function (sSkeleton, oAvailableFormats, sCalendarType, vDiff) {
        var rMixedSkeleton = /^([GyYqQMLwWEecdD]+)([hHkKjJmszZvVOXx]+)$/, rWideMonth = /MMMM|LLLL/, rAbbrevMonth = /MMM|LLL/, rWeekDay = /E|e|c/, oResult, sDateSkeleton, sTimeSkeleton, sStyle, sDatePattern, sTimePattern, sDateTimePattern, sResultPattern;
        oResult = rMixedSkeleton.exec(sSkeleton);
        sDateSkeleton = oResult[1];
        sTimeSkeleton = oResult[2];
        sDatePattern = this._getFormatPattern(sDateSkeleton, oAvailableFormats, sCalendarType);
        if (vDiff) {
            sTimePattern = this.getCustomIntervalPattern(sTimeSkeleton, vDiff, sCalendarType);
        } else {
            sTimePattern = this._getFormatPattern(sTimeSkeleton, oAvailableFormats, sCalendarType);
        }
        if (rWideMonth.test(sDateSkeleton)) {
            sStyle = rWeekDay.test(sDateSkeleton) ? 'full' : 'long';
        } else if (rAbbrevMonth.test(sDateSkeleton)) {
            sStyle = 'medium';
        } else {
            sStyle = 'short';
        }
        sDateTimePattern = this.getDateTimePattern(sStyle, sCalendarType);
        sResultPattern = sDateTimePattern.replace(/\{1\}/, sDatePattern).replace(/\{0\}/, sTimePattern);
        return sResultPattern;
    },
    getNumberSymbol: function (sType) {
        assert(sType == 'decimal' || sType == 'group' || sType == 'plusSign' || sType == 'minusSign' || sType == 'percentSign', 'sType must be decimal, group, plusSign, minusSign or percentSign');
        return this._get('symbols-latn-' + sType);
    },
    getLenientNumberSymbols: function (sType) {
        assert(sType == 'plusSign' || sType == 'minusSign', 'sType must be plusSign or minusSign');
        return this._get('lenient-scope-number')[sType];
    },
    getDecimalPattern: function () {
        return this._get('decimalFormat').standard;
    },
    getCurrencyPattern: function (sContext) {
        return this._get('currencyFormat')[sContext] || this._get('currencyFormat').standard;
    },
    getCurrencySpacing: function (sPosition) {
        return this._get('currencyFormat', 'currencySpacing', sPosition === 'after' ? 'afterCurrency' : 'beforeCurrency');
    },
    getPercentPattern: function () {
        return this._get('percentFormat').standard;
    },
    getMiscPattern: function (sName) {
        assert(sName == 'approximately' || sName == 'atLeast' || sName == 'atMost' || sName == 'range', 'sName must be approximately, atLeast, atMost or range');
        return this._get('miscPattern')[sName];
    },
    getMinimalDaysInFirstWeek: function () {
        return this._get('weekData-minDays');
    },
    getFirstDayOfWeek: function () {
        return this._get('weekData-firstDay');
    },
    getWeekendStart: function () {
        return this._get('weekData-weekendStart');
    },
    getWeekendEnd: function () {
        return this._get('weekData-weekendEnd');
    },
    getCustomCurrencyCodes: function () {
        var mCustomCurrencies = this._get('currency') || {}, mCustomCurrencyCodes = {};
        Object.keys(mCustomCurrencies).forEach(function (sCurrencyKey) {
            mCustomCurrencyCodes[sCurrencyKey] = sCurrencyKey;
        });
        return mCustomCurrencyCodes;
    },
    getCurrencyDigits: function (sCurrency) {
        var mCustomCurrencies = this._get('currency');
        if (mCustomCurrencies) {
            if (mCustomCurrencies[sCurrency] && mCustomCurrencies[sCurrency].hasOwnProperty('digits')) {
                return mCustomCurrencies[sCurrency].digits;
            } else if (mCustomCurrencies['DEFAULT'] && mCustomCurrencies['DEFAULT'].hasOwnProperty('digits')) {
                return mCustomCurrencies['DEFAULT'].digits;
            }
        }
        var iDigits = this._get('currencyDigits', sCurrency);
        if (iDigits == null) {
            iDigits = this._get('currencyDigits', 'DEFAULT');
            if (iDigits == null) {
                iDigits = 2;
            }
        }
        return iDigits;
    },
    getCurrencySymbol: function (sCurrency) {
        var oCurrencySymbols = this.getCurrencySymbols();
        return oCurrencySymbols && oCurrencySymbols[sCurrency] || sCurrency;
    },
    getCurrencyCodeBySymbol: function (sCurrencySymbol) {
        var oCurrencySymbols = this._get('currencySymbols'), sCurrencyCode;
        for (sCurrencyCode in oCurrencySymbols) {
            if (oCurrencySymbols[sCurrencyCode] === sCurrencySymbol) {
                return sCurrencyCode;
            }
        }
        return sCurrencySymbol;
    },
    getCurrencySymbols: function () {
        var mCustomCurrencies = this._get('currency'), mCustomCurrencySymbols = {}, sIsoCode;
        for (var sCurrencyKey in mCustomCurrencies) {
            sIsoCode = mCustomCurrencies[sCurrencyKey].isoCode;
            if (mCustomCurrencies[sCurrencyKey].symbol) {
                mCustomCurrencySymbols[sCurrencyKey] = mCustomCurrencies[sCurrencyKey].symbol;
            } else if (sIsoCode) {
                mCustomCurrencySymbols[sCurrencyKey] = this._get('currencySymbols')[sIsoCode];
            }
        }
        return Object.assign({}, this._get('currencySymbols'), mCustomCurrencySymbols);
    },
    getUnitDisplayName: function (sUnit) {
        var mUnitFormat = this.getUnitFormat(sUnit);
        return mUnitFormat && mUnitFormat['displayName'] || '';
    },
    getRelativePatterns: function (aScales, sStyle) {
        if (sStyle === undefined) {
            sStyle = 'wide';
        }
        assert(sStyle === 'wide' || sStyle === 'short' || sStyle === 'narrow', 'sStyle is only allowed to be set with \'wide\', \'short\' or \'narrow\'');
        var aPatterns = [], aPluralCategories = this.getPluralCategories(), oScale, oTimeEntry, iValue, iSign;
        if (!aScales) {
            aScales = [
                'year',
                'month',
                'week',
                'day',
                'hour',
                'minute',
                'second'
            ];
        }
        aScales.forEach(function (sScale) {
            oScale = this._get('dateFields', sScale + '-' + sStyle);
            for (var sEntry in oScale) {
                if (sEntry.indexOf('relative-type-') === 0) {
                    iValue = parseInt(sEntry.substr(14));
                    aPatterns.push({
                        scale: sScale,
                        value: iValue,
                        pattern: oScale[sEntry]
                    });
                } else if (sEntry.indexOf('relativeTime-type-') == 0) {
                    oTimeEntry = oScale[sEntry];
                    iSign = sEntry.substr(18) === 'past' ? -1 : 1;
                    aPluralCategories.forEach(function (sKey) {
                        aPatterns.push({
                            scale: sScale,
                            sign: iSign,
                            pattern: oTimeEntry['relativeTimePattern-count-' + sKey]
                        });
                    });
                }
            }
        }.bind(this));
        return aPatterns;
    },
    getRelativePattern: function (sScale, iDiff, bFuture, sStyle) {
        var sPattern, oTypes, sKey, sPluralCategory;
        if (typeof bFuture === 'string') {
            sStyle = bFuture;
            bFuture = undefined;
        }
        if (bFuture === undefined) {
            bFuture = iDiff > 0;
        }
        if (sStyle === undefined) {
            sStyle = 'wide';
        }
        assert(sStyle === 'wide' || sStyle === 'short' || sStyle === 'narrow', 'sStyle is only allowed to be set with \'wide\', \'short\' or \'narrow\'');
        sKey = sScale + '-' + sStyle;
        if (iDiff === 0 || iDiff === -2 || iDiff === 2) {
            sPattern = this._get('dateFields', sKey, 'relative-type-' + iDiff);
        }
        if (!sPattern) {
            oTypes = this._get('dateFields', sKey, 'relativeTime-type-' + (bFuture ? 'future' : 'past'));
            sPluralCategory = this.getPluralCategory(Math.abs(iDiff).toString());
            sPattern = oTypes['relativeTimePattern-count-' + sPluralCategory];
        }
        return sPattern;
    },
    getRelativeSecond: function (iDiff, sStyle) {
        return this.getRelativePattern('second', iDiff, sStyle);
    },
    getRelativeMinute: function (iDiff, sStyle) {
        if (iDiff == 0) {
            return null;
        }
        return this.getRelativePattern('minute', iDiff, sStyle);
    },
    getRelativeHour: function (iDiff, sStyle) {
        if (iDiff == 0) {
            return null;
        }
        return this.getRelativePattern('hour', iDiff, sStyle);
    },
    getRelativeDay: function (iDiff, sStyle) {
        return this.getRelativePattern('day', iDiff, sStyle);
    },
    getRelativeWeek: function (iDiff, sStyle) {
        return this.getRelativePattern('week', iDiff, sStyle);
    },
    getRelativeMonth: function (iDiff, sStyle) {
        return this.getRelativePattern('month', iDiff, sStyle);
    },
    getDisplayName: function (sType, sStyle) {
        assert(sType == 'second' || sType == 'minute' || sType == 'hour' || sType == 'zone' || sType == 'day' || sType == 'weekday' || sType == 'week' || sType == 'month' || sType == 'quarter' || sType == 'year' || sType == 'era', 'sType must be second, minute, hour, zone, day, weekday, week, month, quarter, year, era');
        if (sStyle === undefined) {
            sStyle = 'wide';
        }
        assert(sStyle === 'wide' || sStyle === 'short' || sStyle === 'narrow', 'sStyle is only allowed to be set with \'wide\', \'short\' or \'narrow\'');
        var aSingleFormFields = [
                'era',
                'weekday',
                'zone'
            ], sKey = aSingleFormFields.indexOf(sType) === -1 ? sType + '-' + sStyle : sType;
        return this._get('dateFields', sKey, 'displayName');
    },
    getRelativeYear: function (iDiff, sStyle) {
        return this.getRelativePattern('year', iDiff, sStyle);
    },
    getDecimalFormat: function (sStyle, sNumber, sPlural) {
        var sFormat;
        var oFormats;
        switch (sStyle) {
        case 'long':
            oFormats = this._get('decimalFormat-long');
            break;
        default:
            oFormats = this._get('decimalFormat-short');
            break;
        }
        if (oFormats) {
            var sName = sNumber + '-' + sPlural;
            sFormat = oFormats[sName];
            if (!sFormat) {
                sName = sNumber + '-other';
                sFormat = oFormats[sName];
            }
        }
        return sFormat;
    },
    getCurrencyFormat: function (sStyle, sNumber, sPlural) {
        var sFormat;
        var oFormats = this._get('currencyFormat-' + sStyle);
        if (!oFormats) {
            if (sStyle === 'sap-short') {
                throw new Error('Failed to get CLDR data for property "currencyFormat-sap-short"');
            }
            oFormats = this._get('currencyFormat-short');
        }
        if (oFormats) {
            var sName = sNumber + '-' + sPlural;
            sFormat = oFormats[sName];
            if (!sFormat) {
                sName = sNumber + '-other';
                sFormat = oFormats[sName];
            }
        }
        return sFormat;
    },
    getListFormat: function (sType, sStyle) {
        var oFormats = this._get('listPattern-' + (sType || 'standard') + '-' + (sStyle || 'wide'));
        if (oFormats) {
            return oFormats;
        }
        return {};
    },
    getResolvedUnitFormat: function (sUnit) {
        sUnit = this.getUnitFromMapping(sUnit) || sUnit;
        return this.getUnitFormat(sUnit);
    },
    getUnitFormat: function (sUnit) {
        return this._get('units', 'short', sUnit);
    },
    getUnitFormats: function () {
        return this._getMerged('units', 'short');
    },
    getUnitFromMapping: function (sMapping) {
        return this._get('unitMappings', sMapping);
    },
    getEras: function (sWidth, sCalendarType) {
        assert(sWidth == 'wide' || sWidth == 'abbreviated' || sWidth == 'narrow', 'sWidth must be wide, abbreviate or narrow');
        var oEras = this._get(getCLDRCalendarName(sCalendarType), 'era-' + sWidth), aEras = [];
        for (var i in oEras) {
            aEras[parseInt(i)] = oEras[i];
        }
        return aEras;
    },
    getEraDates: function (sCalendarType) {
        var oEraDates = this._get('eras-' + sCalendarType.toLowerCase()), aEraDates = [];
        for (var i in oEraDates) {
            aEraDates[parseInt(i)] = oEraDates[i];
        }
        return aEraDates;
    },
    getCalendarWeek: function (sStyle, iWeekNumber) {
        assert(sStyle == 'wide' || sStyle == 'narrow', 'sStyle must be wide or narrow');
        var oMessageBundle = Core.getLibraryResourceBundle('sap.ui.core', this.oLocale.toString()), sKey = 'date.week.calendarweek.' + sStyle;
        return oMessageBundle.getText(sKey, iWeekNumber);
    },
    firstDayStartsFirstWeek: function () {
        return this._get('weekData-algorithm') === 'FIRSTDAY_STARTS_FIRSTWEEK';
    },
    getPreferredCalendarType: function () {
        var sCalendarPreference = this._get('calendarPreference'), aCalendars = sCalendarPreference ? sCalendarPreference.split(' ') : [], sCalendarName, sType, i;
        for (i = 0; i < aCalendars.length; i++) {
            sCalendarName = aCalendars[i].split('-')[0];
            for (sType in CalendarType) {
                if (sCalendarName === sType.toLowerCase()) {
                    return sType;
                }
            }
        }
        return CalendarType.Gregorian;
    },
    getPreferredHourSymbol: function () {
        return this._get('timeData', '_preferred');
    },
    getPluralCategories: function () {
        var oPlurals = this._get('plurals'), aCategories = Object.keys(oPlurals);
        aCategories.push('other');
        return aCategories;
    },
    getPluralCategory: function (sNumber) {
        var oPlurals = this._get('plurals');
        if (typeof sNumber === 'number') {
            sNumber = sNumber.toString();
        }
        if (!this._pluralTest) {
            this._pluralTest = {};
        }
        for (var sCategory in oPlurals) {
            var fnTest = this._pluralTest[sCategory];
            if (!fnTest) {
                fnTest = this._parsePluralRule(oPlurals[sCategory]);
                this._pluralTest[sCategory] = fnTest;
            }
            if (fnTest(sNumber)) {
                return sCategory;
            }
        }
        return 'other';
    },
    _parsePluralRule: function (sRule) {
        var OP_OR = 'or', OP_AND = 'and', OP_MOD = '%', OP_EQ = '=', OP_NEQ = '!=', OPD_N = 'n', OPD_I = 'i', OPD_F = 'f', OPD_T = 't', OPD_V = 'v', OPD_W = 'w', RANGE = '..', SEP = ',';
        var i = 0, aTokens;
        aTokens = sRule.split(' ');
        function accept(sToken) {
            if (aTokens[i] === sToken) {
                i++;
                return true;
            }
            return false;
        }
        function consume() {
            var sToken = aTokens[i];
            i++;
            return sToken;
        }
        function or_condition() {
            var fnAnd, fnOr;
            fnAnd = and_condition();
            if (accept(OP_OR)) {
                fnOr = or_condition();
                return function (o) {
                    return fnAnd(o) || fnOr(o);
                };
            }
            return fnAnd;
        }
        function and_condition() {
            var fnRelation, fnAnd;
            fnRelation = relation();
            if (accept(OP_AND)) {
                fnAnd = and_condition();
                return function (o) {
                    return fnRelation(o) && fnAnd(o);
                };
            }
            return fnRelation;
        }
        function relation() {
            var fnExpr, fnRangeList, bEq;
            fnExpr = expr();
            if (accept(OP_EQ)) {
                bEq = true;
            } else if (accept(OP_NEQ)) {
                bEq = false;
            } else {
                throw new Error('Expected \'=\' or \'!=\'');
            }
            fnRangeList = range_list();
            if (bEq) {
                return function (o) {
                    return fnRangeList(o).indexOf(fnExpr(o)) >= 0;
                };
            } else {
                return function (o) {
                    return fnRangeList(o).indexOf(fnExpr(o)) === -1;
                };
            }
        }
        function expr() {
            var fnOperand;
            fnOperand = operand();
            if (accept(OP_MOD)) {
                var iDivisor = parseInt(consume());
                return function (o) {
                    return fnOperand(o) % iDivisor;
                };
            }
            return fnOperand;
        }
        function operand() {
            if (accept(OPD_N)) {
                return function (o) {
                    return o.n;
                };
            } else if (accept(OPD_I)) {
                return function (o) {
                    return o.i;
                };
            } else if (accept(OPD_F)) {
                return function (o) {
                    return o.f;
                };
            } else if (accept(OPD_T)) {
                return function (o) {
                    return o.t;
                };
            } else if (accept(OPD_V)) {
                return function (o) {
                    return o.v;
                };
            } else if (accept(OPD_W)) {
                return function (o) {
                    return o.w;
                };
            } else {
                throw new Error('Unknown operand: ' + consume());
            }
        }
        function range_list() {
            var aValues = [], sRangeList = consume(), aParts = sRangeList.split(SEP), aRange, iFrom, iTo;
            aParts.forEach(function (sPart) {
                aRange = sPart.split(RANGE);
                if (aRange.length === 1) {
                    aValues.push(parseInt(sPart));
                } else {
                    iFrom = parseInt(aRange[0]);
                    iTo = parseInt(aRange[1]);
                    for (var i = iFrom; i <= iTo; i++) {
                        aValues.push(i);
                    }
                }
            });
            return function (o) {
                return aValues;
            };
        }
        var fnOr = or_condition();
        if (i != aTokens.length) {
            throw new Error('Not completely parsed');
        }
        return function (sValue) {
            var iDotPos = sValue.indexOf('.'), sDecimal, sFraction, sFractionNoZeros, o;
            if (iDotPos === -1) {
                sDecimal = sValue;
                sFraction = '';
                sFractionNoZeros = '';
            } else {
                sDecimal = sValue.substr(0, iDotPos);
                sFraction = sValue.substr(iDotPos + 1);
                sFractionNoZeros = sFraction.replace(/0+$/, '');
            }
            o = {
                n: parseFloat(sValue),
                i: parseInt(sDecimal),
                v: sFraction.length,
                w: sFractionNoZeros.length,
                f: parseInt(sFraction),
                t: parseInt(sFractionNoZeros)
            };
            return fnOr(o);
        };
    }
});
var mCLDRSymbolGroups = {
    'Era': {
        field: 'era',
        index: 0
    },
    'Year': {
        field: 'year',
        index: 1
    },
    'Quarter': {
        field: 'quarter',
        index: 2
    },
    'Month': {
        field: 'month',
        index: 3
    },
    'Week': {
        field: 'week',
        index: 4
    },
    'Day-Of-Week': {
        field: 'weekday',
        index: 5
    },
    'Day': {
        field: 'day',
        index: 6
    },
    'DayPeriod': {
        field: 'hour',
        index: 7,
        diffOnly: true
    },
    'Hour': {
        field: 'hour',
        index: 8
    },
    'Minute': {
        field: 'minute',
        index: 9
    },
    'Second': {
        field: 'second',
        index: 10
    },
    'Timezone': {
        field: 'zone',
        index: 11
    }
};
var mCLDRSymbols = {
    'G': {
        group: 'Era',
        match: 'Era',
        numericCeiling: 1
    },
    'y': {
        group: 'Year',
        match: 'Year',
        numericCeiling: 100
    },
    'Y': {
        group: 'Year',
        match: 'Year',
        numericCeiling: 100
    },
    'Q': {
        group: 'Quarter',
        match: 'Quarter',
        numericCeiling: 3
    },
    'q': {
        group: 'Quarter',
        match: 'Quarter',
        numericCeiling: 3
    },
    'M': {
        group: 'Month',
        match: 'Month',
        numericCeiling: 3
    },
    'L': {
        group: 'Month',
        match: 'Month',
        numericCeiling: 3
    },
    'w': {
        group: 'Week',
        match: 'Week',
        numericCeiling: 100
    },
    'W': {
        group: 'Week',
        match: 'Week',
        numericCeiling: 100
    },
    'd': {
        group: 'Day',
        match: 'Day',
        numericCeiling: 100
    },
    'D': {
        group: 'Day',
        match: 'Day',
        numericCeiling: 100
    },
    'E': {
        group: 'Day-Of-Week',
        match: 'Day-Of-Week',
        numericCeiling: 1
    },
    'e': {
        group: 'Day-Of-Week',
        match: 'Day-Of-Week',
        numericCeiling: 3
    },
    'c': {
        group: 'Day-Of-Week',
        match: 'Day-Of-Week',
        numericCeiling: 2
    },
    'h': {
        group: 'Hour',
        match: 'Hour12',
        numericCeiling: 100
    },
    'H': {
        group: 'Hour',
        match: 'Hour24',
        numericCeiling: 100
    },
    'k': {
        group: 'Hour',
        match: 'Hour24',
        numericCeiling: 100
    },
    'K': {
        group: 'Hour',
        match: 'Hour12',
        numericCeiling: 100
    },
    'm': {
        group: 'Minute',
        match: 'Minute',
        numericCeiling: 100
    },
    's': {
        group: 'Second',
        match: 'Second',
        numericCeiling: 100
    },
    'z': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'Z': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'O': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'v': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'V': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'X': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'x': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'S': {
        group: 'Other',
        numericCeiling: 100
    },
    'u': {
        group: 'Other',
        numericCeiling: 100
    },
    'U': {
        group: 'Other',
        numericCeiling: 1
    },
    'r': {
        group: 'Other',
        numericCeiling: 100
    },
    'F': {
        group: 'Other',
        numericCeiling: 100
    },
    'g': {
        group: 'Other',
        numericCeiling: 100
    },
    'a': {
        group: 'DayPeriod',
        numericCeiling: 1
    },
    'b': {
        group: 'Other',
        numericCeiling: 1
    },
    'B': {
        group: 'Other',
        numericCeiling: 1
    },
    'A': {
        group: 'Other',
        numericCeiling: 100
    }
};
var M_ISO639_OLD_TO_NEW = {
    'iw': 'he',
    'ji': 'yi'
};
var M_SUPPORTED_LOCALES = function () {
    var LOCALES = Locale._cldrLocales, result = {}, i;
    if (LOCALES) {
        for (i = 0; i < LOCALES.length; i++) {
            result[LOCALES[i]] = true;
        }
    }
    return result;
}();
var mLocaleDatas = {};
function getCLDRCalendarName(sCalendarType) {
    if (!sCalendarType) {
        sCalendarType = Core.getConfiguration().getCalendarType();
    }
    return 'ca-' + sCalendarType.toLowerCase();
}
function getData(oLocale) {
    var sLanguage = oLocale.getLanguage() || '', sScript = oLocale.getScript() || '', sRegion = oLocale.getRegion() || '', mData;
    function merge(obj, fallbackObj) {
        var name, value, fallbackValue;
        if (!fallbackObj) {
            return;
        }
        for (name in fallbackObj) {
            if (fallbackObj.hasOwnProperty(name)) {
                value = obj[name];
                fallbackValue = fallbackObj[name];
                if (value === undefined) {
                    obj[name] = fallbackValue;
                } else if (value === null) {
                    delete obj[name];
                } else if (typeof value === 'object' && typeof fallbackValue === 'object') {
                    merge(value, fallbackValue);
                }
            }
        }
    }
    function getOrLoad(sId) {
        if (!mLocaleDatas[sId] && (!M_SUPPORTED_LOCALES || M_SUPPORTED_LOCALES[sId] === true)) {
            var data = mLocaleDatas[sId] = LoaderExtensions.loadResource('sap/ui/core/cldr/' + sId + '.json', {
                dataType: 'json',
                failOnError: false
            });
            if (data && data.__fallbackLocale) {
                merge(data, getOrLoad(data.__fallbackLocale));
                delete data.__fallbackLocale;
            }
        }
        return mLocaleDatas[sId];
    }
    sLanguage = sLanguage && M_ISO639_OLD_TO_NEW[sLanguage] || sLanguage;
    if (sLanguage === 'no') {
        sLanguage = 'nb';
    }
    if (sLanguage === 'zh' && !sRegion) {
        if (sScript === 'Hans') {
            sRegion = 'CN';
        } else if (sScript === 'Hant') {
            sRegion = 'TW';
        }
    }
    if (sLanguage === 'sh' || sLanguage === 'sr' && sScript === 'Latn') {
        sLanguage = 'sr_Latn';
    }
    var sId = sLanguage + '_' + sRegion;
    var sCLDRLocaleId = sId;
    if (sLanguage && sRegion) {
        mData = getOrLoad(sId);
    }
    if (!mData && sLanguage) {
        mData = getOrLoad(sLanguage);
        sCLDRLocaleId = sLanguage;
    }
    if (!mData) {
        mData = getOrLoad('en');
        sCLDRLocaleId = 'en';
    }
    mLocaleDatas[sId] = mData;
    sCLDRLocaleId = sCLDRLocaleId.replace(/_/g, '-');
    return {
        mData: mData,
        sCLDRLocaleId: sCLDRLocaleId
    };
}
var CustomLocaleData = LocaleData.extend('sap.ui.core.CustomLocaleData', {
    constructor: function (oLocale) {
        LocaleData.apply(this, arguments);
        this.mCustomData = Core.getConfiguration().getFormatSettings().getCustomLocaleData();
    },
    _get: function () {
        var aArguments = Array.prototype.slice.call(arguments), sCalendar, sKey;
        if (aArguments[0].indexOf('ca-') == 0) {
            sCalendar = aArguments[0];
            if (sCalendar == getCLDRCalendarName()) {
                aArguments = aArguments.slice(1);
            }
        }
        sKey = aArguments.join('-');
        var vValue = this.mCustomData[sKey];
        if (vValue == null) {
            vValue = this._getDeep(this.mCustomData, arguments);
            if (vValue == null) {
                vValue = this._getDeep(this.mData, arguments);
            }
        }
        return vValue;
    },
    _getMerged: function () {
        var mData = this._getDeep(this.mData, arguments);
        var mCustomData = this._getDeep(this.mCustomData, arguments);
        return extend({}, mData, mCustomData);
    }
});
LocaleData.getInstance = function (oLocale) {
    return oLocale.hasPrivateUseSubtag('sapufmt') ? new CustomLocaleData(oLocale) : new LocaleData(oLocale);
};
export default LocaleData;