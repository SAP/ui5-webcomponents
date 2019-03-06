sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/core/IconPool",
	"playground/model/models",
	"sap/base/util/UriParameters",
	"sap/ui/core/ComponentSupport", // => include in custom bundle!
	"sap/m/routing/Router" // => include in custom bundle!
], function (UIComponent, IconPool, models, UriParameters) {
	"use strict";

	return UIComponent.extend("playground.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// load additional fonts
			// TODO: declarative registration of icon fonts?
			IconPool.registerFont({
				fontFamily: "SAP-icons-TNT",
				fontURI: jQuery.sap.getModulePath("sap.tnt.themes.base.fonts")
			});

			// set the UI model
			this.setModel(models.createUIModel());

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// sets the documentation model
			this.setModel(models.createAPIModel(), "api");

			// sets the components model
			this.setModel(models.createComponentsModel(), "components");

			// register the pattern matchers
			this.getRouter().getRoute("home").attachPatternMatched("patternMatched", function (oEvent) {
				this.selectView();
			}, this);
			this.getRouter().getRoute("components").attachPatternMatched("patternMatched", function (oEvent) {
				this.selectView(oEvent.getParameter("arguments").componentId);
			}, this);

			// create the views based on the url/hash
			models.discoverSamples(this.getModel()).then(function() {
				this.getRouter().initialize();
			}.bind(this));

		},

		selectView: function(sComponent) {
			if (sComponent) {
				this.getModel().getProperty("/navigation/1/items").forEach(function(oComponent) {
					if (oComponent.key === sComponent) {
						this.getModel().setProperty("/showNavigationLinks", true);
						var sFrameUrlParameters = this.getModel().getProperty("/selectedView").slice(
							this.getModel().getProperty("/selectedView").indexOf("?") + 1,
							this.getModel().getProperty("/selectedView").length);
						this.getModel().setProperty("/selectedKey", sComponent);
						this.getModel().setProperty("/selectedView", oComponent.url + (sFrameUrlParameters ? "?" + sFrameUrlParameters : ""));
					}
				}.bind(this));
			} else {
				this.getModel().setProperty("/showNavigationLinks", false);
				this.getModel().setProperty("/selectedView", "www/home/index.html");
			}
		},

		getFrameUrlParmaters: function() {
			var oParameters = new UriParameters(window.location.href);
			return Object.keys(oParameters.mParams).map(function(param) {
				if (param.startsWith("frame-")) {
					return param.replace("frame-", "") + "=" + oParameters.get(param);
				}
			}).join("&");
		}

	});

});