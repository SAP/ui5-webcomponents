let themingRoot = ":root";

const setThemingRoot = root => {
	themingRoot = root;
};

const getThemingRoot = () => themingRoot;

export { setThemingRoot, getThemingRoot };
