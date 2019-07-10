sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/Control"
], function (jQuery, Control) {
	"use strict";

	var HTML = Control.extend("playground.controls.HTML", {

		metadata: {

			properties: {
				"content": "string",
				"width": "sap.ui.core.CSSSize",
				"height": "sap.ui.core.CSSSize"
			}
		},

		renderer: function (oRM, oControl) {

			// render the dummy DIV control
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("htmlWrapper");
			oRM.writeClasses();
			oRM.addStyle("width", oControl.getWidth());
			oRM.addStyle("height", oControl.getHeight());

			if (!oControl.getVisible()) {
				oRM.addStyle("display", "none");
			}

			oRM.writeStyles();
			oRM.write(">");
				oRM.write(oControl.getContent());
			oRM.write("</div>");
		}

	});

	return HTML;

});