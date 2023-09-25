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
		"None",
		"Success",
		"Warning",
		"Error",
		"Information"
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

	const colorSchemeContent = document.querySelector("#colorSchemeContent");
	colorSchemes.forEach((value) => {
		colorSchemeContent.insertAdjacentHTML("beforeend", `<ui5-badge interactive color-scheme="${value}">Color Scheme ${value}</ui5-badge><br>`);
		colorSchemeContent.insertAdjacentHTML("beforeend", `<ui5-badge design-type="ColorScheme" color-scheme="${value}">Color Scheme ${value} - design type set</ui5-badge><br>`);

		colorSchemeContent.insertAdjacentHTML("beforeend", `<ui5-badge color-scheme="${value}"><ui5-icon name="lab" slot="icon"></ui5-icon>Color Scheme ${value}</ui5-badge><br>`);
		colorSchemeContent.insertAdjacentHTML("beforeend", `<ui5-badge design-type="ColorScheme" color-scheme="${value}"><ui5-icon name="error" slot="icon"></ui5-icon>Color Scheme ${value} - design type set</ui5-badge><br>`);

		colorSchemeContent.insertAdjacentHTML("beforeend", "<br>");
	});

	const valueStateContent = document.querySelector("#valueStateContent");
	valueStates.forEach((value) => {
		valueStateContent.insertAdjacentHTML("beforeend", `<ui5-badge design-type="ValueState" value-state="${value}">${value}</ui5-badge><br>`);
		valueStateContent.insertAdjacentHTML("beforeend", `<ui5-badge design-type="ValueState" value-state="${value}" show-state-icon>${value} default state icon</ui5-badge><br>`);
		valueStateContent.insertAdjacentHTML("beforeend", `<ui5-badge design-type="ValueState" value-state="${value}" show-state-icon><ui5-icon name="lab" slot="icon"></ui5-icon>${value} custom icon</ui5-badge><br>`);

		valueStateContent.insertAdjacentHTML("beforeend", "<br>");
	});

	const valueStateInvertedContent = document.querySelector("#valueStateInvertedContent");
	valueStates.forEach((value) => {
		valueStateInvertedContent.insertAdjacentHTML("beforeend", `<ui5-badge design-type="ValueStateInverted" value-state="${value}">${value}</ui5-badge><br>`);
		valueStateInvertedContent.insertAdjacentHTML("beforeend", `<ui5-badge design-type="ValueStateInverted" value-state="${value}" show-state-icon>${value} default state icon</ui5-badge><br>`);
		valueStateInvertedContent.insertAdjacentHTML("beforeend", `<ui5-badge design-type="ValueStateInverted" value-state="${value}" show-state-icon><ui5-icon name="lab" slot="icon"></ui5-icon>${value} custom icon</ui5-badge><br>`);

		valueStateInvertedContent.insertAdjacentHTML("beforeend", "<br>");
	});

	const indicationColorSet1Content = document.querySelector("#indicationColorSet1Content");
	indicationColor.forEach((value) => {
		indicationColorSet1Content.insertAdjacentHTML("beforeend", `<ui5-badge design-type="IndicationColorSet1" indication-color="${value}">${value}</ui5-badge><br>`);
	});

	const indicationColorSet2Content = document.querySelector("#indicationColorSet2Content");
	indicationColor.forEach((value) => {
		indicationColorSet2Content.insertAdjacentHTML("beforeend", `<ui5-badge design-type="IndicationColorSet2" indication-color="${value}">${value}</ui5-badge><br>`);
	});
}