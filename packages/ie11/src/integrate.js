import { attachBoot } from "@ui5/webcomponents-base/dist/Boot.js";
import { attachThemeLoaded } from "@ui5/webcomponents-base/dist/theming/ThemeLoaded.js";
import { attachBeforeComponentRender } from "@ui5/webcomponents-base/dist/Render.js";
import { setCreateObserverCallback, setDestroyObserverCallback } from "@ui5/webcomponents-base/dist/DOMObserver.js";
import { setResizeHandlerObserveFn, setResizeHandlerUnobserveFn } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import whenPolyfillLoaded from "./whenPolyfillLoaded.js";
import createComponentStyleTag from "./theming/createComponentStyleTag.js";
import { runPonyfill } from "./theming/CSSVarsPonyfill.js";
import { customObserve, customUnobserve } from "./CustomResize.js";

// Execute once on boot
attachBoot(whenPolyfillLoaded);

// Execute on each theme application
attachThemeLoaded(runPonyfill);

// Execute on each component render
attachBeforeComponentRender(createComponentStyleTag);

// Set the custom DOM observer implementation for observe/unobserve
const observeChildrenMethod = window.ShadyDOM ? window.ShadyDOM.observeChildren : undefined;
const unobserveChildrenMethod = window.ShadyDOM ? window.ShadyDOM.unobserveChildren : undefined;
setCreateObserverCallback(observeChildrenMethod);
setDestroyObserverCallback(unobserveChildrenMethod);

// Set the custom Resize observer implementation for observe/unobserve
setResizeHandlerObserveFn(customObserve);
setResizeHandlerUnobserveFn(customUnobserve);
