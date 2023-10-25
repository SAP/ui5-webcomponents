import { DEFAULT_THEME } from "../generated/AssetParameters.js";
import { StyleData, StyleDataCSP } from "../types.js";
import { fireThemeRegistered } from "../theming/ThemeRegistered.js";

type ThemeData = {_: StyleDataCSP } | StyleDataCSP | string;
type ThemeLoader = (themeName: string) => Promise<ThemeData>;

const themeStyles = new Map<string, StyleData>();
const customThemeStyles = new Map<string, StyleData>();
const loaders = new Map<string, ThemeLoader>();
const customLoaders = new Map<string, ThemeLoader>();
const registeredPackages = new Set<string>();
const registeredThemes = new Set<string>();

const registerThemePropertiesLoader = (packageName: string, themeName: string, loader: ThemeLoader) => {
	loaders.set(`${packageName}/${themeName}`, loader);
	registeredPackages.add(packageName);
	registeredThemes.add(themeName);
	fireThemeRegistered(themeName);
};

const registerCustomThemePropertiesLoader = (packageName: string, themeName: string, loader: ThemeLoader) => {
	customLoaders.set(`${packageName}/${themeName}`, loader);
};

const mergeStyles = (style1?: StyleData, style2?: StyleData) => {
	if (style1 === undefined) {
		return style2;
	}
	if (style2 === undefined) {
		return style1;
	}
	const style2Content = typeof style2 === "string" ? style2 : style2.content;
	if (typeof style1 === "string") {
		return `${style1} ${style2Content}`;
	}
	return {
		content: `${style1.content} ${style2Content}`,
		packageName: style1.packageName,
		fileName: style1.fileName,
	};
};

const getThemeProperties = async (packageName: string, themeName: string, externalThemeName?: string) => {
	let style = themeStyles.get(`${packageName}_${themeName}`);
	let customStyle = externalThemeName ? customThemeStyles.get(`${packageName}_${externalThemeName}`) : undefined;
	if (style !== undefined) { // it's valid for style to be an empty string
		return mergeStyles(style, customStyle);
	}

	if (!registeredThemes.has(themeName)) {
		const regThemesStr = [...registeredThemes.values()].join(", ");
		console.warn(`You have requested a non-registered theme ${themeName} - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
		return _getThemeProperties(packageName, DEFAULT_THEME);
	}

	if (externalThemeName) {
		[style, customStyle] = await Promise.all([
			_getThemeProperties(packageName, themeName),
			_getCustomThemeProperties(packageName, externalThemeName),
		]);
		return mergeStyles(style, customStyle);
	}

	return _getThemeProperties(packageName, themeName);
};

const _getThemeProperties = async (packageName: string, themeName: string) => {
	const loader = loaders.get(`${packageName}/${themeName}`);
	if (!loader) {
		// no themes for package
		console.error(`Theme [${themeName}] not registered for package [${packageName}]`); /* eslint-disable-line */
		return;
	}
	let data;
	try {
		data = await loader(themeName);
	} catch (error: unknown) {
		const e = error as Error;
		console.error(packageName, e.message); /* eslint-disable-line */
		return;
	}
	const themeProps = (data as {_: StyleDataCSP})._ || data; // Refactor: remove _ everywhere

	themeStyles.set(`${packageName}_${themeName}`, themeProps);
	return themeProps;
};

const _getCustomThemeProperties = async (packageName: string, themeName: string) => {
	const loader = customLoaders.get(`${packageName}/${themeName}`);
	if (!loader) {
		return;
	}
	let data;
	try {
		data = await loader(themeName);
	} catch (error: unknown) {
		const e = error as Error;
		console.error(packageName, e.message); /* eslint-disable-line */
		return;
	}
	const themeProps = (data as {_: StyleDataCSP})._ || data; // Refactor: remove _ everywhere

	customThemeStyles.set(`${packageName}_${themeName}`, themeProps);
	return themeProps;
};

const getRegisteredPackages = () => {
	return registeredPackages;
};

const isThemeRegistered = (theme: string) => {
	return registeredThemes.has(theme);
};

export {
	registerThemePropertiesLoader,
	registerCustomThemePropertiesLoader,
	getThemeProperties,
	getRegisteredPackages,
	isThemeRegistered,
};

export type {
	ThemeData,
	ThemeLoader,
};
