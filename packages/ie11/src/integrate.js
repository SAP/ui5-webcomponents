import { attachBeforeBoot } from "@ui5/webcomponents-base/dist/Boot.js";
import { attachBeforeThemeLoaded } from "@ui5/webcomponents-base/dist/theming/ThemeLoaded.js";
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
import { setCreateObserverCallback, setDestroyObserverCallback } from "@ui5/webcomponents-base/dist/DOMObserver.js";
import whenPolyfillLoaded from "./whenPolyfillLoaded.js";
import createComponentStyleTag from "./theming/createComponentStyleTag.js";
import { runPonyfill } from "./theming/CSSVarsPonyfill.js";

// Execute once on boot
attachBeforeBoot(whenPolyfillLoaded);

// Execute on each theme application
attachBeforeThemeLoaded(runPonyfill);

// Execute on each component render
RenderScheduler.attachBeforeComponentRender(createComponentStyleTag);

// Set the custom observer implementation for observe
setCreateObserverCallback(window.ShadyDOM.observeChildren);

// Set the custom observer implementation for unobserve
setDestroyObserverCallback(window.ShadyDOM.unobserveChildren);
