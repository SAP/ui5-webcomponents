sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/core/IconPool",
	"playground/model/models",
	"sap/base/util/UriParameters",
	"sap/ui/core/routing/Router",
	"sap/ui/core/ComponentSupport", // => include in custom bundle!
	"sap/m/routing/Router" // => include in custom bundle!
], function (UIComponent, IconPool, models, UriParameters, Router) {
	"use strict";
	var popstateHandler;
	function urlToRoute (url) {
		// part after playground
		var endPath = url.split("/playground/")[1];
		// strip trailing slash
		return endPath.replace(/\/$/, "");
	};

	function routeToURL (route) {
		if (route) {
			return getRealBaseURI() + "playground/" + route + "/";
		} else {
			return getRealBaseURI() + "playground/";
		}
	}

	function getRealBaseURI() {
		var baseURI = document.baseURI;
		// var basePath = new URL(document.baseURI).pathname
		// strip any url parameters
		baseURI = baseURI.split("?")[0];
		var isComponentPage = /\/components\/\w+\//.test(baseURI);
		if (isComponentPage) {
			return baseURI.split("playground/components")[0]
		} else {
			// ends with "/playground/" or has unknown path after it
			return baseURI.split("playground/")[0]
		}
	}

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
			this.patchRouter();

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

		patchRouter: function () {
			// add additional initialization logic
			Router.prototype.initialize = function () {
				this._bIsInitialized = true;
				//initializeOrig.apply(this);
				// stop the hash change listener
				this.stop();
				// do initial routing (if there is a path) - updates the UI according to the config
				this.parse(urlToRoute(location.pathname));
				// attach listener for route changes via the browser back/forward buttons
				popstateHandler = (function (event) {
					console.log("popstate:", document.location.pathname);
					// trigger the UI update logic for the new path
					this.parse(urlToRoute(document.location.pathname));
				}).bind(this);
				window.addEventListener('popstate', popstateHandler);
				return this;
			}

			var navToOrig = sap.ui.core.routing.Router.prototype.navTo;
			// called by apps to change the route
			sap.ui.core.routing.Router.prototype.navTo = function (sName, oParameters) {
				// calculate the path based on the parameters
				var path = this.getURL(sName, oParameters);
				console.log("navTo:", path);
				// update the URL entry
				window.history.pushState({}, undefined, routeToURL(path));
				// trigger the UI update logic for the new path
				this.parse(path);
			}
		},

		selectView: function(sComponent) {
			if (sComponent) {
				this.getModel().getProperty("/navigation/1/items").forEach(function(oComponent) {
					if (oComponent.key === sComponent) {
						// set title
						document.title = "" + sComponent + " - UI5 Web Components";
						this.getModel().setProperty("/showNavigationLinks", true);
						var sFrameUrlParameters = this.getModel().getProperty("/selectedView").slice(
							this.getModel().getProperty("/selectedView").indexOf("?") + 1,
							this.getModel().getProperty("/selectedView").length);
						this.getModel().setProperty("/selectedKey", sComponent);
						this.getModel().setProperty("/selectedView", getRealBaseURI() + oComponent.url + (sFrameUrlParameters ? "?" + sFrameUrlParameters : ""));
					}
				}.bind(this));
			} else {
				document.title = "Home - UI5 Web Components";
				this.getModel().setProperty("/showNavigationLinks", false);
				this.getModel().setProperty("/selectedView", getRealBaseURI() + "www/home/");
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