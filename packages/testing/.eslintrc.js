import { config } from "@ui5/webcomponents-tools/components-package/eslint.js";

import testEslint from "./src/eslint.cjs";

testEslint.forEach(override => {
	config.overrides?.push(override);
});

export default config;
