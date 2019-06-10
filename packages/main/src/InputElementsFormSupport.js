import FormSupport from "./util/FormSupport.js";
import { registerFeature } from "@ui5/webcomponents-base/src/FeaturesRegistry.js";

// Add form support to the global features registry so that Web Components can find and use it
registerFeature("FormSupport", FormSupport);

export default {};
