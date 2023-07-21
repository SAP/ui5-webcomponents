const M_ISO639_OLD_TO_NEW = {
	"iw": "he",
	"ji": "yi",
};

const getModernLanguage = (sLanguage: string) => {
	return M_ISO639_OLD_TO_NEW[sLanguage as keyof typeof M_ISO639_OLD_TO_NEW] || sLanguage;
};

const Localization = {
	getModernLanguage,
};

export default Localization;
