sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device",
], function (Controller, Device) {
	"use strict";

	return Controller.extend("playground.controller.Main", {

		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("components").attachPatternMatched("patternMatched", 	this.updateSelectedItem, this);
			this.navList = this.getView().byId("nl");
			this.isSystemPhone = Device.system.phone;
			this.selectedItemDOMRef = null;
			this.CLASS_ITEM_SELECTED = "sapTntNavLIItemSelected";

			var debounce = this.debounce;
			var scrollHandler = this.scrollHandler;

			var oNavigationListAfterRenderingDelegate = {
				onAfterRendering: this.updateSelectedItem.bind(this)
			};
			this.navList.addEventDelegate(oNavigationListAfterRenderingDelegate);

			// Select initially the first link
			this.getView().byId("links-list").getItems()[0].addStyleClass("selected-link");

			//Change selected link on scroll
			window.addEventListener("message", function(oEvent) {
				var iframe = document.getElementsByClassName("content-iframe")[0].contentDocument;

				var debouncedScrollHandler = debounce(scrollHandler, 0);
				iframe.addEventListener("scroll", function(oEvent) {
					debouncedScrollHandler();
				});
			}, false);
		},

		onAfterRendering: function() {
			var newComponents = [
				"Select",
				"ShellBar",
				"Timeline"
			];

			this.byId("nl").getItems()[1].getItems().forEach(function(item) {
				if (newComponents.indexOf(item.getText()) !== -1) {
					var newLabel = document.createElement("div");
					newLabel.textContent = "NEW";
					newLabel.classList.add("new-label");

					item.getDomRef().appendChild(newLabel);
				}
			}.bind(this));
		},

		debounce: function(func, delay) {
			var inDebounce;
			return function() {
				var context = this;
				var args = arguments;
				clearTimeout(inDebounce);
				inDebounce = setTimeout(function() {
					func.apply(context, args);
				}, delay);
			}
		},

		scrollHandler: function() {
			var iframe = document.getElementsByClassName("content-iframe")[0].contentDocument;
			var APIHeader = iframe.querySelector(".comment-api-title");
			var links = document.querySelectorAll(".links-list li");

			if (APIHeader.offsetTop <= $(iframe).scrollTop()) {
				links[0].classList.remove("selected-link");
				links[1].classList.add("selected-link");
			} else {
				links[0].classList.add("selected-link");
				links[1].classList.remove("selected-link");
			}
		},

		itemSelect: function (oEvent) {
			var oContext = oEvent.getParameter("item").getBindingContext();
			var sUrl = oContext.getProperty("url");
			var toolPage = this.byId("app");

			if (sUrl) {
				this.oRouter.navTo("components", {
					"componentId": oContext.getProperty("key")
				});
			} else {
				this.oRouter.navTo("home");
			}

			if (this.isSystemPhone) {
				toolPage.setSideExpanded(false);
			}
		},

		onSideNavButtonPress: function () {
			var toolPage = this.byId("app");
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		onUI5LogoPressed: function () {
			window.location.href = this._getHomeURL();
		},

		_getHomeURL: function() {
			if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
				return 	"/index.html";
			}

			return "/ui5-webcomponents/index.html";
		},

		// Workaround for selecting menu item upon page reload.
		// Remove after openui5 > 1.62, when the NavigationList 'selectedkey' property of is introduced
		// and replace with <NavigationList selectedKey={'/selectedKey'} />.
		updateSelectedItem: function() {
			var model = this.getOwnerComponent().getModel();
			var selectedKey = model.getProperty("/selectedKey"); // the selectedKey, based on the route matched.
			var components = this.navList.getItems()[1].getItems() || []; // the side navigation items - Button, CheckBox, DatePicker, etc.
			var selectedItem;

			if (this.selectedItemDOMRef) { // toggle previously selected
				this.selectedItemDOMRef.classList.remove("sapTntNavLIItemSelected");
			}

			var itemsWithMatchedKey = components.filter(function(item) { // compare the items` keys with the current route.
				return item.getKey() === selectedKey;
			});

			if (itemsWithMatchedKey.length) {
				selectedItem = itemsWithMatchedKey[0].getDomRef();
			}

			if (selectedItem) {
				this.selectedItemDOMRef = selectedItem;
				this.selectedItemDOMRef.classList.add("sapTntNavLIItemSelected");
			}
		},

		toggleSettingsMenu: function() {
			var model = this.getOwnerComponent().getModel();
			model.setProperty("/showSettingsMenu", !model.getProperty("/showSettingsMenu"));	
		},

		closeSettingsMenu: function() {
			var model = this.getOwnerComponent().getModel();
			model.setProperty("/showSettingsMenu", false);
		},

		applyChangeSettings: function() {
			var model = this.getOwnerComponent().getModel();
			var iframe = $("iframe")[0];
			var parameters = [];
			var documentBody = document.body;
			var URLLength; 
			var currentURL = model.getProperty("/selectedView");
			var URL;

			if (!iframe) {
				return;
			}
			URLLength = currentURL.indexOf("?") === -1 ? currentURL.length : currentURL.indexOf("?")
			URL = currentURL.slice(0, URLLength);
			
			parameters.push({
				name: "sap-ui-theme",
				value: this.byId("theme-cb").getSelectedItem().getKey() || "sap_fiori_3"
			});
			parameters.push({
				name: "sap-ui-compactSize",
				value: this.byId("content-densit-cb").getSelectedItem().getKey() || "false"
			});
			parameters.push({
				name: "sap-ui-rtl",
				value: this.byId("direction-cb").getSelectedItem().getKey() || "false"
			});

			if (parameters.length) {
				URL += "?";
				URL += parameters.map(function(param) {
					return param.name + "=" + param.value;
				}).join("&");
			}

			model.setProperty("/selectedView", "");
			model.setProperty("/selectedView", URL);

			if (this.byId("theme-cb").getSelectedItem().getKey() === "sap_belize_hcb") {
				documentBody.classList.add("hcb");
			} else {
				documentBody.classList.remove("hcb");
			}
			this.closeSettingsMenu();
		},

		onLinkPressed: function(event) {
			var selectedLink = event.getParameters().listItem.getText().toLowerCase();
			var linkToNavigate;

			//Close settings menu
			this.getOwnerComponent().getModel().setProperty("/showSettingsMenu", false);

			switch (selectedLink) {
				case "samples": 
					linkToNavigate = "body";
					break;
				case "api reference":
					linkToNavigate = ".comment-api-title";
					break;
				default:
					break;
			}

			//Wait for settings menu to hide
			setTimeout(function() {
				document.querySelector(".content-iframe").contentDocument.querySelector(linkToNavigate).scrollIntoView({
					behavior:"smooth",
					block: "start"
				});
			}, 0);
		}
	});
});