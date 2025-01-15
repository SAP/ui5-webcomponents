import { writeFile, readFile, mkdir } from "fs/promises";
import * as path from "path";
import assets from "../../assets-meta.js";

const readOldContent = async (fileName) => {
    // it seems slower to read the old content, but writing the same content with no real changes
    // (as in initial build and then watch mode) will cause an unnecessary dev server refresh
    let oldContent = "";
    try {
        oldContent = (await readFile(fileName)).toString();
    } catch (e) {
        // file not found
    }
    return oldContent;
}

const writeFileIfChanged = async (fileName, content) => {
    const oldContent = await readOldContent(fileName);
    if (content !== oldContent) {
        if (!oldContent) {
            await mkdir(path.dirname(fileName), {recursive: true});
        }
        return writeFile(fileName, content);
    }
}

// strips the unnecessary theming data coming from @sap-theming/theming-base-content and leaves only the css parameters
const stripThemingBaseContent = css => {
	css = css.replace(/\.sapThemeMeta[\s\S]*?:root/, ":root");
	css = css.replace(/\.background-image.*{.*}/, "");
	css = css.replace(/\.sapContrast[ ]*:root[\s\S]*?}/, "");
	css = css.replace(/--sapFontUrl.*\);?/, "");
	return css;
}


const DEFAULT_THEME = assets.themes.default;

const getDefaultThemeCode = packageName => {
	return `import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/${DEFAULT_THEME}/parameters-bundle.css.js";
import defaultTheme from "./${DEFAULT_THEME}/parameters-bundle.css.js";

registerThemePropertiesLoader("@ui5/webcomponents-theming", "${DEFAULT_THEME}", async () => defaultThemeBase);
registerThemePropertiesLoader("${packageName}", "${DEFAULT_THEME}", async () => defaultTheme);
`;
};

const getFileContent = (packageName, css, includeDefaultTheme) => {
	const defaultTheme = includeDefaultTheme ? getDefaultThemeCode(packageName) : "";
	return `${defaultTheme}export default ${css.trim()}`
}


export { writeFileIfChanged, stripThemingBaseContent, getFileContent}