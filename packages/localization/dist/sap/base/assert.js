import Log from './Log.js';
var fnAssert = function (bResult, vMessage) {
    if (!bResult) {
        var sMessage = typeof vMessage === 'function' ? vMessage() : vMessage;
        console.assert(bResult, sMessage);
    }
};
export default fnAssert;