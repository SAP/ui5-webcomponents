var TimezoneUtil = {};
var sLocalTimezone = "";
var oIntlDateTimeFormatCache = {
  _oCache: new Map(),
  _iCacheLimit: 10,
  get: function (sTimezone) {
    var cacheEntry = this._oCache.get(sTimezone);
    if (cacheEntry) {
      return cacheEntry;
    }
    var oOptions = {
      hourCycle: "h23",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: sTimezone,
      timeZoneName: "short",
      era: "narrow"
    };
    var oInstance = new Intl.DateTimeFormat("en-US", oOptions);
    if (this._oCache.size === this._iCacheLimit) {
      this._oCache = new Map();
    }
    this._oCache.set(sTimezone, oInstance);
    return oInstance;
  }
};
TimezoneUtil.isValidTimezone = function (sTimezone) {
  if (!sTimezone) {
    return false;
  }
  try {
    oIntlDateTimeFormatCache.get(sTimezone);
    return true;
  } catch (oError) {
    return false;
  }
};
TimezoneUtil.convertToTimezone = function (oDate, sTargetTimezone) {
  var oFormatParts = this._getParts(oDate, sTargetTimezone);
  return TimezoneUtil._getDateFromParts(oFormatParts);
};
TimezoneUtil._getParts = function (oDate, sTargetTimezone) {
  var oIntlDate = oIntlDateTimeFormatCache.get(sTargetTimezone);
  var oParts = oIntlDate.formatToParts(new Date(oDate.getTime()));
  var oDateParts = Object.create(null);
  for (var sKey in oParts) {
    var oPart = oParts[sKey];
    if (oPart.type !== "literal") {
      oDateParts[oPart.type] = oPart.value;
    }
  }
  return oDateParts;
};
TimezoneUtil._getDateFromParts = function (oParts) {
  var oDate = new Date(0);
  var iUTCYear = parseInt(oParts.year);
  if (oParts.era === "B") {
    iUTCYear = iUTCYear * -1 + 1;
  }
  oDate.setUTCFullYear(iUTCYear, parseInt(oParts.month) - 1, parseInt(oParts.day));
  oDate.setUTCHours(parseInt(oParts.hour), parseInt(oParts.minute), parseInt(oParts.second), parseInt(oParts.fractionalSecond));
  return oDate;
};
TimezoneUtil.calculateOffset = function (oDate, sTimezoneSource) {
  var oFirstGuess = this.convertToTimezone(oDate, sTimezoneSource);
  var iInitialOffset = oDate.getTime() - oFirstGuess.getTime();
  var oDateSource = new Date(oDate.getTime() + iInitialOffset);
  var oDateTarget = this.convertToTimezone(oDateSource, sTimezoneSource);
  return (oDateSource.getTime() - oDateTarget.getTime()) / 1000;
};
TimezoneUtil.getLocalTimezone = function () {
  if (sLocalTimezone) {
    return sLocalTimezone;
  }
  sLocalTimezone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
  return sLocalTimezone;
};
export default TimezoneUtil;
