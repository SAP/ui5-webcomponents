import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-ai", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents-ai", fileName: "themes/PromptInput.css.ts", content: `.ai-prompt-input-button{margin-left:.5rem;margin-top:3px}.ai-prompt-input-wrapper{display:flex;flex-direction:column;width:270px}.ai-prompt-input-form-wrapper{display:flex;flex:1}.ai-prompt-input-counter{font-size:.75rem;align-self:flex-end}#input{width:100%}.ai-prompt-inner-input-wrapper{display:flex;flex-direction:column;flex:1}
` };
export default styleData;
//# sourceMappingURL=PromptInput.css.js.map