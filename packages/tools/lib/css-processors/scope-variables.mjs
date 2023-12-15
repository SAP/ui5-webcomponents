
const scopeVariables = (cssText, packageJSON) => {
    const escapeVersion = version => "v" + version?.replaceAll(/[^0-9A-Za-z\-_]/g, "-");
    const versionStr = escapeVersion(packageJSON.version);
    const expr = /(--_?ui5)([^\,\:\)\s]+)/g;

    return cssText.replaceAll(expr, `$1-${versionStr}$2`);
}

export default scopeVariables;

