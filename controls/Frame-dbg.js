sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/Control",
	"sap/ui/Device"
], function (jQuery, Control, Device) {
	"use strict";

	var Frame = Control.extend("playground.controls.Frame", {

		metadata: {

			properties: {
				"src": "string",
				"visible": {
					"type": "boolean",
					"defaultValue": true
				},
				"width": "sap.ui.core.CSSSize",
				"height": "sap.ui.core.CSSSize",
				"data": "object",
				"template": "string"
			}
		},

		renderer: function (oRM, oControl) {

			// render the dummy DIV control
			oRM.write("<iframe");
			oRM.writeControlData(oControl);
			oRM.addClass("myFrame");
			oRM.writeClasses();
			oRM.addStyle("height", oControl.getHeight());
			oRM.addStyle("border", "none");

			// this is a hack for non responsive iFrames on iOS
			oRM.addStyle("width", "1px");
			oRM.addStyle("max-width", "100%");
			oRM.addStyle("min-width", "100%");

			if (!oControl.getVisible()) {
				oRM.addStyle("display", "none");
			}

			oRM.writeStyles();

			oRM.writeAttribute("src", oControl.getSrc());

			// hack for not responsive iFrames on iOS
			if (Device.os.ios) {
				oRM.writeAttribute("scrolling", "no");
			}

			oRM.write("></iframe>");
		}

	});

	return Frame;

});