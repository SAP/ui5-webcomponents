document.addEventListener("DOMContentLoaded", function(event) {
	var menuBtn = document.getElementById("menu-btn");
	var mutated = false;
	var sideNav = document.getElementById("side-nav");
	var mainContent = document.getElementById("main-content");
	var Configuration = window["sap-ui-webcomponents-main-bundle"].configuration;
	var COMPACT = Configuration.getCompactSize();
	var RTL = Configuration.getRTL();
	var THEME = Configuration.getTheme();
	var HCB = "sap_belize_hcb";
	var FIORI3 = "sap_fiori_3";
	var btnRTL = document.getElementById("btnRTL");
	var btnCompact = document.getElementById("btnCompact");
	var btnTheme = document.getElementById("btnTheme");

	if (THEME === HCB) {
		document.body.style.backgroundColor = "#333";
	} else {
		document.body.style.backgroundColor = "#fff";
	}

	if (RTL) {
		document.body.setAttribute("dir", "rtl");
	} else {
		document.body.removeAttribute("dir");
	}

	/* SideNav */
	function toggleSideNav(toggle) {
		if (toggle) {
			openNav();
		} else {
			closeNav();
		}
	}
	function openNav() {
		sideNav.style.width = "14rem";
		mainContent.style.marginLeft = "14rem";
	}

	function closeNav() {
		sideNav.style.width = "0";
		mainContent.style.marginLeft= "0";
	}

	function buildParam(compact, rtl, theme) {
		return "kitchen.html?sap-ui-theme=" + theme + "&sap-ui-compactSize=" + !!compact + "&sap-ui-rtl=" + !!rtl;
	}

	btnRTL.pressed = !!RTL;
	btnCompact.pressed = !!COMPACT;
	btnTheme.pressed = !!(THEME === HCB);

	btnRTL.addEventListener('press', function(e) {
		var param = buildParam(btnCompact.pressed, e.target.pressed, THEME);
		var currentURL = window.location.href;
		var newURL = currentURL.slice(0, currentURL.indexOf("kitchen")) + param;

		window.location.href = newURL;
	}, false);

	btnCompact.addEventListener('press', function(e) {
		var param = buildParam(e.target.pressed, btnRTL.pressed, THEME);
		var currentURL = window.location.href;
		var newURL = currentURL.slice(0, currentURL.indexOf("kitchen")) + param;

		window.location.href = newURL;
	}, false);

	btnTheme.addEventListener('press', function(e) {
		var theme = e.target.pressed ? HCB : FIORI3;
		Configuration.setTheme(theme);

		if (theme === HCB) {
			document.body.style.backgroundColor = "#333";
		} else {
			document.body.style.backgroundColor = "#fff";
		}
	}, false);

	menuBtn.addEventListener('press', function(event) {
		toggleSideNav(event.detail.pressed);
	});

	/* Popover */
	var popover = document.getElementById("hello-popover");
	var popoverOpener = document.getElementById("openPopoverButton");
	var popoverCloser = document.getElementById("closePopoverButton");

	popoverOpener.addEventListener("press", function() {
		popover.openBy(popoverOpener);
	});
	popoverCloser.addEventListener("press", function() {
		popover.close();
	});

	/* Dialog */
	var dialog = document.getElementById("hello-dialog");
	var dialog2 = document.getElementById("hello-dialog2");
	var dialogOpener = document.getElementById("openDialogButton");
	var dialogOpener2 = document.getElementById("openDialogStretched");
	var dialogCloser = document.getElementById("closeDialogButton");
	var dialogCloser2 = document.getElementById("closeDialogStretched");


	dialogOpener.addEventListener("press", function() {
		dialog.open();
	});
	dialogOpener2.addEventListener("press", function() {
		dialog2.open();
	});
	dialogCloser.addEventListener("press", function() {
		dialog.close();
	});
	dialogCloser2.addEventListener("press", function() {
		dialog2.close();
	});

	/* List */
	var list = document.getElementById('myList');
	var resetBtn = document.getElementById('button1');
	var items = [{id: "ar", name: "Argentina"}, {id: "bg", name: "Bulgaria"}, {id: "ch", name: "China"}];

	var cleanList = function cleanList() {
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}
	};

	var fillList = function fillList(items) {
		var li;
		items.forEach(function(item) {
			li = document.createElement("ui5-li");
			li.id = item.id;
			li.textContent = item.name;
			list.appendChild(li)
		});
	};

	var resetList = function resetList() {
		if (!mutated) {
			return;
		}

		mutated = false;
		cleanList();
		fillList(items);
	};

	list.addEventListener("itemDelete", function (event) {
		var item = event.detail.item;
		list.items.forEach(function(listItem) {
			if (listItem === item) {
				list.removeChild(listItem);
			}
		});

		mutated = true;
	});

	resetBtn.addEventListener("press", resetList);
	/* Suggestions */
	var sap_database_entries = [{ key: "Afg", text: "Anna" }, { key: "Arg", text: "Anelia" }, { key: "Alex", text: "Ally" }, { key: "Arm", text: "Boris" }, { key: "Alg", text: "Borg" }, { key: "And", text: "Cindy" }, { key: "Ang", text: "Sara" }, { key: "Ast", text: "Sally" }, { key: "Aus", text: "Daniel" }, { key: "Aze", text: "Don" }, { key: "Aruba", text: "Ema" }, { key: "Antigua", text: "Fred" }, { key: "Bel", text: "John" }, { key: "Bel", text: "Jonathan" }, { key: "Bg", text: "Zack" }, { key: "Bra", text: "Zara" }, { key: "Bra", text: "Wolly"}, { key: "Bra", text: "Will"}, { key: "Bra", text: "Quentin"}];
	var input = document.getElementById('user');

	input.addEventListener("input", function (event) {
		var value = event.target.value;
		var suggestionItems = [];

		if (value) {
			suggestionItems = sap_database_entries.filter(function (item) {
				return item.text.toUpperCase().indexOf(value.toUpperCase()) === 0;
			});
		}


		[].slice.call(input.children).forEach(function(child) {
			if (child.id !== "user-icon") {
				input.removeChild(child);
			}
		});


		suggestionItems.forEach(function(item) {
			var li = document.createElement("ui5-li");
			li.type = "Active";
			li.id = item.key;
			li.textContent = item.text;
			input.appendChild(li);
		});
	});
});
