document.addEventListener("DOMContentLoaded", function () {
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
		"10",
	];

	const designTypes = [
		"Set1",
		"Set2",
		"None",
		"Positive",
		"Critical",
		"Negative",
		"Information",
	];

	const clickEvent = (e) => {
		console.error("clicked");
	};

	document.querySelector("#checkboxId").addEventListener("change", e => {
		document.querySelectorAll("ui5-tag").forEach((item) => {
			item.interactive = e.currentTarget.checked;

			if (item.interactive) {
				item.addEventListener("click", clickEvent);
			} else {
				item.removeEventListener("click", clickEvent);
			}
		})
	});

	const set1Content = document.querySelector("#set1Content");
	colorSchemes.forEach((value) => {
		set1Content.insertAdjacentHTML("beforeend", `<ui5-tag design="Set1" color-scheme="${value}">Set 1 - Value - ${value}</ui5-tag>`);
		set1Content.insertAdjacentHTML("beforeend", `<ui5-tag design="Set1" color-scheme="${value}"><ui5-icon name="error" slot="icon"></ui5-icon>Set 1 - Value - ${value}</ui5-tag>`);

		set1Content.insertAdjacentHTML("beforeend", "<br><br>");
	});

	const set2Content = document.querySelector("#set2Content");
	colorSchemes.forEach((value) => {
		set2Content.insertAdjacentHTML("beforeend", `<ui5-tag design="Set2" color-scheme="${value}">Set 2 - Value - ${value}</ui5-tag>`);
		set2Content.insertAdjacentHTML("beforeend", `<ui5-tag design="Set2" color-scheme="${value}"><ui5-icon name="lab" slot="icon"></ui5-icon>Set 2 - Value - ${value}</ui5-tag>`);

		set2Content.insertAdjacentHTML("beforeend", "<br><br>");
	});
});
