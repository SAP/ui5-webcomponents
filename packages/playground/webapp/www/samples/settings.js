(function() {
    var HCB = "sap_belize_hcb";
    var theme = window["sap-ui-webcomponents-main-bundle"].configuration.getTheme();
    var documentBody = document.body;
    if(theme === HCB) {
        documentBody.classList.add("hcb-background");
    } else {
        documentBody.classList.remove("hcb-background");
    }

    window.onload =function() {
        //Inform parent when loaded to attach handlers for scroll
        parent.postMessage("Iframe Loaded Successfully", "*");
    };
})();
