import IconUnicodeToNameMap from "./IconUnicodeToNameMap.js";

const getIconNameByUnicode = unicode => {
	return IconUnicodeToNameMap[unicode];
};

export default getIconNameByUnicode;
