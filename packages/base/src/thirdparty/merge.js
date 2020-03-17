import _merge from './_merge.js';
var fnMerge = function () {
    var args = [
        true,
        false
    ];
    args.push.apply(args, arguments);
    return _merge.apply(null, args);
};
export default fnMerge;