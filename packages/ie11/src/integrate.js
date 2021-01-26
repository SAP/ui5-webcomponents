import { attachBoot } from "@ui5/webcomponents-base/dist/Boot.js";
import { attachThemeLoaded } from "@ui5/webcomponents-base/dist/theming/ThemeLoaded.js";
import { attachBeforeComponentRender } from "@ui5/webcomponents-base/dist/Render.js";
import { setCreateObserverCallback, setDestroyObserverCallback } from "@ui5/webcomponents-base/dist/DOMObserver.js";
import whenPolyfillLoaded from "./whenPolyfillLoaded.js";
import createComponentStyleTag from "./theming/createComponentStyleTag.js";
import { runPonyfill } from "./theming/CSSVarsPonyfill.js";

// Execute once on boot
attachBoot(whenPolyfillLoaded);

// Execute on each theme application
attachThemeLoaded(runPonyfill);

// Execute on each component render
attachBeforeComponentRender(createComponentStyleTag);

// Set the custom observer implementation for observe
setCreateObserverCallback(window.ShadyDOM.observeChildren);

// Set the custom observer implementation for unobserve
setDestroyObserverCallback(window.ShadyDOM.unobserveChildren);
