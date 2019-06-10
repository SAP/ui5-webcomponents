import { registerFeature } from "@ui5/webcomponents-base/src/FeaturesRegistry.js";
import FormSupport from "./util/FormSupport.js";

// Add form support to the global features registry so that Web Components can find and use it
registerFeature("FormSupport", FormSupport);

export default {};
