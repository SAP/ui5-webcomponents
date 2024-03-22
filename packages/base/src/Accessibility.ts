import HasPopupEnum from "./types/HasPopup.js";

enum AriaAttributes {
	Expanded = "expanded",
	HasPopup = "hasPopup",
	Selected = "selected",
}

type AriaMixin = {
	[AriaAttributes.Selected]: boolean | undefined;
	[AriaAttributes.Expanded]: boolean | undefined;
	[AriaAttributes.HasPopup]: `${HasPopupEnum}` | undefined;
}

function createAccessibilityProxy<T extends Partial<AriaMixin>>(obj: T): T {
	return new Proxy(obj, {
		get: (target, prop) => {
			const value = (target as any)[prop];
			return (value?.toLowerCase() ?? value) as typeof prop;
		},
	});
}

export {
	AriaMixin,
	AriaAttributes,
	createAccessibilityProxy,
};
