import { registerFeature } from "@ui5/webcomponents-base/src/FeaturesRegistry.js";
import Suggestions from "./Suggestions.js";

// Add suggestions support to the global features registry so that Input.js can use it
registerFeature("InputSuggestions", Suggestions);

export default {};
