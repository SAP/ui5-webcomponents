import { fetchJsonOnce } from "./util/FetchHelper";

const themes = new Map();

const registerThemeBundle = (packageName, themeName, url) => {
    themes.set(`${packageName}_${themeName}`, url);
}

const  fetchThemeBundle = async (packageName, themeName) => {
    const url = themes.get(`${packageName}_${themeName}`);
    return fetchJsonOnce(url);
}

export { registerThemeBundle, fetchThemeBundle };