const themeDerivations = require("./global-derived-colors").derivations;
const componentDerivations = require("../base/component-derived-colors").derivations;

exports.derivations = {...themeDerivations, ...componentDerivations};