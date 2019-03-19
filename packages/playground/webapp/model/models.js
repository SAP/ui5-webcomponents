sap.ui.define([
	"jquery.sap.global",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (jQuery, JSONModel, Device) {
	"use strict";

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

	return {

		createUIModel: function () {
			var oSideNavigationKeys = {
				home: "home",
				apiReference: "api-reference",
				samples: "samples",
				api: "api"
			};

			var model = new JSONModel();
			var data = {
				ui5Image: getRealBaseURI() + "images/ui5.png",
				showSettingsMenu: false,
				showNavigationLinks: false,
				selectedView: "",
				selectedHTMLContent: "",
				selectedKey: "",
				sideNavigationKeys: oSideNavigationKeys,
				navigation: [{
					key: oSideNavigationKeys.home,
					section: oSideNavigationKeys.home,
					title: "Getting Started"
				}, {
					title: "Components",
					key: oSideNavigationKeys.samples,
					items: []
				}],
				fixedNavigation: [{
					title: "Source Code",
					icon: "sap-icon://SAP-icons-TNT/code1",
					url: "https://github.com/SAP/ui5-webcomponents",
					target: "_blank"
				}, {
					title: "Read more...",
					icon: "sap-icon://sys-help",
					url: "https://sap.github.io/ui5-webcomponents",
					target: "_blank"
				}]
			};
			model.setData(data);
			return model;
		},

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createAPIModel: function () {
			var oModel = new JSONModel();
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createComponentsModel: function () {
			var oModel = new JSONModel();
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		discoverSamples: function (oModel) {
			var newComponents = [
				"MessageStrip"
			];
			return jQuery.ajax({
				url: getRealBaseURI() + "/resources/sap/ui/webcomponents/main/playground.json"
			}).then(function (jsonData) {
				var parsedData = jsonData.map(function (value, index) {
					return {
						key: /(.*)\.sample\.html$/.exec(value)[1],
						title: /(.*)\.sample\.html$/.exec(value)[1],
						url: "test-resources/sap/ui/webcomponents/main/api/" + value,
						new: newComponents.indexOf(/(.*)\.sample\.html$/.exec(value)[1]) > -1
					};
				}).sort(function (a, b) {
					return a.title.localeCompare(b.title);
				});
				oModel.setProperty("/navigation/1/items", parsedData);
			});
		}

	};

});