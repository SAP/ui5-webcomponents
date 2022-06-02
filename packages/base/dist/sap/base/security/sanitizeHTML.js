import assert from '../assert.js';
import URLListValidator from './URLListValidator.js';
import '../../ui/thirdparty/caja-html-sanitizer.js';
var fnSanitizeHTML = function (sHTML, mOptions) {
    assert(window.html && window.html.sanitize, 'Sanitizer should have been loaded');
    mOptions = mOptions || {
        uriRewriter: function (sUrl) {
            if (URLListValidator.validate(sUrl)) {
                return sUrl;
            }
        }
    };
    var oTagPolicy = mOptions.tagPolicy || window.html.makeTagPolicy(mOptions.uriRewriter, mOptions.tokenPolicy);
    return window.html.sanitizeWithPolicy(sHTML, oTagPolicy);
};
export default fnSanitizeHTML;