commit bd184d81a4218328bc7bf04baf2bc1f69a361679
Author: Peter Skelin <petar.skelin@sap.com>
Date:   Wed Nov 16 16:07:30 2022 +0200

    feat: use Typescript for the `base` package (#5982)
    
    Changes:
    - The whole `packages/base/src/` directory (but one file - `packages/base/src/renderer/directives/style-map.js`) is now in Typescript. See the configuration in `packages/base/tsconfig.json`.
     - All types, relevant to the framework, are now described in the respective modules, and reused. See `UI5Element.ts` and `UI5ElementMetadata.ts` for the most important types.
     - Some global variables (e.g. `sap`) are allowed on the `window` object - see `packages/base/global.d.ts`.
     - Some generated files (message bundles) are excluded from Typescript checks (`@ts-ignore` used).
     - General-purpose types (not related to the framework directly) are reused from `packages/base/src/types.ts`.
     - `eslint` is now configured for Typescript. See the typescript-specific configuration in `packages/tools/components-package/eslint.js`.
     - Typescript `enum`s are now used instead of objects for enumeration types.
    
    BREAKING CHANGES:
     - **Important for application developers.** The deprecated `altTag` metadata setting is now removed. All components that were used with the old tags will no longer work.
     Affected components:
     1. `ui5-datepicker` -> use `ui5-date-picker` instead
     2. `ui5-timepicker` -> use `ui5-time-picker` instead
     3. `ui5-busyindicator` -> use `ui5-busy-indicator` instead
     4. `ui5-segmentedbutton` -> use `ui5-segmented-button` instead
     5. `ui5-togglebutton` -> use `ui5-toggle-button` instead
     6. `ui5-radiobutton` -> use `ui5-radio-picker` instead
     7. `ui5-messagestrip` -> use `ui5-message-strip` instead
     - **Important for component developers.** The deprecated `RenderScheduler.js` class is now removed. Use the corresponding methods from `Render.ts` (former `Render.js`).
     Affected methods:
     1. `RenderScheduler.renderDeferred` -> use `renderDeferred` from `Render.ts`
     2. `RenderScheduler.renderImmediately` -> use `renderImmediately` from `Render.ts`
     3. `RenderScheduler.whenFinished` -> use `whenFinished` from `Render.ts`
     - **Important for component developers.** The `animations/` functions have new signatures. They used to have one parameter of type `object` with animation settings inside. Now, the settings are separate parameters, and fewer settings are exposed overall.
     Affected functions:
     1. `slideUp`- has one parameter of type `HTMLElement`. Usage: `slideUp(element)` instead of `slideUp({element})`.
     2. `slideDown`- has one parameter of type `HTMLElement`. Usage: `slideDown(element)` instead of `slideDown({element})`.
     3. `scroll` - has 3 parameters. Usage: `scroll(element, dx, dy)` instead of `scroll({element, dx, dy})`.
     - Some internal base utility functions have been deleted for different reasons: e.g. `setToArray` no longer needed due to the discontinued IE11 support. These changes should have no effect for applications or component developers, but will break code that imported them.
     Deleted files:
     1. `util/setToArray.js`
     2. `util/isDescendantOf.js`
     3. `util/isSlot.js`
     - The `ResizeHandler.ts` and `DOMObserver.ts` classes have been simplified. Functions, allowing to inject custom implementation, have been deleted, as they were only needed by IE11 code. These are: `setCreateObserverCallback`, `setDestroyObserverCallback`, `setResizeHandlerObserveFn`, `setResizeHandlerUnobserveFn`. This change should have no impact on any production code.
     - Some utility modules were renamed.
     Changed files:
     1. `isNodeClickable` => `isElementClickable`
     2. `isNodeHidden` => `isElementHidden`
     3. `isNodeTabbable` => `isElementTabbable`
    
    Fixes: https://github.com/SAP/ui5-webcomponents/issues/6011
