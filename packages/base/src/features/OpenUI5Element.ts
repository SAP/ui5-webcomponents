import UI5Element from "../UI5Element.js";

class OpenUI5Element extends UI5Element {
	__isBusy?: boolean;
	isOpenUI5Component?: boolean;
	__suppressFocusIn?: Function;
	__suppressFocusBack?: Function;
	__redirectFocus?: boolean;
}

export default OpenUI5Element;
