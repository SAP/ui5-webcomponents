import { hasStyle, createStyle } from "./ManagedStyles.js";

const systemCSSVars = `
	:root {
		--_ui5_content_density:cozy;
	}

	[data-ui5-compact-size],
	.ui5-content-density-compact,
	.sapUiSizeCompact {
		--_ui5_content_density:compact;
	}

	[dir="rtl"] {
		--_ui5_dir:rtl;
	}

	[dir="ltr"] {
		--_ui5_dir:ltr;
	}
`;

const insertSystemCSSVars = () => {
	if (!hasStyle("data-ui5-system-css-vars")) {
		createStyle(systemCSSVars, "data-ui5-system-css-vars");
	}
};

export default insertSystemCSSVars;
