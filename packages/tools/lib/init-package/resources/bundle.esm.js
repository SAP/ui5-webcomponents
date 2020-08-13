// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

// ESM bundle targets Edge + browsers with native support
import "@ui5/webcomponents-base/dist/features/browsersupport/Edge.js";

// used in test pages
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";

import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getNoConflict, setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";

// Enable additional themes and i18n texts
import "./dist/Assets.js";

// Import your web components here from the dist/ directory
import "./dist/INIT_PACKAGE_VAR_CLASS_NAME.js";

window.RenderScheduler = RenderScheduler;
window["sap-ui-webcomponents-bundle"] = {
	configuration: {
		getAnimationMode,
		getLanguage,
		getTheme,
		setTheme,
		getNoConflict,
		setNoConflict,
		getCalendarType,
		getRTL,
		getFirstDayOfWeek,
	},
};
