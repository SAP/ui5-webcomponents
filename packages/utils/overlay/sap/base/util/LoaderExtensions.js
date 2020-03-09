sap.ui.define([], function () {
    // used by LocaleData
    return {
        loadResource: function (name) {
            return window.sap.ui._UI5WebComponents.LocaleDataRegistry.getModuleContent(name);
        }
    }
});
