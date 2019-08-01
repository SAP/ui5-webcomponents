const extractCSSVars = cssText => {
	const noRoot = cssText.match(/:root{(.*?)}/)[1];
	const pairs = noRoot.split(";");
	const vars = {};
	pairs.forEach(pair => {
		const [varName, varValue] = pair.split(/:\s*/);
		vars[varName] = varValue;
	});
	window.vladi = vars;
	return vars;
};

export default extractCSSVars;
