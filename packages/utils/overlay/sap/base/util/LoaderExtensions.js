sap.ui.define([], function () {
    // used by LocaleData
    return {
        loadResource: function (name) {
            return sap.ui.loader._.getModuleContent(name);
        }
    }
});