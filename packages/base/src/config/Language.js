import { _getLanguage } from "../InitialConfiguration.js";
import getDesigntimePropertyAsArray from "../util/getDesigntimePropertyAsArray.js";

const language = _getLanguage();

const getLanguage = () => {
	return language;
};

const getSupportedLanguages = () => {
	return getDesigntimePropertyAsArray("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$");
};

export {
	getLanguage,
	getSupportedLanguages,
};
