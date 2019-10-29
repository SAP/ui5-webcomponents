const derivationsFactory = ({ darken, lighten, contrast, fade, saturate, desaturate, mix, spin, concat }) => {
	const derivations = {
		"--sapUiShellBorderColorLighten30": () => lighten("--sapUiShellBorderColor", 30), // rgba(77, 77, 77, 0);
	};

	return derivations;
};

module.exports = derivationsFactory;
