import customElement from "../decorators/customElement.js";
import property from "../decorators/property.js";
import slot from "../decorators/slot.js";
import Generic from "./Generic.js";

@customElement("ui5-test-generic-ext")
class GenericExt extends Generic {
	@property()
	extProp?: string;

	@property()
	strProp = "Ext";

	@slot()
	extSlot!: Array<HTMLElement>;
}

GenericExt.define();
