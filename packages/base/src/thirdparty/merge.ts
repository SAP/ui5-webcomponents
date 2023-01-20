import _merge from './_merge.js';
const fnMerge = function (arg1?: any, arg2?: any) {
    return _merge(true, false, ...arguments);
};
export default fnMerge;
