var Interface = function (oObject, aMethods, _bReturnFacade) {
  if (!oObject) {
    return oObject;
  }
  function fCreateDelegator(oObject, sMethodName) {
    return function () {
      var tmp = oObject[sMethodName].apply(oObject, arguments);
      if (_bReturnFacade) {
        return this;
      } else {
        return typeof tmp.getInterface === "function" ? tmp.getInterface() : tmp;
      }
    };
  }
  if (!aMethods) {
    return {};
  }
  var sMethodName;
  for (var i = 0, ml = aMethods.length; i < ml; i++) {
    sMethodName = aMethods[i];
    if (!oObject[sMethodName] || typeof oObject[sMethodName] === "function") {
      this[sMethodName] = fCreateDelegator(oObject, sMethodName);
    }
  }
};
export default Interface;
