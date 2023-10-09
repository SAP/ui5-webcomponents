function initializeBadges() {
	const designTypes = [
		"ColorScheme",
		"ValueState",
		"ValueStateInverted",
		"IndicationColorSet1",
		"IndicationColorSet2"
	];

	const colorSchemes = [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10"
	];

	const valueStates = [
		"none",
		"success",
		"warning",
		"error",
		"information"
	];

	const indicationColor = [
		"DarkRed",
		"Red",
		"Yellow",
		"Teal",
		"Purple",
		"Pink",
		"BlackAndWhite",
		"Grey"
	];

	const clickEvent = (e) => {
		console.error("clicked");
	};

	document.querySelector("#checkboxId").addEventListener("change", e => {
		document.querySelectorAll(".ui5-badge:not(button)").forEach((item) => {

			if (e.currentTarget.checked) {
				item.setAttribute("tabindex", "0");
				item.addEventListener("click", clickEvent);
			} else {
				item.removeAttribute("tabindex");
				item.removeEventListener("click", clickEvent);
			}
		})
	});


	const colorSchemeContent = document.querySelector("#colorSchemeContent");
	colorSchemes.forEach((value) => {
		colorSchemeContent.insertAdjacentHTML("beforeend", `<div class="ui5-badge ui5-badge-color-scheme-${value}">Color Scheme ${value}</div>`);
		colorSchemeContent.insertAdjacentHTML("beforeend", `<div class="ui5-badge ui5-badge-color-scheme-${value}"><ui5-icon name="lab"></ui5-icon>Color Scheme ${value}</div>`);

		colorSchemeContent.insertAdjacentHTML("beforeend", "<br><br>");
	});


	const valueStateContent = document.querySelector("#valueStateContent");
	valueStates.forEach((value) => {
		valueStateContent.insertAdjacentHTML("beforeend", `<div class="ui5-badge ui5-badge-value-state-${value}">${value}</div>`);
		valueStateContent.insertAdjacentHTML("beforeend", `<div class="ui5-badge ui5-badge-value-state-${value}"><ui5-icon name="lab"></ui5-icon>${value}</div>`);

		valueStateContent.insertAdjacentHTML("beforeend", `<button onclick="console.error('button click')" class="ui5-badge ui5-badge-value-state-${value}">Button ${value}</button>`);
		valueStateContent.insertAdjacentHTML("beforeend", `<button onclick="console.error('button click')" class="ui5-badge ui5-badge-value-state-${value}"><ui5-icon name="lab"></ui5-icon> Button ${value}</button>`);

		valueStateContent.insertAdjacentHTML("beforeend", "<br><br>");
	});

	return;


	const indicationColorSet1Content = document.querySelector("#indicationColorSet1Content");
	indicationColor.forEach((value) => {
		indicationColorSet1Content.insertAdjacentHTML("beforeend", `<ui5-badge design-type="IndicationColorSet1" indication-color="${value}">${value}</ui5-badge><br>`);
	});

	const indicationColorSet2Content = document.querySelector("#indicationColorSet2Content");
	indicationColor.forEach((value) => {
		indicationColorSet2Content.insertAdjacentHTML("beforeend", `<ui5-badge design-type="IndicationColorSet2" indication-color="${value}">${value}</ui5-badge><br>`);
	});
}