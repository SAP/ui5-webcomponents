# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0...v2.0.1) (2024-07-05)


### Bug Fixes

* **ui5-notification-list:** fixed show more test ([#9400](https://github.com/SAP/ui5-webcomponents/issues/9400)) ([c19c5e3](https://github.com/SAP/ui5-webcomponents/commit/c19c5e3f3a756bdd8323a73b59c94b44167f16f7))





# [2.0.0](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.6...v2.0.0) (2024-07-03)


### Bug Fixes

* **dynamic-page:** some remarks fixed ([#9341](https://github.com/SAP/ui5-webcomponents/issues/9341)) ([eb99114](https://github.com/SAP/ui5-webcomponents/commit/eb991145f0029d00c41c37a1b3a7e1e7229be647))
* **ui5-tag:** fix styling issues ([#9305](https://github.com/SAP/ui5-webcomponents/issues/9305)) ([24dd42b](https://github.com/SAP/ui5-webcomponents/commit/24dd42b16f6889f9ea54402f4b664c84fdf92bfa))


### Code Refactoring

* **ui5-illustrated-message:** rename IllustrationMessageSize enum ([#9302](https://github.com/SAP/ui5-webcomponents/issues/9302)) ([6fe2a02](https://github.com/SAP/ui5-webcomponents/commit/6fe2a023772f34550a3d7f433017b1f8f2c5cd0c)), closes [#8605](https://github.com/SAP/ui5-webcomponents/issues/8605) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#7887](https://github.com/SAP/ui5-webcomponents/issues/7887)
* **ui5-view-settings-dialog:** change opening api to open property ([#9249](https://github.com/SAP/ui5-webcomponents/issues/9249)) ([52106cc](https://github.com/SAP/ui5-webcomponents/commit/52106ccffba64d13949764339a71225b33dac3a3))


### Features

* add property initializers ([#8846](https://github.com/SAP/ui5-webcomponents/issues/8846)) ([eef0cc9](https://github.com/SAP/ui5-webcomponents/commit/eef0cc9b663fda6268b98e516ed46439435fa2b0))
* **ui5-flexible-column-layout:** enable resize via separators drag-and-drop ([#9160](https://github.com/SAP/ui5-webcomponents/issues/9160)) ([9b54af4](https://github.com/SAP/ui5-webcomponents/commit/9b54af42b6dccfee5781ef45f66d2003a71f7e5b))


### BREAKING CHANGES

* **ui5-illustrated-message:** The enum IllustrationMessageSize is renamed to IllustrationMessageDesign.
If you have previously imported the enum:

import IllustrationMessageSize from "@ui5/webcomponents-base/dist/types/IllustrationMessageSize.js";
Now import IllustrationMessageDesign instead:

import IllustrationMessageDesign from "@ui5/webcomponents-base/dist/types/IllustrationMessageDesign.js";
* **ui5-view-settings-dialog:** Removed `show` and `close` methods.

Before, the ui5-view-settings-dialog could be opened and closed by calling `show()` and `close()`:
```ts
const viewSettingsDialog = document.getElementById("exampleID");
viewSettingsDialog.show();
viewSettingsDialog.close();
```
Now, the dialog is opened and closed by setting the open property to true or false:
```ts
const viewSettingsDialog = document.getElementById("exampleID");
viewSettingsDialog.open = true;
viewSettingsDialog.open = false;
```
fixes: https://github.com/SAP/ui5-webcomponents/issues/9240
* @property decorator must be adapted according to new type parameter





# [2.0.0-rc.6](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.5...v2.0.0-rc.6) (2024-06-17)


### Bug Fixes

* **ui5-barcode-scanner-dialog:** properly fire 'close' event ([#9193](https://github.com/SAP/ui5-webcomponents/issues/9193)) ([db099f1](https://github.com/SAP/ui5-webcomponents/commit/db099f120353d86ccb04de554b483228bff73325)), closes [#9177](https://github.com/SAP/ui5-webcomponents/issues/9177)
* **ui5-li-notification:** enhance accessibility ([#9192](https://github.com/SAP/ui5-webcomponents/issues/9192)) ([cc34cea](https://github.com/SAP/ui5-webcomponents/commit/cc34cea9d06babbcb44a1edd21e99becf637c64f)), closes [#9161](https://github.com/SAP/ui5-webcomponents/issues/9161)
* **ui5-notification-list:** change host to display:block ([#9139](https://github.com/SAP/ui5-webcomponents/issues/9139)) ([efb4791](https://github.com/SAP/ui5-webcomponents/commit/efb4791e529860e2a996136719c5bbbb98d5603f))
* **ui5-shellbar:** add tooltip for shellbar items ([#9143](https://github.com/SAP/ui5-webcomponents/issues/9143)) ([c39c18a](https://github.com/SAP/ui5-webcomponents/commit/c39c18a8d4f6b1b858f72680d830c40f189d7eab))
* **ui5-side-navigation:** group name is announced one time by screen … ([#9207](https://github.com/SAP/ui5-webcomponents/issues/9207)) ([4f18dfd](https://github.com/SAP/ui5-webcomponents/commit/4f18dfdf844dee248744692913284304641e83cb))


### Code Refactoring

* **ui5-li, ui5-li-custom:** rename classes ([#9158](https://github.com/SAP/ui5-webcomponents/issues/9158)) ([8f5b679](https://github.com/SAP/ui5-webcomponents/commit/8f5b67901a429196252f52980c10a04f7d43fe0b))
* **ui5-side-navigation-item:** remove wholeItemToggleable property ([#9164](https://github.com/SAP/ui5-webcomponents/issues/9164)) ([37b2181](https://github.com/SAP/ui5-webcomponents/commit/37b2181eb79dfccae8b39069bb068062e37a5a2b)), closes [#9057](https://github.com/SAP/ui5-webcomponents/issues/9057)
* **ui5-tag:** wrap text by default ([#9126](https://github.com/SAP/ui5-webcomponents/issues/9126)) ([96704b8](https://github.com/SAP/ui5-webcomponents/commit/96704b8e893a777206c00efbc57282e56429d687))


### BREAKING CHANGES

* **ui5-side-navigation-item:** the `wholeItemToggleAble` poperty of `ui5-side-navigation-item` is now remomoved.
The functionality of clicking the whole item to show/hide the sub items (if present) will
be introduced soon with new property name and enhanced accessibility and keyboard handling.
* **ui5-tag:** `wrapping-type` property default value has changed from `None` to `Normal`. Before:
```html
<ui5-tag>In Process</ui5-tag><!-- would truncate the text if there is not enough space -->
```

Now:
```html
<ui5-tag>In Process</ui5-tag><!-- would let the text wrap if there is not enough space -->
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461

* refactor(ui5-tag): fix test texsts

* refactor(ui5-tag): fix height of the tags to be the same

No matter if the tag is with wrapping-type="None" or wrapping-type="Normal"
the height when there is only one line of text should be the same.

* refactor(ui5-tag): merge adjustments and code review comments

* refactor(ui5-tag): fix height
* **ui5-li, ui5-li-custom:** `StandardListItem` has been renamed to `ListItemStandard`, and `CustomListItem` has been renamed to `ListItemCustom`.
If you previously imported the classes as follows:
```ts
import StandardListItem from "@ui5/webcomponents/StandardListItem.js";
import CustomListItem from "@ui5/webcomponents/CustomListItem.js";
```
now you must change imports to:
```ts
import ListItemStandard from "@ui5/webcomponents/ListItemStandard.js";
import ListItemCustom from "@ui5/webcomponents/ListItemCustom.js";
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461





# [2.0.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.4...v2.0.0-rc.5) (2024-06-06)


### Bug Fixes

* **ui5-notification-list:** improved accessibility ([#9070](https://github.com/SAP/ui5-webcomponents/issues/9070)) ([5e62d4a](https://github.com/SAP/ui5-webcomponents/commit/5e62d4af792d7043f931b0f8f894d36a85f18395))
* **ui5-shellbar:** improved samples accessibility ([#8847](https://github.com/SAP/ui5-webcomponents/issues/8847)) ([7563e7d](https://github.com/SAP/ui5-webcomponents/commit/7563e7d942d06865d8fcc44d9f4dc1e1d6179e97)), closes [#8821](https://github.com/SAP/ui5-webcomponents/issues/8821)


### Code Refactoring

* **ui5-link:** wrap text by default ([#9006](https://github.com/SAP/ui5-webcomponents/issues/9006)) ([1924b54](https://github.com/SAP/ui5-webcomponents/commit/1924b5457f22c428527f8be3fbdd46d9d5d7ffed))


### BREAKING CHANGES

* **ui5-link:** `wrapping-type` property default value has changed from `None` to `Normal`.
Before: 
```html
<ui5-link>some very very very long link</ui5-link> <!-- would truncate the text if there is not enough space -->
```

Now:
```html
<ui5-link>some very very very long link</ui5-link> <!-- would let the text wrap if there is not enough space -->
```





# [2.0.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.3...v2.0.0-rc.4) (2024-05-29)


### Bug Fixes

* **ui5-illustrated-mesasge:** update subtitle color ([#8986](https://github.com/SAP/ui5-webcomponents/issues/8986)) ([c9a5120](https://github.com/SAP/ui5-webcomponents/commit/c9a5120912d22980e25adbb042d308fee5201487)), closes [#8984](https://github.com/SAP/ui5-webcomponents/issues/8984)
* **ui5-notification-list:** fix keyboard issues ([#9040](https://github.com/SAP/ui5-webcomponents/issues/9040)) ([f1c0635](https://github.com/SAP/ui5-webcomponents/commit/f1c0635d6d2b94e94b7ecc311bb49480db1fae6d))
* **ui5-notification:** implement keyboard navigation spec ([#8975](https://github.com/SAP/ui5-webcomponents/issues/8975)) ([d68c883](https://github.com/SAP/ui5-webcomponents/commit/d68c883f527e57f75bdad5a7a421b3ab8e4efbb0))
* **ui5-side-navigation-item:** "selected" is no longer announced on every focused item ([#9008](https://github.com/SAP/ui5-webcomponents/issues/9008)) ([8cd3f83](https://github.com/SAP/ui5-webcomponents/commit/8cd3f83e2fcc31d57ebcdd38ee2ceff36150e1d1))
* **ui5-side-navigation-item:** click event is no longer fired twice ([#8944](https://github.com/SAP/ui5-webcomponents/issues/8944)) ([0dd36ca](https://github.com/SAP/ui5-webcomponents/commit/0dd36ca4b84c3b73fbb9c9cd44cee3d7b6e97d2a))


### Code Refactoring

* **ui5-popup:** rename after-open and after-close events to 'open' and 'close' ([#8946](https://github.com/SAP/ui5-webcomponents/issues/8946)) ([912167d](https://github.com/SAP/ui5-webcomponents/commit/912167d18cd5e365a03513defc570da5bf372715)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-shellbar:** introducing assistant slot ([#8963](https://github.com/SAP/ui5-webcomponents/issues/8963)) ([2a8c252](https://github.com/SAP/ui5-webcomponents/commit/2a8c252ecf67fce81d5ac7b2a7d949c058de9d17)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#7887](https://github.com/SAP/ui5-webcomponents/issues/7887)


### Features

* **ui5-dynamic-page:** introduce new component ([#7899](https://github.com/SAP/ui5-webcomponents/issues/7899)) ([3752ce7](https://github.com/SAP/ui5-webcomponents/commit/3752ce701fe915fa0b02ba2b114c40bf3b7d9123))
* **ui5-li-notification-group:** enhance 'Expand'/'Collapse' tooltip ([#9042](https://github.com/SAP/ui5-webcomponents/issues/9042)) ([08b81c7](https://github.com/SAP/ui5-webcomponents/commit/08b81c7bd852a50f735ab8621cb3e0de69c25497))
* **ui5-li-notification:** implement new design ([#8426](https://github.com/SAP/ui5-webcomponents/issues/8426)) ([e451cdc](https://github.com/SAP/ui5-webcomponents/commit/e451cdc3709553dcb780f637463dc1b29e8f2971))


### BREAKING CHANGES

* **ui5-notification:** Instead of `ui5-list`, `ui5-notification-list` should be used as a container for `ui5-li-notification-group` and `ui5-li-notification` components.

Previously the application developers were defining notifications in this way:

```
<ui5-list>
        <ui5-li-notification-group title-text="Group Title" >
            <ui5-li-notification..
```
To support accessibility, developers should now use the `ui5-notification-list` as seen below:

```
<ui5-notification-list>
        <ui5-li-notification-group title-text="Group Title" >
            <ui5-li-notification..
```
* **ui5-shellbar:** 1. The `showCoPilot` property of the `ui5-shellbar` is removed.

If you have previously used the `showCoPilot` property:
```html
<ui5-shellbar show-co-pilot></ui5-shellbar>
```
it will no longer work for the component.

2. The `CoPilotAnimation` feature of the `ui5-shellbar` is removed.

If you have previously used the `CoPilotAnimation` feature:
```js
import CoPilotAnimation from "@ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js"
```
it will no longer work for the component.

3. The `copilotDomRef` getter of the `ui5-shellbar` is removed.

If you have previously used the `copilotDomRef` public getter:
```js
shellbar.copilotDomRef
```

it will no longer work for the component.

 4. The `co-pilot-click` event of the `ui5-shellbar` is removed.
If you have previously used the `co-pilot-click` public event:
```js
shellbar.addEventListener("ui5-co-pilot-click", function(event) {
	...
});
```

it will no longer work for the component.

You can achieve similar functionality with the new slot:

HTML:
```html
<ui5-shellbar>
  <ui5-toggle-button id="assistant" icon="sap-icon://da" slot="assistant"></ui5-toggle-button>
</ui5-shellbar>
```

JavaScript:
```js
assistant.addEventListener("click", function (event) {
	const toggleButton = event.target;
	toggleButton.icon = toggleButton.pressed ? "sap-icon://da-2" : "sap-icon://da";
});

```
* **ui5-popup:** Event names `after-close` and `after-open` are now named `close` and `open`.
Previously the application developers could subscribe to the events as follows:
```ts
popup.addEventListener("after-open", function() {
	//...
});
popup.addEventListener("after-close", function() {
	//...
});
```

Now the application developers should include the ui5-bar as follows:
```ts
popup.addEventListener("open", function() {
	//...
});

popup.addEventListener("close", function() {
	//...
});

```





# [2.0.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.2...v2.0.0-rc.3) (2024-05-10)


### Bug Fixes

* **ui5-illustrated-message:** typo in the UnsuccessfulAuth name ([#8873](https://github.com/SAP/ui5-webcomponents/issues/8873)) ([b64d76f](https://github.com/SAP/ui5-webcomponents/commit/b64d76f7b425feeab61e93a9e452cd127b2cfb4d))


### Code Refactoring

* rename ValueState values ([#8864](https://github.com/SAP/ui5-webcomponents/issues/8864)) ([ef9304d](https://github.com/SAP/ui5-webcomponents/commit/ef9304da4b1446178b1b2bfa737d9867461cc4bc))
* **theming:** remove Belize theme ([#8519](https://github.com/SAP/ui5-webcomponents/issues/8519)) ([990313f](https://github.com/SAP/ui5-webcomponents/commit/990313fc8e429a491f4d6e67306d3df2703e54fe)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-*:** use unified API to define a11y attributes via `accessibilityAttributes` ([#8810](https://github.com/SAP/ui5-webcomponents/issues/8810)) ([49d587c](https://github.com/SAP/ui5-webcomponents/commit/49d587c73120a5511a34e61be949018605f49acd))
* **ui5-badge:** rename Badge `ui5-badge` to Tag `ui5-tag` ([#8884](https://github.com/SAP/ui5-webcomponents/issues/8884)) ([4b8c1ee](https://github.com/SAP/ui5-webcomponents/commit/4b8c1eee72a6baea79a58983e8cc021addca9480))
* **ui5-illustrated-message:** remove titleLevel property ([#8700](https://github.com/SAP/ui5-webcomponents/issues/8700)) ([9fe199c](https://github.com/SAP/ui5-webcomponents/commit/9fe199ca2f1a76985645fb375270afe29baa716f))
* **ui5-input:** events changes ([#8769](https://github.com/SAP/ui5-webcomponents/issues/8769)) ([9f5c8a4](https://github.com/SAP/ui5-webcomponents/commit/9f5c8a4f3145a8f56abec178188e53b387a627b6))
* **ui5-list:** enable hierarchical groups ([#8632](https://github.com/SAP/ui5-webcomponents/issues/8632)) ([193ed52](https://github.com/SAP/ui5-webcomponents/commit/193ed52f2085bef380005337001dc4f2f131a971)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-page:** rename disableScrolling and floatingFooter properties ([#8816](https://github.com/SAP/ui5-webcomponents/issues/8816)) ([2f6fe6c](https://github.com/SAP/ui5-webcomponents/commit/2f6fe6c1e598ebb807ade1b1bfabe93c76f1b6fb))
* **ui5-segmented-button-item:** implement segmented button item independently from button ([#8669](https://github.com/SAP/ui5-webcomponents/issues/8669)) ([7b5f751](https://github.com/SAP/ui5-webcomponents/commit/7b5f7513bf91bcc20553dfefa4f40215c10e567b))
* **ui5-segmented-button:** rename `mode` to `selectionMode` ([#8761](https://github.com/SAP/ui5-webcomponents/issues/8761)) ([4be1540](https://github.com/SAP/ui5-webcomponents/commit/4be15407d7932599294a85a7297460d733b901b2))
* **ui5-title:** wrap text by default ([#8916](https://github.com/SAP/ui5-webcomponents/issues/8916)) ([f267f50](https://github.com/SAP/ui5-webcomponents/commit/f267f504a93d45a65c4cdf2acff8c65182ba1df2))
* **ui5-toast:** replace `show` method with `open` property ([#8855](https://github.com/SAP/ui5-webcomponents/issues/8855)) ([372d27d](https://github.com/SAP/ui5-webcomponents/commit/372d27d9db9afd40ffaf85cbfab61f10284063c3)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-wizard:** rename event parameter  ([#8845](https://github.com/SAP/ui5-webcomponents/issues/8845)) ([9882144](https://github.com/SAP/ui5-webcomponents/commit/988214415bc4a7d7b2d47f2ef9cdda7d572390fc)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)


### Reverts

* Revert "fix(ui5-shellbar): aligned specs"  (#8770) ([b73c171](https://github.com/SAP/ui5-webcomponents/commit/b73c171965b8f97d26a2beaf571190a81d39956e)), closes [#8770](https://github.com/SAP/ui5-webcomponents/issues/8770) [#8694](https://github.com/SAP/ui5-webcomponents/issues/8694)


### BREAKING CHANGES

* **ui5-title:** wrapping-type property default value has changed from `None` to `Normal`.
Previously long texts would truncate if there is not enough space. Now, long texts would wrap.

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-input:** Remove suggestion-item-select event.
Rename and modify suggestion-item-preview event.
Remove openPicker method and replace it with public property "open".

* refactor(ui5-input): events changes

* refactor(ui5-input): property open tests

* refactor(ui5-input): events change

* refactor(ui5-input): events change

* refactor(ui5-input): events changes

* refactor(ui5-input): events changes

* refactor(ui5-input): events changes
* **ui5-*:** FlexibleLayout's `accessibilityTexts` and `accessibilityRoles` properties are removed. If you have previously used the `accessibilityTexts` or `accessibilityRoles` properties:
```js
fcl.accessibilityTexts = {
    startColumnAccessibleName: "Products list",
    midColumnAccessibleName: "Product information",
    endColumnAccessibleName: "Product detailed information",
    startArrowLeftText: "Collapse products list",
    startArrowRightText: "Expand products list",
    endArrowLeftText: "Expand product detailed information",
    endArrowRightText: "Collapse product detailed information",
    startArrowContainerAccessibleName: "Start Arrow Container",
    endArrowContainerAccessibleName: "End Arrow Container",
}

fcl.accessibilityRoles = {
    startColumnRole: "complementary",
    startArrowContainerRole: "navigation",
    midColumnRole: "main",
    endArrowContainerRole: "navigation",
    endColumnRole: "complementary".
}
```
Now use `accessibilityAttributes` instead:
```js
fcl.accessibilityAttributes = {
    startColumn: {
      role: "complementary",
      name: "Products list",
    },
    midColumn: {
      role: "main",
      name: "Product information",
    },
    endColumn: {
      role: "complementary",
      name: "Product detailed information",
    },
    startArrowLeft:  {
      name: "Collapse products list",
    },
    startArrowRight: {
      name: "Expand products list",
    },
    endArrowLeft: {
      name: "Expand product detailed information",
    },
    endArrowRight:  {
      name: "Collapse product detailed information",
    },
    startArrowContainer: {
      role: "navigation",
      name: "Start Arrow Container",
    },
    endArrowContainer: {
      role: "navigation",
      name: "End Arrow Container",
    },
};
```

ShellBar's `accessibilityTexts` and `accessibilityRoles` properties are removed. If you have previously used the `accessibilityTexts` or `accessibilityRoles` properties:
```js
shellbar.accessibilityTexts = {
    profileButtonTitle: "John Dow",
    logoTitle: "Custom logo title",
}

shellbar.accessibilityRoles = {
    logoRole: "link"
};
```
Now use `accessibilityAttributes` instead:
```js
shellbar.accessibilityAttributes = {
  profile: {
    name:  "John Dow",
  },
  logo: {
    role: "link"
    name: "Custom logo title"
  },
};
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461

				
* **ui5-badge:** Badge web component has been renamed to Tag. If you have previously used the `ui5-badge`:
```html
<ui5-badge></ui5-badge>
```
Now use `ui5-tag` instead:
```html
<ui5-tag></ui5-tag>
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* If you previously used ValueState.Warning, ValueState.Error or ValueState.Success, start using ValueState.Critical, ValueState.Negative and ValueState.Positive respectively. 
All components with valueState property are also affected. For example:
```html
<ui5-input value-state="Success"></ui5-input>
<ui5-input value-state="Warning"></ui5-input>
<ui5-input value-state="Error"></ui5-input>
```
```html
<ui5-input value-state="Positive"></ui5-input>
<ui5-input value-state="Critical"></ui5-input>
<ui5-input value-state="Negative"></ui5-input>
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-toast:** The Toast#show method has been replaced by  `open` property. If you previously used  `toast.show()` to show the toast, you must now se `toast.open=true`.
* **ui5-segmented-button-item:** The `ui5-segmentedbutton-item` `pressed` property is called `selected` now.

Previously the application developers could use the ui5-segmentedbutton-item as follows:
```html
<ui5-segmented-button>
  <ui5-segmented-button-item pressed> Option 1</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 2</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 3</ui5-segmented-button-item>
</ui5-segmented-button>
```

Now the application developers should use the ui5-segmentedbutton-item as follows:
```html
<ui5-segmented-button>
  <ui5-segmented-button-item selected> Option 1</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 2</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 3</ui5-segmented-button-item>
</ui5-segmented-button>
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-wizard:** `changeWithClick` was renamed to `withScroll` in the `WizardStepChangeEventDetail`.

JIRA: BGSOFUIRILA-3867
* **theming:** Remove SAP Belize theme
* **ui5-illustrated-message:** The `titleLevel` property of the `ui5-illustrated-message`is removed.
If you have previously used the `titleLevel` property:
```html
<ui5-illustrated-message title-level="H6>
```
it will no longer work for the component.

Instead, you could set the title of the `ui5-illustrated-message` on the `title` slot, as it follows

```html
<ui5-illustrated-message>
      <ui5-title slot="title" level="H3">This is a slotted title</ui5-title>
</ui5-illustrated-message>
```
Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* **ui5-segmented-button:** The mode property is changed to `SelectionMode` and the values it take from `SingleSelect` and `MultiSelect` to `Single` and `Multiple`. Also deleted deprecated getter - `selectedItem` and deprecated event detail `selectedItem` and now can be used with the `selectedItems` getter and `selectedItems` event detail.

Previously the application developers could set the selection mode as follows:
```ts
<ui5-segmented-button id="segButtonMulti" mode="MultiSelect">
  <ui5-segmented-button-item>Item</ui5-segmented-button-item>
  <ui5-segmented-button-item>Item</ui5-segmented-button-item>
  <ui5-segmented-button-item>Click</ui5-segmented-button-item>
  <ui5-segmented-button-item>SegmentedButtonItem</ui5-segmented-button-item>
</ui5-segmented-button>
```
Now the application developers could set the selection mode as follows:
```ts
<ui5-segmented-button id="segButtonMulti" selection-mode="Multiple">
  <ui5-segmented-button-item>Item</ui5-segmented-button-item>
  <ui5-segmented-button-item>Item</ui5-segmented-button-item>
  <ui5-segmented-button-item>Click</ui5-segmented-button-item>
  <ui5-segmented-button-item>SegmentedButtonItem</ui5-segmented-button-item>
</ui5-segmented-button>
```
Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-page:** `disableScrolling` has been renamed, `floatingFooter` property has been removed and `fixedFooter` property has been added instead.

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-list:** The ui5-li-groupheader component is removed. Groups can now be created with the ui5-li-group. Instead of using ui5-li-groupheader as separator in a flat structure:

<ui5-list>
  <ui5-li-groupheader>Actions</ui5-li-groupheader>
  <ui5-li>Delete Product</ui5-li>
  <ui5-li>Audit Log Settings</ui5-li>
  <ui5-li-groupheader>Products</ui5-li-groupheader>
  <ui5-li>Product 1</ui5-li>
</ui5-list>
The API supports nesting of ui5-li components inside an ui5-li-group with the header-text property:

<ui5-list>
  <ui5-li-group header-text="Actions">
    <ui5-li>Delete Product</ui5-li>
    <ui5-li>Audit Log Settings</ui5-li>
  </ui5-li-group>
</ui5-list>
or with the header slot:

<ui5-list>
  <ui5-li-group>
    <div slot="header" style="width: '100%'; display: flex; justify-content:space-between; align-items:center;">
        <span>Back End Developers</span>
        <ui5-icon name="navigation-right-arrow"></ui5-icon>
    </div>
    <ui5-li>Delete Product</ui5-li>
    <ui5-li>Audit Log Settings</ui5-li>
  </ui5-li-group>
</ui5-list>
In addition, the the List's items slot getter, will now return ui5-li-group instances as well. There is a new readonly getter listItems will return an array flat structure containing listitems and group header items.





# [2.0.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2024-04-18)


### Bug Fixes

* **ui5-shellbar:** aligned specs ([#8694](https://github.com/SAP/ui5-webcomponents/issues/8694)) ([c5ec720](https://github.com/SAP/ui5-webcomponents/commit/c5ec720c8fd362b6fe2f502d473bec5fc4071b38))
* **ui5-shellbar:** assistant icon color fixed ([#8713](https://github.com/SAP/ui5-webcomponents/issues/8713)) ([e501ac8](https://github.com/SAP/ui5-webcomponents/commit/e501ac8147bb979319a6e055ba98458650884112))
* **ui5-side-navigation:** import overflow icon ([#8736](https://github.com/SAP/ui5-webcomponents/issues/8736)) ([8bc1bb4](https://github.com/SAP/ui5-webcomponents/commit/8bc1bb4698e71c66e1fb59508e115b9e612912fb))
* **ui5-side-navigation:** replace items and fixedItems union type with SideNavigationItemBase ([#8740](https://github.com/SAP/ui5-webcomponents/issues/8740)) ([b589486](https://github.com/SAP/ui5-webcomponents/commit/b58948676049565410592700b1796475f1ea94fa))


### Features

* **ui5-barcode-scanner-dialog:** add support for close and open events ([#8753](https://github.com/SAP/ui5-webcomponents/issues/8753)) ([1ae2142](https://github.com/SAP/ui5-webcomponents/commit/1ae2142aa6ba2c587126e49422724658686d2344)), closes [#8695](https://github.com/SAP/ui5-webcomponents/issues/8695)





# [2.0.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2024-04-11)


### Features

* **ui5-button:** provide focus support for mobile ([#8414](https://github.com/SAP/ui5-webcomponents/issues/8414)) ([4d9e32f](https://github.com/SAP/ui5-webcomponents/commit/4d9e32fff1a594f774f9f36d549619c0389c1e07)), closes [#8178](https://github.com/SAP/ui5-webcomponents/issues/8178) [#8322](https://github.com/SAP/ui5-webcomponents/issues/8322)





# [2.0.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0...v2.0.0-rc.0) (2024-04-09)


### Bug Fixes

* **ui5-flexible-column-layout:** improved separators borders ([#8639](https://github.com/SAP/ui5-webcomponents/issues/8639)) ([367ca80](https://github.com/SAP/ui5-webcomponents/commit/367ca80c9f3eb24c36080046b58c823f5af21780)), closes [#8307](https://github.com/SAP/ui5-webcomponents/issues/8307)
* **ui5-upload-collection:** update ui5-upload-collection Drag and Drop overlay color ([#8616](https://github.com/SAP/ui5-webcomponents/issues/8616)) ([73f713e](https://github.com/SAP/ui5-webcomponents/commit/73f713e5003dacb1ceb68fbb3a6ac2e954741c97))


### chore

* bring release-2.0 to main ([#8651](https://github.com/SAP/ui5-webcomponents/issues/8651)) ([69271c9](https://github.com/SAP/ui5-webcomponents/commit/69271c9468c7dd54f90710fc4613ae0a79f85cef)), closes [#8494](https://github.com/SAP/ui5-webcomponents/issues/8494) [#8496](https://github.com/SAP/ui5-webcomponents/issues/8496) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8497](https://github.com/SAP/ui5-webcomponents/issues/8497) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8504](https://github.com/SAP/ui5-webcomponents/issues/8504) [#8509](https://github.com/SAP/ui5-webcomponents/issues/8509) [#8507](https://github.com/SAP/ui5-webcomponents/issues/8507) [#8511](https://github.com/SAP/ui5-webcomponents/issues/8511) [#8501](https://github.com/SAP/ui5-webcomponents/issues/8501) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8503](https://github.com/SAP/ui5-webcomponents/issues/8503) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8506](https://github.com/SAP/ui5-webcomponents/issues/8506) [#8502](https://github.com/SAP/ui5-webcomponents/issues/8502) [#8524](https://github.com/SAP/ui5-webcomponents/issues/8524) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8525](https://github.com/SAP/ui5-webcomponents/issues/8525) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8518](https://github.com/SAP/ui5-webcomponents/issues/8518) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8526](https://github.com/SAP/ui5-webcomponents/issues/8526) [#8529](https://github.com/SAP/ui5-webcomponents/issues/8529) [#8528](https://github.com/SAP/ui5-webcomponents/issues/8528) [#8531](https://github.com/SAP/ui5-webcomponents/issues/8531) [#8532](https://github.com/SAP/ui5-webcomponents/issues/8532) [#8534](https://github.com/SAP/ui5-webcomponents/issues/8534) [#8163](https://github.com/SAP/ui5-webcomponents/issues/8163) [#8527](https://github.com/SAP/ui5-webcomponents/issues/8527) [#8538](https://github.com/SAP/ui5-webcomponents/issues/8538) [#8521](https://github.com/SAP/ui5-webcomponents/issues/8521) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8542](https://github.com/SAP/ui5-webcomponents/issues/8542) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8548](https://github.com/SAP/ui5-webcomponents/issues/8548) [#8555](https://github.com/SAP/ui5-webcomponents/issues/8555) [#8559](https://github.com/SAP/ui5-webcomponents/issues/8559) [#8565](https://github.com/SAP/ui5-webcomponents/issues/8565) [#8570](https://github.com/SAP/ui5-webcomponents/issues/8570) [#8558](https://github.com/SAP/ui5-webcomponents/issues/8558) [#8568](https://github.com/SAP/ui5-webcomponents/issues/8568) [#8596](https://github.com/SAP/ui5-webcomponents/issues/8596) [#8192](https://github.com/SAP/ui5-webcomponents/issues/8192) [#8606](https://github.com/SAP/ui5-webcomponents/issues/8606) [#8605](https://github.com/SAP/ui5-webcomponents/issues/8605) [#8600](https://github.com/SAP/ui5-webcomponents/issues/8600) [#8602](https://github.com/SAP/ui5-webcomponents/issues/8602) [#8593](https://github.com/SAP/ui5-webcomponents/issues/8593)


### Code Refactoring

* **ui5-list, ui5-tree, ui5-upload-collection:** rename mode to selectionMode ([#8657](https://github.com/SAP/ui5-webcomponents/issues/8657)) ([d53b3b2](https://github.com/SAP/ui5-webcomponents/commit/d53b3b2e231b6bf3aa5b317634d3f304240f9d76))
* **ui5-tabcontainer:** remove fixed property ([#8676](https://github.com/SAP/ui5-webcomponents/issues/8676)) ([98052e1](https://github.com/SAP/ui5-webcomponents/commit/98052e1857845314cc41e1cfff80436bd1096436)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-upload-collection:** remove Delete selection mode ([#8607](https://github.com/SAP/ui5-webcomponents/issues/8607)) ([926ae75](https://github.com/SAP/ui5-webcomponents/commit/926ae75015fc4ca751dcbc5a36a5acceeedfffe3))


### Features

* **focus:** new focus handling ([#8590](https://github.com/SAP/ui5-webcomponents/issues/8590)) ([b6a33e0](https://github.com/SAP/ui5-webcomponents/commit/b6a33e04210de2d0eb972755dbce804d479e14a9))


### BREAKING CHANGES

* **ui5-tabcontainer:** Property "fixed" is removed and there is no alternative provided. The TabContainer is no longer expandable/collapsible via use interaction. You can still show the TabContainer collapsed via the "collapsed" property.
* **ui5-upload-collection:** The `selectionMode` property no longer accepts "Delete" as value.
If you have previously used it:
```html
<ui5-upload-collection selection-mode="Delete"></ui5-upload-collection>
```
Now omit it completely and use `hide-delete-button` onto the ui5-upload-collection:
```html
<ui5-upload-collection>
   <ui5-upload-collection-item hide-delete-button>  </ui5-upload-collection-item>
</ui5-upload-collection>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-list, ui5-tree, ui5-upload-collection:** The `mode` property and the `ListMode` enum have been renamed.
If you have previously used the `mode` property and the `ListMode` values:
```html
<ui5-list class="list" mode="SingleSelect">
<ui5-list class="list" mode="MultiSelect">
<ui5-upload-collection mode="SingleSelectBegin">
<ui5-upload-collection mode="SingleSelectEnd">
<ui5-tree mode="SingleSelectAuto" >
<ui5-tree mode="None" >
```
Now use `selectionMode`  and `Single`, `Multiple` instead:
```html
<ui5-list class="list" selection-mode="Single">
<ui5-list class="list" selection-mode="Multiple">
<ui5-upload-collection selection-mode="SingleStart">
<ui5-upload-collection selection-mode="SingleEnd">
<ui5-tree selection-mode="SingleAuto">
<ui5-tree selection-mode="None">

```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* "Device#isIE" method has been removed and no longer available

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* Removed the `CSP.js` module and the creation of `<style>` and `<link>` tags, as all browsers now support adoptedStyleSheets. The following APIs are not available any more and should not be used:
```ts
import { setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPackageCSSRoot } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPreloadLinks } from "@ui5/webcomponents-base/dist/CSP.js"
```
* Removed the `ICardHeader` interface. If you previously used the interface
```ts
import type { ICardHeader } from "@ui5/webcomponents-base/dist/Card.js"
```
Use the CardHeader type instead:
```ts
import type CardHeader from "@ui5/webcomponents-base/dist/CardHeader.js"
```
* Removed the `IUploadCollectionItem` interface. If you previously used the interface:
```js
import type { IUploadCollectionItem} from "@ui5/webcomponents-fiori/dist/UploadCollection.js"
```
Use the `UploadCollectionItem` type instead:
```js
import type UploadCollectionItem from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js"
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* The `size` property now accepts different values. If you previously used it like:
```html
<ui5-busy-indicator size="Small"></ui5-busy-indicator>
```
Now use the new values instead:
```html
<ui5-busy-indicator size="S"></ui5-busy-indicator>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* The `status` property and its shadow part have been renamed. If you previously used them:
```html
<style>
    .cardHeader::part(status) { ... }
</style>
<ui5-card-header status="3 of 10"></ui5-popover>
```
Now use `additionalText` instead:
```html
<style>
       .cardHeader::part(additional-text) { ... }
</style>
<ui5-card-header class="cardHeader" additional-text="3 of 10"></ui5-card-header>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* The `pageIndicatorStyle` no longer exists. If you previously used it like:
```html
<ui5-carousel page-indicator-style="Numeric"></ui5-carousel>
```
Now you should use `pageIndicatorType` instead:
```html
<ui5-carousel page-indicator-type="Numeric"></ui5-carousel>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* Removed `UI5Element#render` method in favour of `UI5Element#renderer`. If you previously used "render"
```js
class MyClass extends UI5Element {
    static get render() {
        return litRenderer;
    }
}
```
start using "renderer"
```ts
class MyClass extends UI5Element {
    static get renderer() {
        return litRenderer;
    }
}
```
* Remove  JavaScript template option from @ui5/create-webcomponents-package
Previously `npm init @ui5/webcomponents-package` used to create JS-based project, however now it will be TypeScript-based project.
If you previously used `npm init @ui5/webcomponents-package --enable-typescript` to create  TypeScript-based project, now it's by default, e.g `npm init @ui5/webcomponents-package` and `--enable-typescript` is removed.
* The `Left` and `Right` options option have been renamed. If you previously used them to set the placement or the alignment of the popover:
```html
<ui5-popover horizontal-align="Left" placement-type="Left"></ui5-popover>
```
Now use `Start` or `End` instead:
```html
<ui5-popover horizontal-align="Start" placement-type="Start"></ui5-popover>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461

* docs: deploy v2 preview
* Remove `soccor` icon. Use `soccer` instead.
* Remove `add-polygone` icon. Use `add-polygon` instead.
* The JSDoc plugin has been removed, and the generation of api.json has stopped. If you previously relied on the `ui5-package/dist/api.json file`, you can now use `ui5-package/dist/custom-elements.json`
* All Assets-static.js modules are removed. If you previously imported any Assets-static.js module from any package:
```ts
import "@ui5/webcomponents/dist/Assets-static.js";
import "@ui5/webcomponents-icons/dist/Assets-static.js"
```
use the dynamic equivalent of it:
```ts
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/Assets.js"
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* The event `selected-dates-change ` is renamed to `selection-change`. In addition the event details
`values` and `dates` are renamed to `selectedValues` and `selectedDateValues`. If you previously used the Calendar event as follows:
```ts
myCalendar.addEventListener("selected-dates-change", () => {
    const values = e.detail.values;
    const dates = e.detail.dates;
})
```
Now you have to use the new event name and details:
```ts
myCalendar.addEventListener("selection-change", () => {
   const values = event.detail.selectedValues;
   const dates = event.detail.selectedDateValues;
})
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* The property `color`  is renamed to `value`. If you previously used the change event of the ColorPicker as follows:
```html
<ui5-color-picker color="red"></ui5-color-picker>
```
Now you have to use it like this:
```html
<ui5-color-picker value="red"></ui5-color-picker>
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* JavaScript projects may not function properly with the tools package.
* The `openPopover` and `showAt` methods are removed in favor of `open`  and `opener` properties. If you previously used the imperative API:
```js
button.addEventListener("click", function(event) {
	colorPalettePopover.showAt(this);
});
```
Now the declarative API should be used instead:
```html
<ui5-button id="opener">Open</ui5-button>
<ui5-color-palette-popover opener="opener">
```
```js
button.addEventListener("click", function(event) {
	colorPalettePopover.open = !colorPalettePopover.open;
});
```
* The `ui5-bar` component is now in `main` library. If you previously imported  the `ui5-bar` from `fiori`:
```ts
import "@ui5/webcomponents-fiori/dist/Bar.js;
```
Now, import the `ui5-bar` from `main`:
```ts 
import "@ui5/webcomponents/dist/Bar.js";
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* If you have previously used:
```html
<ui5-tab id="nestedTab" slot="subTabs"></ui5-tab>
```
Now use:
```html
<ui5-tab id="nestedTab" slot="items"></ui5-tab>
```

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* If you have previously used: 
```html
<ui5-tabcontainer tabs-overflow-mode="StartAndEnd"></ui5-tabcontainer>
```
Now use:
```html
<ui5-tabcontainer overflow-mode="StartAndEnd"></ui5-tabcontainer>
```

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* If you previously imported `TabContainerBackgroundDesign`, use `BackgroundDesign` instead.

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* The showOverflow property is removed. If previously you have used: 
```html
<ui5-tabcontainer show-overflow></ui5-tabcontainer>
```
now use the overflowButton slot:
```html
<ui5-tabcontainer>
	<ui5-button slot="startOverflowButton" id="startOverflowButton">Start</ui5-button>
	<ui5-button slot="overflowButton" id="endOverflowButton">End</ui5-button>
</ui5-tabcontainer>
```

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* The `placementType` property and the `PopoverPlacementType` enum have been renamed.
If you have previously used the `placementType` property and the `PopoverPlacementType` 
```html
<ui5-popover placement-type="Bottom"></ui5-popover>
```
```js
import PopoverPlacementType from "@ui5/webcomponents/dist/types/PopoverPlacementType.js";
```
Now use `placement` instead:
```html
<ui5-placement="Bottom"></ui5-popover>
```
```js
import PopoverPlacementType from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* The `size` property of the `ui5--illustrated-message` is renamed to `design`.
If you have previously used the `size` property:
```html
<ui5-illustrated-message size="Dialog">
```
Now use `design` instead:
```html
<ui5-illustrated-message design="Dialog">

```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* The `separator-style` property is renamed to  `separators` and the `BreadcrumbsSeparatorStyle` enum is renamed to `BreadcrumbsSeparator`.
If you have previously used the `separator-style` property:
```html
<ui5-breadcrumbs separator-style="Slash">
```
Now use  `separators`  instead:
```html
<ui5-breadcrumbs separators="Slash">
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* The `disabled` property of the `ui5-option` is removed.
If you have previously used the `disabled` property:
```html
<ui5-option disabled>Option</ui5-option>
```
it will no longer work for the component.

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* You can no longer import and implement the `ITab` interface. TabContainer is designed to work only with Tab and TabSeparator classes, so the interface was obsolete.





# [1.24.0](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.4...v1.24.0) (2024-04-04)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.24.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.3...v1.24.0-rc.4) (2024-04-04)


### Bug Fixes

* **ui5-illustrated-message:** fixed infinite resize ([#8584](https://github.com/SAP/ui5-webcomponents/issues/8584)) ([aa1301b](https://github.com/SAP/ui5-webcomponents/commit/aa1301b9e1449f67668beaa1373699d54c50270c)), closes [#5852](https://github.com/SAP/ui5-webcomponents/issues/5852)
* **ui5-illustrated-message:** tnt chart illustrations alignment ([#8562](https://github.com/SAP/ui5-webcomponents/issues/8562)) ([2ee2ea8](https://github.com/SAP/ui5-webcomponents/commit/2ee2ea8a33b799b4b7488cfa2ca0ce845685e980))
* **ui5-illustrated-message:** vertical alignment ([#8566](https://github.com/SAP/ui5-webcomponents/issues/8566)) ([3141327](https://github.com/SAP/ui5-webcomponents/commit/3141327366e6b274e86e17519aadd660813048da)), closes [#8490](https://github.com/SAP/ui5-webcomponents/issues/8490)
* **ui5-shellbar:** scope internally used icons ([#8613](https://github.com/SAP/ui5-webcomponents/issues/8613)) ([8419ac5](https://github.com/SAP/ui5-webcomponents/commit/8419ac560851bba08cd7cf24ab18b085a5e212c4)), closes [#8609](https://github.com/SAP/ui5-webcomponents/issues/8609)





# [1.24.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.2...v1.24.0-rc.3) (2024-03-28)


### Features

* **ui5-side-navigation:** make items customizable ([#8479](https://github.com/SAP/ui5-webcomponents/issues/8479)) ([95f6891](https://github.com/SAP/ui5-webcomponents/commit/95f68918c44055b8c005462b8ed083f7aecf61fb))





# [1.24.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.1...v1.24.0-rc.2) (2024-03-21)


### Bug Fixes

* **ui5-timeline-item:** fix subtitle text overflows when long text provided ([#8462](https://github.com/SAP/ui5-webcomponents/issues/8462)) ([c938f6d](https://github.com/SAP/ui5-webcomponents/commit/c938f6d05e6661aa29d7f528f090a965fc8e0a39))





# [1.24.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.0...v1.24.0-rc.1) (2024-03-15)


### Features

* **ui5-side-navigation:** add navigation groups ([#8261](https://github.com/SAP/ui5-webcomponents/issues/8261)) ([8678dc0](https://github.com/SAP/ui5-webcomponents/commit/8678dc0ec8f017a41ac5bdcd7720bc055d28891c))





# [1.24.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.23.1...v1.24.0-rc.0) (2024-03-14)


### Bug Fixes

* **ui5-bar:** align subheader style ([#8412](https://github.com/SAP/ui5-webcomponents/issues/8412)) ([e42a976](https://github.com/SAP/ui5-webcomponents/commit/e42a976162314251b4c13d7b6850a80fcc2faffb)), closes [#8079](https://github.com/SAP/ui5-webcomponents/issues/8079)
* **ui5-shellbar:** fix volatile test ([#8411](https://github.com/SAP/ui5-webcomponents/issues/8411)) ([7e6bf4b](https://github.com/SAP/ui5-webcomponents/commit/7e6bf4b15a437f2795d5fa791f1df07122bc0121)), closes [#8409](https://github.com/SAP/ui5-webcomponents/issues/8409)


### Features

* **ui5-barcode-scanner-dialog:** add 'open' property ([#8316](https://github.com/SAP/ui5-webcomponents/issues/8316)) ([8f59d16](https://github.com/SAP/ui5-webcomponents/commit/8f59d166c55af5f692520ff3b88b09aca28738c3)), closes [#8072](https://github.com/SAP/ui5-webcomponents/issues/8072)





## [1.23.1](https://github.com/SAP/ui5-webcomponents/compare/v1.23.1-rc.0...v1.23.1) (2024-03-08)

**Note:** Version bump only for package @ui5/webcomponents-fiori





## [1.23.1-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0...v1.23.1-rc.0) (2024-03-07)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.23.0](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.5...v1.23.0) (2024-03-06)


### Bug Fixes

* **ui5-side-navigation:** fix private types ([#8158](https://github.com/SAP/ui5-webcomponents/issues/8158)) ([a03921c](https://github.com/SAP/ui5-webcomponents/commit/a03921cc4ad90418d3ca9dd2241a3cafe24e4fff))


### Features

* **ui5-illustrated-message:** introduced "Dot" size ([#8343](https://github.com/SAP/ui5-webcomponents/issues/8343)) ([9c88f36](https://github.com/SAP/ui5-webcomponents/commit/9c88f36112888c1a766875611eb2a0aecbbc6f23)), closes [#8328](https://github.com/SAP/ui5-webcomponents/issues/8328)





# [1.23.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.4...v1.23.0-rc.5) (2024-02-29)


### Bug Fixes

* **ui5-illustrated-message:** title subtitle aligned with visual spec ([#8344](https://github.com/SAP/ui5-webcomponents/issues/8344)) ([84fb0d9](https://github.com/SAP/ui5-webcomponents/commit/84fb0d94d0bf9597f10147ca4dff0fcbfc0570ff)), closes [#7879](https://github.com/SAP/ui5-webcomponents/issues/7879)





# [1.23.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.3...v1.23.0-rc.4) (2024-02-26)


### Bug Fixes

* **ui5-li-notification-group:** expand arrow visible ([#8329](https://github.com/SAP/ui5-webcomponents/issues/8329)) ([b2ca2a2](https://github.com/SAP/ui5-webcomponents/commit/b2ca2a299ebde195c5c16902a00969b6ada85f26)), closes [#8302](https://github.com/SAP/ui5-webcomponents/issues/8302)





# [1.23.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.2...v1.23.0-rc.3) (2024-02-22)


### Bug Fixes

* **ui5-timeline-item:** correct content check ([#8295](https://github.com/SAP/ui5-webcomponents/issues/8295)) ([414087f](https://github.com/SAP/ui5-webcomponents/commit/414087f676d83ba1a0e62e1bd929fcd9f9718e4d))





# [1.23.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.1...v1.23.0-rc.2) (2024-02-20)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.23.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.0...v1.23.0-rc.1) (2024-02-19)


### Bug Fixes

* **ui5-illustrated-message:** improved story and documentation ([#8294](https://github.com/SAP/ui5-webcomponents/issues/8294)) ([9740fe2](https://github.com/SAP/ui5-webcomponents/commit/9740fe21baa34233a66a4aea02f261fe1f5992f2))





# [1.23.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.22.1-rc.0...v1.23.0-rc.0) (2024-02-15)


### Bug Fixes

* **ui5-illustrated-message:** aligned with visual specification ([#8266](https://github.com/SAP/ui5-webcomponents/issues/8266)) ([143d4af](https://github.com/SAP/ui5-webcomponents/commit/143d4afccfa1046f08c17e591e2749304afcac49))


### Features

* **ui5-side-navigation:** add external link icon ([#8199](https://github.com/SAP/ui5-webcomponents/issues/8199)) ([47e28c5](https://github.com/SAP/ui5-webcomponents/commit/47e28c5c50c824dfb743b79998c4d98f56be4beb))





## [1.22.1-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.22.0...v1.22.1-rc.0) (2024-02-08)


### Bug Fixes

* cast ariaHasPopup acc attribute to lowercase ([#8239](https://github.com/SAP/ui5-webcomponents/issues/8239)) ([6692284](https://github.com/SAP/ui5-webcomponents/commit/66922847d6cbc545c500c661d18facac7c2f609c))
* **ui5-shellbar:** fixed secondaryTitle visual presentation ([#8221](https://github.com/SAP/ui5-webcomponents/issues/8221)) ([b3e0a80](https://github.com/SAP/ui5-webcomponents/commit/b3e0a80157615c22b89d7fb0857d22275cb83710)), closes [#8189](https://github.com/SAP/ui5-webcomponents/issues/8189)





# [1.22.0](https://github.com/SAP/ui5-webcomponents/compare/v1.22.0-rc.3...v1.22.0) (2024-02-05)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.22.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.22.0-rc.2...v1.22.0-rc.3) (2024-02-01)


### Bug Fixes

* build ([#8191](https://github.com/SAP/ui5-webcomponents/issues/8191)) ([5af9560](https://github.com/SAP/ui5-webcomponents/commit/5af956088195cd4de81f9c1ec82f1b937b3498aa))
* release build ([#8222](https://github.com/SAP/ui5-webcomponents/issues/8222)) ([27042ac](https://github.com/SAP/ui5-webcomponents/commit/27042ac90443dea8d5900d1c5bfa5bc93d365da0))
* **ui5-li-notification-group:** correct collapse button shape on Compact mode ([#8166](https://github.com/SAP/ui5-webcomponents/issues/8166)) ([226d975](https://github.com/SAP/ui5-webcomponents/commit/226d975204f0755daf25710ad639ebfbd2e8fdd4)), closes [#8059](https://github.com/SAP/ui5-webcomponents/issues/8059)
* **ui5-shellbar:** allow prevent default 'menu-item-click' action ([#8172](https://github.com/SAP/ui5-webcomponents/issues/8172)) ([d16efb6](https://github.com/SAP/ui5-webcomponents/commit/d16efb624f4d581bfa413cb96a4eebd4b9ce29d8))


### Features

* add dom shim so importing components in SSR works ([#8184](https://github.com/SAP/ui5-webcomponents/issues/8184)) ([ca49674](https://github.com/SAP/ui5-webcomponents/commit/ca49674e046bd74842100245db2cea61d53e2df0))
* **ui5-illustrated-message:** new illustration type ([#8204](https://github.com/SAP/ui5-webcomponents/issues/8204)) ([9bcf589](https://github.com/SAP/ui5-webcomponents/commit/9bcf58930ce9d8a65507e173d2af99c34e644e78))
* **ui5-illustrated-message:** new illustration type ([#8207](https://github.com/SAP/ui5-webcomponents/issues/8207)) ([6473ffe](https://github.com/SAP/ui5-webcomponents/commit/6473ffebd6001404c80cd06849e9135c6c350016))
* **ui5-shellbar:** introducing Joule ([#8036](https://github.com/SAP/ui5-webcomponents/issues/8036)) ([ed5c20f](https://github.com/SAP/ui5-webcomponents/commit/ed5c20ffb42dd5f3eb81f77819fd40a9f7abbe08))
* **ui5-shellbar:** new event added ([#8197](https://github.com/SAP/ui5-webcomponents/issues/8197)) ([4e864e9](https://github.com/SAP/ui5-webcomponents/commit/4e864e913597cdcc5d783012b8866afc1cde51a1)), closes [#6273](https://github.com/SAP/ui5-webcomponents/issues/6273)





# [1.22.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.22.0-rc.1...v1.22.0-rc.2) (2024-01-25)


### Bug Fixes

* **ui5-side-navigation:** allow overstyling of width and border-radius ([#8081](https://github.com/SAP/ui5-webcomponents/issues/8081)) ([392f118](https://github.com/SAP/ui5-webcomponents/commit/392f11815b5e85d22949b4008f0a95c64e16d694))
* **ui5-side-navigation:** correct text placement on items without icon ([#8154](https://github.com/SAP/ui5-webcomponents/issues/8154)) ([6bb45a9](https://github.com/SAP/ui5-webcomponents/commit/6bb45a94e5e52fc64fe8b816d1135e97ef6d85f3)), closes [#8131](https://github.com/SAP/ui5-webcomponents/issues/8131)


### Features

* **ui5-side-navigation:** display full item in collapsed mode on hover and focus ([#8112](https://github.com/SAP/ui5-webcomponents/issues/8112)) ([e0be298](https://github.com/SAP/ui5-webcomponents/commit/e0be29821a50d6c01f25d671565d0af4863e3d1e))





# [1.22.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.22.0-rc.0...v1.22.0-rc.1) (2024-01-18)


### Bug Fixes

* **ui5-shellbar:** logo aligned with visual specification ([#8109](https://github.com/SAP/ui5-webcomponents/issues/8109)) ([4430869](https://github.com/SAP/ui5-webcomponents/commit/443086969a3d09b02fe0807366089dcf5e042c45)), closes [#8058](https://github.com/SAP/ui5-webcomponents/issues/8058)


### Features

* **illustration:** use illustration name as default module export ([#8074](https://github.com/SAP/ui5-webcomponents/issues/8074)) ([a9c0705](https://github.com/SAP/ui5-webcomponents/commit/a9c07055d4e06e4d1f69b7a2a48b36eb77fae4aa))
* **ui5-illustrated-message:** add subtitle css part ([#8088](https://github.com/SAP/ui5-webcomponents/issues/8088)) ([351e570](https://github.com/SAP/ui5-webcomponents/commit/351e57042b25be66c2b47d72a89afd890dda063e))





# [1.22.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0...v1.22.0-rc.0) (2024-01-11)


### Features

* **ui5-side-navigation:** Add new overflow behaviour to collapsed mode ([#8019](https://github.com/SAP/ui5-webcomponents/issues/8019)) ([e5f8edd](https://github.com/SAP/ui5-webcomponents/commit/e5f8eddcdc9f1139d002585cdb014b47a0687b62))





# [1.21.0](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0-rc.5...v1.21.0) (2024-01-05)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.21.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0-rc.4...v1.21.0-rc.5) (2024-01-04)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.21.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0-rc.3...v1.21.0-rc.4) (2023-12-28)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.21.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0-rc.2...v1.21.0-rc.3) (2023-12-21)


### Features

* **tools:** Optimize build by switching css processing to esbuild ([#8008](https://github.com/SAP/ui5-webcomponents/issues/8008)) ([b4d411f](https://github.com/SAP/ui5-webcomponents/commit/b4d411f00f8d74ccecb2d02254126243faf53dfd))





# [1.21.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0-rc.1...v1.21.0-rc.2) (2023-12-14)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.21.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0-rc.0...v1.21.0-rc.1) (2023-12-08)


### Bug Fixes

* **infra:** release commands ([#7978](https://github.com/SAP/ui5-webcomponents/issues/7978)) ([b0e653c](https://github.com/SAP/ui5-webcomponents/commit/b0e653cf911cc0ffe5fb5dcbd50a7c238f20f33d))





# [1.21.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.20.0...v1.21.0-rc.0) (2023-12-07)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.20.0](https://github.com/SAP/ui5-webcomponents/compare/v1.20.0-rc.3...v1.20.0) (2023-12-04)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.20.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.20.0-rc.2...v1.20.0-rc.3) (2023-11-30)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.20.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.20.0-rc.1...v1.20.0-rc.2) (2023-11-23)


### Bug Fixes

* **ui5-wizard:** scrollbar styles are now present on root ([#7838](https://github.com/SAP/ui5-webcomponents/issues/7838)) ([1534d89](https://github.com/SAP/ui5-webcomponents/commit/1534d897f15f52f947a96430ca498a5548e4b6c8))





# [1.20.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.20.0-rc.0...v1.20.0-rc.1) (2023-11-16)


### Features

* **ui5-illustrated-message:** titleLevel property added ([#7771](https://github.com/SAP/ui5-webcomponents/issues/7771)) ([2883c58](https://github.com/SAP/ui5-webcomponents/commit/2883c587f367e51e0f08065498b990f86e60e88c)), closes [#7037](https://github.com/SAP/ui5-webcomponents/issues/7037)





# [1.20.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.19.0...v1.20.0-rc.0) (2023-11-09)


### Features

* **ui5-illustrated-message:** added new TNT illustrations ([#7773](https://github.com/SAP/ui5-webcomponents/issues/7773)) ([03f28b9](https://github.com/SAP/ui5-webcomponents/commit/03f28b90df0b2a28c0f09f67caaa0a5a1e63c4f3))
* **ui5-side-navigation:** added href and target properties ([#7682](https://github.com/SAP/ui5-webcomponents/issues/7682)) ([7530f00](https://github.com/SAP/ui5-webcomponents/commit/7530f00b589d0b95dcbee49f6ed980e9d36ba58b))





# [1.19.0](https://github.com/SAP/ui5-webcomponents/compare/v1.19.0-rc.3...v1.19.0) (2023-11-02)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.19.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.19.0-rc.2...v1.19.0-rc.3) (2023-11-02)


### Bug Fixes

* **ui5-view-settings-dialog:** improve settings management ([#7769](https://github.com/SAP/ui5-webcomponents/issues/7769)) ([33cdb86](https://github.com/SAP/ui5-webcomponents/commit/33cdb86b34a3cb6e1b849a186a8c8c1652eb5bca)), closes [#7752](https://github.com/SAP/ui5-webcomponents/issues/7752)





# [1.19.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.19.0-rc.1...v1.19.0-rc.2) (2023-10-26)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.19.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.19.0-rc.0...v1.19.0-rc.1) (2023-10-19)


### Bug Fixes

* **ui5-flexible-column-layout:** wrong focus fixed ([#7586](https://github.com/SAP/ui5-webcomponents/issues/7586)) ([721cc0b](https://github.com/SAP/ui5-webcomponents/commit/721cc0b312fb76142dea97712b21343b7b93337e))





# [1.19.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.18.1-rc.0...v1.19.0-rc.0) (2023-10-12)


### Bug Fixes

* **ui5-page:** adjust Horizon themes ([#7685](https://github.com/SAP/ui5-webcomponents/issues/7685)) ([39ccfe6](https://github.com/SAP/ui5-webcomponents/commit/39ccfe63d07b74bb50eb46a419de34fa1461bc6c))
* **ui5-shellbar:** apply correct height to horizon high contrast themes ([#7655](https://github.com/SAP/ui5-webcomponents/issues/7655)) ([b72f012](https://github.com/SAP/ui5-webcomponents/commit/b72f0124f9b3ebe74cceeaaaf69abd6711ced0e5))
* **ui5-shellbar:** horizon theme update ([#7623](https://github.com/SAP/ui5-webcomponents/issues/7623)) ([ff04434](https://github.com/SAP/ui5-webcomponents/commit/ff04434c9c00b29367faff22d187edb55186eccd))
* **ui5-shellbar:** often failing unit test ([#7677](https://github.com/SAP/ui5-webcomponents/issues/7677)) ([a14d57c](https://github.com/SAP/ui5-webcomponents/commit/a14d57c2c25c714983ee3cb0899c8ec72a677b55)), closes [#7673](https://github.com/SAP/ui5-webcomponents/issues/7673)


### Features

* **ui5-illustrated-message:** enable vertical responsiveness ([#7672](https://github.com/SAP/ui5-webcomponents/issues/7672)) ([45244aa](https://github.com/SAP/ui5-webcomponents/commit/45244aacdc4fa846175d8a097ae242256e32a5b4)), closes [#6492](https://github.com/SAP/ui5-webcomponents/issues/6492)





## [1.18.1-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.18.0...v1.18.1-rc.0) (2023-10-05)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.18.0](https://github.com/SAP/ui5-webcomponents/compare/v1.18.0-rc.2...v1.18.0) (2023-10-02)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.18.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.18.0-rc.1...v1.18.0-rc.2) (2023-09-28)


### Bug Fixes

* **ui5-media-gallery:** added new horizon theme parameters ([#7575](https://github.com/SAP/ui5-webcomponents/issues/7575)) ([25dbb4b](https://github.com/SAP/ui5-webcomponents/commit/25dbb4bd79890143021b9ecd3033665ea82cd6fa))





# [1.18.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.18.0-rc.0...v1.18.0-rc.1) (2023-09-21)


### Bug Fixes

* **ui5-dialog:** fix background and shadow of slotted ui5-bar ([#7421](https://github.com/SAP/ui5-webcomponents/issues/7421)) ([2746460](https://github.com/SAP/ui5-webcomponents/commit/2746460ebd0d6517e8eedadde30b74e424c17a85)), closes [#7418](https://github.com/SAP/ui5-webcomponents/issues/7418)
* **ui5-upload-collection-item:** align thumbnail to top ([#7582](https://github.com/SAP/ui5-webcomponents/issues/7582)) ([edeab49](https://github.com/SAP/ui5-webcomponents/commit/edeab49e3f7b63b3aee358983ea1fb9ff586ea3c)), closes [#7551](https://github.com/SAP/ui5-webcomponents/issues/7551)
* **ui5-upload-collеction:** align buttons to avoid extra space when size is small ([#7491](https://github.com/SAP/ui5-webcomponents/issues/7491)) ([6594cd5](https://github.com/SAP/ui5-webcomponents/commit/6594cd5df91f31f31efc740846670df4a1c1933d))





# [1.18.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.17.0...v1.18.0-rc.0) (2023-09-07)


### Bug Fixes

* **ui5-shellbar:** align notification counter ([#7490](https://github.com/SAP/ui5-webcomponents/issues/7490)) ([f8975a6](https://github.com/SAP/ui5-webcomponents/commit/f8975a67f81b62d90db1e508a85c3c894e995e95)), closes [#7208](https://github.com/SAP/ui5-webcomponents/issues/7208)





# [1.17.0](https://github.com/SAP/ui5-webcomponents/compare/v1.17.0-rc.2...v1.17.0) (2023-09-01)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.17.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.17.0-rc.1...v1.17.0-rc.2) (2023-08-24)


### Bug Fixes

* **ui5-page:** enhance storybook samples ([#7448](https://github.com/SAP/ui5-webcomponents/issues/7448)) ([d0b8b01](https://github.com/SAP/ui5-webcomponents/commit/d0b8b01c053853915646b077860a247400cff691))





# [1.17.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.17.0-rc.0...v1.17.0-rc.1) (2023-08-17)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.17.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.16.0...v1.17.0-rc.0) (2023-08-10)


### Bug Fixes

* **ui5-illustrated-message:** support collection based illustration loading ([#7318](https://github.com/SAP/ui5-webcomponents/issues/7318)) ([6b52dbd](https://github.com/SAP/ui5-webcomponents/commit/6b52dbd157a3c8198e41c84157e3d9ae89e3386e))
* **ui5-shellbar:** button focus outline adjustment ([#7389](https://github.com/SAP/ui5-webcomponents/issues/7389)) ([3b7c711](https://github.com/SAP/ui5-webcomponents/commit/3b7c711875303be0bb995c80545a9786b2ec511c)), closes [#7220](https://github.com/SAP/ui5-webcomponents/issues/7220)
* **ui5-side-navigation:** allow overstyling of border-radius ([#7400](https://github.com/SAP/ui5-webcomponents/issues/7400)) ([16ca431](https://github.com/SAP/ui5-webcomponents/commit/16ca43197ee7e9d522c813933c660b7dfe2a6ea3)), closes [#7308](https://github.com/SAP/ui5-webcomponents/issues/7308)





# [1.16.0](https://github.com/SAP/ui5-webcomponents/compare/v1.16.0-rc.4...v1.16.0) (2023-08-03)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.16.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.16.0-rc.3...v1.16.0-rc.4) (2023-08-03)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.16.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.16.0-rc.2...v1.16.0-rc.3) (2023-07-27)


### Bug Fixes

* **ui5-upload-collection:** correct visualization of "mode" property ([#7252](https://github.com/SAP/ui5-webcomponents/issues/7252)) ([9ca02dd](https://github.com/SAP/ui5-webcomponents/commit/9ca02ddae31ca45dfc734906e1f0da2413ceac40)), closes [#7111](https://github.com/SAP/ui5-webcomponents/issues/7111)





# [1.16.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.16.0-rc.1...v1.16.0-rc.2) (2023-07-20)


### Features

* **ui5-wizard:** progress navigator title and optional text truncation ([#7263](https://github.com/SAP/ui5-webcomponents/issues/7263)) ([74077d1](https://github.com/SAP/ui5-webcomponents/commit/74077d1f16cb01347b01d1d55ef333789f5601f0))





# [1.16.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.16.0-rc.0...v1.16.0-rc.1) (2023-07-13)


### Bug Fixes

* **ui5-shellbar:** primary and secondary titles alignment ([#7215](https://github.com/SAP/ui5-webcomponents/issues/7215)) ([9c32e30](https://github.com/SAP/ui5-webcomponents/commit/9c32e308ed5397ce40fd6ffa7c9b0e23573be75b)), closes [#7153](https://github.com/SAP/ui5-webcomponents/issues/7153) [#7107](https://github.com/SAP/ui5-webcomponents/issues/7107)





# [1.16.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.15.1...v1.16.0-rc.0) (2023-07-06)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.15.0](https://github.com/SAP/ui5-webcomponents/compare/v1.15.0-rc.2...v1.15.0) (2023-06-30)


### Bug Fixes

* **ui5-shellbar:** align notification counter badge ([#7208](https://github.com/SAP/ui5-webcomponents/issues/7208)) ([1ee67f5](https://github.com/SAP/ui5-webcomponents/commit/1ee67f570ac722983859690fb602c5b62498d6d5))
* **ui5-shellbar:** overflow action text translated ([#7218](https://github.com/SAP/ui5-webcomponents/issues/7218)) ([31af59c](https://github.com/SAP/ui5-webcomponents/commit/31af59c6667149798f619cce5eba9d456c29f452))
* **ui5-shellbar:** tweaked breakpoint size "S" responsive padding ([#7219](https://github.com/SAP/ui5-webcomponents/issues/7219)) ([af597d1](https://github.com/SAP/ui5-webcomponents/commit/af597d1bc9d3a8e1bd6e79a39eebd84e57416c70))
* **ui5-view-settings-dialog:** fix footer buttons position ([#7270](https://github.com/SAP/ui5-webcomponents/issues/7270)) ([e569e6b](https://github.com/SAP/ui5-webcomponents/commit/e569e6b424cc186e22c5972c45d6f11c081505d5))





# [1.15.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.15.0-rc.1...v1.15.0-rc.2) (2023-06-22)


### Bug Fixes

* **ui5-page, ui5-wizard:** apply scrollbar styling ([#7224](https://github.com/SAP/ui5-webcomponents/issues/7224)) ([09eb5be](https://github.com/SAP/ui5-webcomponents/commit/09eb5beec006eeb9787740014cefa0335e8603c9))
* **ui5-wizard:** prevent throwing exception in the console ([#7204](https://github.com/SAP/ui5-webcomponents/issues/7204)) ([c684135](https://github.com/SAP/ui5-webcomponents/commit/c684135fd64b453a639b0ce29593f03ae02ceac6))


### Features

* **ui5-side-navigation:** update Horizon theme design ([#7186](https://github.com/SAP/ui5-webcomponents/issues/7186)) ([819d153](https://github.com/SAP/ui5-webcomponents/commit/819d153ba5d82c0e48a642d2ee21ccc0fb61e253)), closes [#7160](https://github.com/SAP/ui5-webcomponents/issues/7160)





# [1.15.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.15.0-rc.0...v1.15.0-rc.1) (2023-06-15)

**Note:** Version bump only for package @ui5/webcomponents-fiori









# [1.15.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.14.0...v1.15.0-rc.0) (2023-06-08)


### Bug Fixes

* **ui5-bar:** apply correct box-shadow parameter ([#7150](https://github.com/SAP/ui5-webcomponents/issues/7150)) ([5f9ba23](https://github.com/SAP/ui5-webcomponents/commit/5f9ba23d9c28b2860c43e4396575609f6f6ff1e8))
* **ui5-bar:** correct padding values in dialog ([#7046](https://github.com/SAP/ui5-webcomponents/issues/7046)) ([b20c946](https://github.com/SAP/ui5-webcomponents/commit/b20c946a00a91cc25eb709f839ccaa12998bf58e))
* **ui5-illustrated-message:** text update in Survey ([#7146](https://github.com/SAP/ui5-webcomponents/issues/7146)) ([a4299ce](https://github.com/SAP/ui5-webcomponents/commit/a4299ce1249a547c89a2335325422944974455cd))
* **ui5-shellbar:** improve RTL styling of searchField ([#7089](https://github.com/SAP/ui5-webcomponents/issues/7089)) ([9373abf](https://github.com/SAP/ui5-webcomponents/commit/9373abfd0114650069855419f1caeb2fc5462114)), closes [#7065](https://github.com/SAP/ui5-webcomponents/issues/7065)
* **ui5-upload-collection:** item-delete event and delete mode docs are now updated ([#7106](https://github.com/SAP/ui5-webcomponents/issues/7106)) ([b12bccb](https://github.com/SAP/ui5-webcomponents/commit/b12bccb72bdcc63a966bbb54b0d044436e01cb50))





# [1.14.0](https://github.com/SAP/ui5-webcomponents/compare/v1.14.0-rc.2...v1.14.0) (2023-06-01)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.14.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.14.0-rc.1...v1.14.0-rc.2) (2023-06-01)


### Features

* **ui5-wizard:** introduce contentLayout property ([#7006](https://github.com/SAP/ui5-webcomponents/issues/7006)) ([66e9c3d](https://github.com/SAP/ui5-webcomponents/commit/66e9c3d83a945ae80e32d8614084b732cabd2bea))





# [1.14.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.14.0-rc.0...v1.14.0-rc.1) (2023-05-25)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.14.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.13.2...v1.14.0-rc.0) (2023-05-18)


### Bug Fixes

* **ui5-shellbar:** badge visual alignment ([#7004](https://github.com/SAP/ui5-webcomponents/issues/7004)) ([45a176d](https://github.com/SAP/ui5-webcomponents/commit/45a176da6dd5413617a25a92c1f7ba2e194790b6))
* **ui5-shellbar:** remove double box-shadow effect on hover ([#7033](https://github.com/SAP/ui5-webcomponents/issues/7033)) ([fde8b69](https://github.com/SAP/ui5-webcomponents/commit/fde8b69b99175b91cf1a6c3b5018c044c07c8bd7))


### Features

* **framework:** use `template literal notation` for enum types ([#6856](https://github.com/SAP/ui5-webcomponents/issues/6856)) ([0de21e8](https://github.com/SAP/ui5-webcomponents/commit/0de21e8ba37c6a75fd3d2a29a16cc82661619cb1)), closes [#6636](https://github.com/SAP/ui5-webcomponents/issues/6636)





## [1.13.2](https://github.com/SAP/ui5-webcomponents/compare/v1.13.1...v1.13.2) (2023-05-15)


### Bug Fixes

* **ui5-shellbar:** containers shrink factor reduced ([#6982](https://github.com/SAP/ui5-webcomponents/issues/6982)) ([e82744b](https://github.com/SAP/ui5-webcomponents/commit/e82744bd715bae744a7e41849f1fafc5ccc389ee))





## [1.13.1](https://github.com/SAP/ui5-webcomponents/compare/v1.13.0-rc.5...v1.13.1) (2023-05-11)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.13.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v1.13.0-rc.4...v1.13.0-rc.5) (2023-05-11)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.13.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.13.0-rc.3...v1.13.0-rc.4) (2023-05-04)


### Bug Fixes

* add missing file-extensions for ESM support ([#6971](https://github.com/SAP/ui5-webcomponents/issues/6971)) ([1f42d0c](https://github.com/SAP/ui5-webcomponents/commit/1f42d0c658a437d64000c0f9b7562edff85b8421))


### Features

* generate TS from HBS templates ([#6558](https://github.com/SAP/ui5-webcomponents/issues/6558)) ([02611b2](https://github.com/SAP/ui5-webcomponents/commit/02611b2e24b2c2a06129b8e60a8bc680d9501e39))





# [1.13.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.13.0-rc.2...v1.13.0-rc.3) (2023-04-27)


### Bug Fixes

* **ui5-flexible-column-layout:** add new border parameter for horizon theme ([#6915](https://github.com/SAP/ui5-webcomponents/issues/6915)) ([863a057](https://github.com/SAP/ui5-webcomponents/commit/863a0574fa0f712da34e1c25b660d197c28757b8))





# [1.13.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.13.0-rc.1...v1.13.0-rc.2) (2023-04-20)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.13.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.13.0-rc.0...v1.13.0-rc.1) (2023-04-13)


### Bug Fixes

* **ui5-bar:** fix top and bottom border of Buttons hidden in ui5-bar when shrinked ([#6887](https://github.com/SAP/ui5-webcomponents/issues/6887)) ([c425bde](https://github.com/SAP/ui5-webcomponents/commit/c425bded5e1047ad5863c764206286bce9b15282))
* **ui5-shellbar:** primary title respects text spacing styles ([#6882](https://github.com/SAP/ui5-webcomponents/issues/6882)) ([5ab70d7](https://github.com/SAP/ui5-webcomponents/commit/5ab70d79673a83a3ebefb890065698d841cf0fe3))
* **ui5-side-navigation:** avoid firing selection-change when the selected item is clicked ([#6842](https://github.com/SAP/ui5-webcomponents/issues/6842)) ([98c554f](https://github.com/SAP/ui5-webcomponents/commit/98c554f94e5d1ccd5987d9b799e7ead3f6a1745b)), closes [#6825](https://github.com/SAP/ui5-webcomponents/issues/6825)
* **ui5-timeline*:** fix chronological line not displaying in vertical or default layout ([#6872](https://github.com/SAP/ui5-webcomponents/issues/6872)) ([69ad2a9](https://github.com/SAP/ui5-webcomponents/commit/69ad2a999a83429041e190033d9733c6bd0e1526))





# [1.13.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.12.0...v1.13.0-rc.0) (2023-04-06)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.12.0](https://github.com/SAP/ui5-webcomponents/compare/v1.12.0-rc.3...v1.12.0) (2023-04-04)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.12.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.12.0-rc.2...v1.12.0-rc.3) (2023-03-30)


### Bug Fixes

* **ui5-side-navigation:** correct-style description ([#6814](https://github.com/SAP/ui5-webcomponents/issues/6814)) ([38b14c5](https://github.com/SAP/ui5-webcomponents/commit/38b14c509cc8d650f34250d21422ea57f7ce5cdd))





# [1.12.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.12.0-rc.1...v1.12.0-rc.2) (2023-03-23)


### Bug Fixes

* inline sources in the .map file so the src folder is not mandatory ([#6732](https://github.com/SAP/ui5-webcomponents/issues/6732)) ([16771a6](https://github.com/SAP/ui5-webcomponents/commit/16771a64d7b13f418af9afa1a03b224fe3762775))


### Features

* **ui5-illustrated-message:** added new illustration type "Survey" ([#6747](https://github.com/SAP/ui5-webcomponents/issues/6747)) ([43301a9](https://github.com/SAP/ui5-webcomponents/commit/43301a961da009500bdfba96d4abcdf86a2a0039))
* **ui5-illustrated-message:** added new illustrations ([#6701](https://github.com/SAP/ui5-webcomponents/issues/6701)) ([bead264](https://github.com/SAP/ui5-webcomponents/commit/bead2646325f86a6e5f136d48f8b04ec7983155c))
* **ui5-upload-collection:** add IllustratedMessage for empty state ([#6657](https://github.com/SAP/ui5-webcomponents/issues/6657)) ([9ea5c93](https://github.com/SAP/ui5-webcomponents/commit/9ea5c93a5016143a50240d9d178422434a069365)), closes [#6271](https://github.com/SAP/ui5-webcomponents/issues/6271)





# [1.12.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.12.0-rc.0...v1.12.0-rc.1) (2023-03-16)


### Features

* **ui5-product-switch:** enable alignment of items ([#6683](https://github.com/SAP/ui5-webcomponents/issues/6683)) ([97cba4b](https://github.com/SAP/ui5-webcomponents/commit/97cba4b0b63d3c8be5be1972188ebc780c255c2a))





# [1.12.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.11.0...v1.12.0-rc.0) (2023-03-09)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.11.0](https://github.com/SAP/ui5-webcomponents/compare/v1.11.0-rc.4...v1.11.0) (2023-03-06)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.11.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.11.0-rc.3...v1.11.0-rc.4) (2023-03-02)


### Features

* **framework:** use decorators for all static getters to define a custom element ([#6538](https://github.com/SAP/ui5-webcomponents/issues/6538)) ([c90cf0c](https://github.com/SAP/ui5-webcomponents/commit/c90cf0c2521cdbf063ba55706c25006a9f13e68a))
* **ui5-li-notification, ui5-li-notification-group:** migrate to TypeScript ([#6568](https://github.com/SAP/ui5-webcomponents/issues/6568)) ([15dfc6e](https://github.com/SAP/ui5-webcomponents/commit/15dfc6e0716802fa00251629b80d5dc56ebb3472))
* **ui5-media-gallery:** migrate to Typescript ([#6484](https://github.com/SAP/ui5-webcomponents/issues/6484)) ([3e53ada](https://github.com/SAP/ui5-webcomponents/commit/3e53adac7f01e58a246ad2b68298c304b7a2e949))
* **ui5-shellbar:** migrate to Typescript ([#6561](https://github.com/SAP/ui5-webcomponents/issues/6561)) ([8431c60](https://github.com/SAP/ui5-webcomponents/commit/8431c60f2a8cd58bc8cc5708faa02111f079ffa7))
* **ui5-wizard:** migrate to Typescript  ([#6540](https://github.com/SAP/ui5-webcomponents/issues/6540)) ([57e2de7](https://github.com/SAP/ui5-webcomponents/commit/57e2de7973755909cde287f946e4a1b5f6f4a721)), closes [#4337](https://github.com/SAP/ui5-webcomponents/issues/4337) [#4337](https://github.com/SAP/ui5-webcomponents/issues/4337) [#4337](https://github.com/SAP/ui5-webcomponents/issues/4337) [#4337](https://github.com/SAP/ui5-webcomponents/issues/4337)





# [1.11.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.11.0-rc.2...v1.11.0-rc.3) (2023-02-23)


### Bug Fixes

* **ui5-dialog:** overstyle bar when slotted in footer ([#6543](https://github.com/SAP/ui5-webcomponents/issues/6543)) ([a13ae40](https://github.com/SAP/ui5-webcomponents/commit/a13ae407f1decb17648c4ab5dac382b11ec0bd9c)), closes [#5561](https://github.com/SAP/ui5-webcomponents/issues/5561)
* **ui5-select, ui5-suggestion-item, ui5-shellbar:** color of icon inside options is according to spec ([#6415](https://github.com/SAP/ui5-webcomponents/issues/6415)) ([78cd73b](https://github.com/SAP/ui5-webcomponents/commit/78cd73b2f6940e62dcd297b4a2c5c63ea7a295e1))


### Features

* **playground:** next playground with storybook ([#5831](https://github.com/SAP/ui5-webcomponents/issues/5831)) ([79274c8](https://github.com/SAP/ui5-webcomponents/commit/79274c8e442cf5854a7fe6327f25aaed04312103)), closes [#5898](https://github.com/SAP/ui5-webcomponents/issues/5898)
* **ui5-side-navigation:** migrate to TypeScript ([#6429](https://github.com/SAP/ui5-webcomponents/issues/6429)) ([d8ab195](https://github.com/SAP/ui5-webcomponents/commit/d8ab195f59e9208dc9cb1dfd5ffc6518304da055)), closes [#4337](https://github.com/SAP/ui5-webcomponents/issues/4337) [#6436](https://github.com/SAP/ui5-webcomponents/issues/6436)





# [1.11.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.11.0-rc.1...v1.11.0-rc.2) (2023-02-16)


### Bug Fixes

* **ui5-page:** update documentation on page height ([#6476](https://github.com/SAP/ui5-webcomponents/issues/6476)) ([4c4bb37](https://github.com/SAP/ui5-webcomponents/commit/4c4bb3749561ec0c07390bb53500c9b0ad5bd836))
* **ui5-side-navigation:** scope components in static area ([#6453](https://github.com/SAP/ui5-webcomponents/issues/6453)) ([76307cb](https://github.com/SAP/ui5-webcomponents/commit/76307cb2e249a0ccf0719366e6b29f3c8a77ae15))


### Features

* **ui5-segmented-button, ui5-toggle-button:** migrated to TypeScript ([#6374](https://github.com/SAP/ui5-webcomponents/issues/6374)) ([26064db](https://github.com/SAP/ui5-webcomponents/commit/26064dbb5ab842712bb304aca619cd10bac38d2b))





# [1.11.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.11.0-rc.0...v1.11.0-rc.1) (2023-02-09)


### Bug Fixes

* **ui5-shellbar:** i18n of cancel search button text ([#6416](https://github.com/SAP/ui5-webcomponents/issues/6416)) ([3efdc6c](https://github.com/SAP/ui5-webcomponents/commit/3efdc6cf7d14b37e714a3979a16ea4cbe498f85e))





# [1.11.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.10.4-rc.0...v1.11.0-rc.0) (2023-02-02)


### Features

* **ui5-barcode-scanner-dialog:** migrated to Typescript ([#6338](https://github.com/SAP/ui5-webcomponents/issues/6338)) ([10b4417](https://github.com/SAP/ui5-webcomponents/commit/10b4417e8ea4229b6bd2ef5b4957bbf00d155d39))





## [1.10.4-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.10.3...v1.10.4-rc.0) (2023-01-26)

**Note:** Version bump only for package @ui5/webcomponents-fiori





## [1.10.3](https://github.com/SAP/ui5-webcomponents/compare/v1.10.2...v1.10.3) (2023-01-25)

**Note:** Version bump only for package @ui5/webcomponents-fiori





## [1.10.2](https://github.com/SAP/ui5-webcomponents/compare/v1.10.1...v1.10.2) (2023-01-25)

**Note:** Version bump only for package @ui5/webcomponents-fiori





## [1.10.1](https://github.com/SAP/ui5-webcomponents/compare/v0.0.0-7b49a7ff1...v1.10.1) (2023-01-24)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.10.0](https://github.com/SAP/ui5-webcomponents/compare/v1.9.3...v1.10.0) (2023-01-20)


### Bug Fixes

* **docs:** samples typos ([#6236](https://github.com/SAP/ui5-webcomponents/issues/6236)) ([be26877](https://github.com/SAP/ui5-webcomponents/commit/be26877e361cd17407498b370e08cf11c175a2d5))
* **i18n:** processing text with formater ([#6041](https://github.com/SAP/ui5-webcomponents/issues/6041)) ([f155dee](https://github.com/SAP/ui5-webcomponents/commit/f155deee5ca7b1cb4a0e1e61298a895344321eb0))
* **ui5-illustrated-message:** i18n texts are fixed ([#6037](https://github.com/SAP/ui5-webcomponents/issues/6037)) ([68350bc](https://github.com/SAP/ui5-webcomponents/commit/68350bc57f50d0f220321a05fb59238bef3dde96)), closes [#5974](https://github.com/SAP/ui5-webcomponents/issues/5974)
* **ui5-illustrated-message:** resize fixed ([#6179](https://github.com/SAP/ui5-webcomponents/issues/6179)) ([d52c8af](https://github.com/SAP/ui5-webcomponents/commit/d52c8afda49b5a0c880551d516b82cc99a0cebc5))
* **ui5-shellbar:** fixed typo in samples ([#6128](https://github.com/SAP/ui5-webcomponents/issues/6128)) ([c6799f4](https://github.com/SAP/ui5-webcomponents/commit/c6799f49c60297cdbaad53f9442776630d3ea884)), closes [#6116](https://github.com/SAP/ui5-webcomponents/issues/6116)
* **ui5-shellbar:** focus on popover fixed ([#6113](https://github.com/SAP/ui5-webcomponents/issues/6113)) ([61c9989](https://github.com/SAP/ui5-webcomponents/commit/61c9989d318c4725eff97c7da70430e11c9eb56f))
* **ui5-side-navigation:** fixed accessibility of the Popover ([#6045](https://github.com/SAP/ui5-webcomponents/issues/6045)) ([e0e13e1](https://github.com/SAP/ui5-webcomponents/commit/e0e13e11d26abbcb2746e4abd1c72d312212ebaf)), closes [#5827](https://github.com/SAP/ui5-webcomponents/issues/5827)
* **ui5-side-navigation:** fixed accessibility roles and attributes when Side Navigation is collapsed ([#5877](https://github.com/SAP/ui5-webcomponents/issues/5877)) ([92b9dc9](https://github.com/SAP/ui5-webcomponents/commit/92b9dc99ea4c598f22111dfea3a435e55c585dfc)), closes [#5827](https://github.com/SAP/ui5-webcomponents/issues/5827)
* **ui5-side-navigation:** focus handling of tree inside popover ([#6155](https://github.com/SAP/ui5-webcomponents/issues/6155)) ([cf024bd](https://github.com/SAP/ui5-webcomponents/commit/cf024bd43e08dd4dccc6cab225b81b3f4f771a74))
* **ui5-wizard:** allow scrolling when step is bigger than viewport ([#6241](https://github.com/SAP/ui5-webcomponents/issues/6241)) ([259b61a](https://github.com/SAP/ui5-webcomponents/commit/259b61afafd46f1e5bc881bf780e636683769ac1))
* **ui5-wizard:** prevent step overlapping in navigator ([#6169](https://github.com/SAP/ui5-webcomponents/issues/6169)) ([9349e16](https://github.com/SAP/ui5-webcomponents/commit/9349e167eba0c0feac41004b41abf17fbca348b2)), closes [#6067](https://github.com/SAP/ui5-webcomponents/issues/6067)


### Features

* enable TS in main, fiori ([#6064](https://github.com/SAP/ui5-webcomponents/issues/6064)) ([0b56130](https://github.com/SAP/ui5-webcomponents/commit/0b561307b93b8af465dc5bee67650069ee138f7f))
* fiori `types` folder to TypeScript  ([#6076](https://github.com/SAP/ui5-webcomponents/issues/6076)) ([918b4fb](https://github.com/SAP/ui5-webcomponents/commit/918b4fbe7e14220c46115f7426a3d844f5c6ac1f))
* migrate illustrated-message component to TS, small refactor ([#6195](https://github.com/SAP/ui5-webcomponents/issues/6195)) ([046c779](https://github.com/SAP/ui5-webcomponents/commit/046c779f654648172619dd720c0d90342ec78fb9))
* support decorators for custom elements metadata ([#6072](https://github.com/SAP/ui5-webcomponents/issues/6072)) ([fc9ee6e](https://github.com/SAP/ui5-webcomponents/commit/fc9ee6e2af10b4315fde072a50ab37efa180c809))
* **ui5-button, ui5-date-picker, ui5-calendar:** migrate to TS ([#6173](https://github.com/SAP/ui5-webcomponents/issues/6173)) ([7232ca0](https://github.com/SAP/ui5-webcomponents/commit/7232ca08f286c5dde10080373fb62247f1acf7b7)), closes [#6080](https://github.com/SAP/ui5-webcomponents/issues/6080)
* **ui5-Illustrated-message:** illustrations update in the default set ([#6013](https://github.com/SAP/ui5-webcomponents/issues/6013)) ([329f80c](https://github.com/SAP/ui5-webcomponents/commit/329f80cca0d9c195e0e776a21d693cb0097d640a))
* **ui5-Illustrated-message:** updated missing illustration texts ([#6075](https://github.com/SAP/ui5-webcomponents/issues/6075)) ([78c3227](https://github.com/SAP/ui5-webcomponents/commit/78c3227ac5766903df551f6211dbc04c767cea88))
* **ui5-list, ui5-li, ui5-li-custom:** migrate to TS ([#6166](https://github.com/SAP/ui5-webcomponents/issues/6166)) ([12b3570](https://github.com/SAP/ui5-webcomponents/commit/12b35707c3f0934dcb98fdcde0ed715140a4af4a))
* **ui5-shellbar:** accessibilityAttributes property added ([#6117](https://github.com/SAP/ui5-webcomponents/issues/6117)) ([056ed9f](https://github.com/SAP/ui5-webcomponents/commit/056ed9fc21c9dac8b6a289d57a23fcb6f9e44c04))
* **ui5-shellbar:** programmatically show search field ([#6085](https://github.com/SAP/ui5-webcomponents/issues/6085)) ([e0658a6](https://github.com/SAP/ui5-webcomponents/commit/e0658a6503ea0203df74317f57e4fb0a5be7620e)), closes [#5818](https://github.com/SAP/ui5-webcomponents/issues/5818)
* **ui5-shellbar:** use header semantic element ([#6146](https://github.com/SAP/ui5-webcomponents/issues/6146)) ([9865eb2](https://github.com/SAP/ui5-webcomponents/commit/9865eb2d5825d1ce799fc110611288e5fa090613))
* **ui5-tree-item-custom:** initial implementation ([#5962](https://github.com/SAP/ui5-webcomponents/issues/5962)) ([b148c23](https://github.com/SAP/ui5-webcomponents/commit/b148c23cf7ed11b4e17c9eda61a20fc48882ba4f))
* **ui5-viewsettings-dialog:** migrate to Typescript ([#6218](https://github.com/SAP/ui5-webcomponents/issues/6218)) ([ee3bbe4](https://github.com/SAP/ui5-webcomponents/commit/ee3bbe46b070092dffd054b1350f444fa072539e))
* **ui5-wizard:** adopt responsive paddings ([#6061](https://github.com/SAP/ui5-webcomponents/issues/6061)) ([402bc28](https://github.com/SAP/ui5-webcomponents/commit/402bc28137fab738778f8c7da099c073cc39f45d)), closes [#5597](https://github.com/SAP/ui5-webcomponents/issues/5597)





## [1.9.3](https://github.com/SAP/ui5-webcomponents/compare/v1.9.2...v1.9.3) (2022-12-16)

**Note:** Version bump only for package @ui5/webcomponents-fiori





## [1.9.1](https://github.com/SAP/ui5-webcomponents/compare/v1.9.0...v1.9.1) (2022-11-10)


### Bug Fixes

* **framework:** fix paths for generating illustration imports in nps ([#5997](https://github.com/SAP/ui5-webcomponents/issues/5997)) ([e932f7d](https://github.com/SAP/ui5-webcomponents/commit/e932f7d069ebf10f73219bff7154558b7b0d849e))





# [1.9.0](https://github.com/SAP/ui5-webcomponents/compare/v1.8.0...v1.9.0) (2022-10-31)


### Bug Fixes

* **BarcodeScannerDialog:** imports of UMD modules work in all kinds o… ([#5901](https://github.com/SAP/ui5-webcomponents/issues/5901)) ([af203b9](https://github.com/SAP/ui5-webcomponents/commit/af203b94e1143bb01ecd596d5583c90da8f77eba))
* **ui5-illustrated-message:** prevent infinite resize ([#5882](https://github.com/SAP/ui5-webcomponents/issues/5882)) ([a8413ad](https://github.com/SAP/ui5-webcomponents/commit/a8413adb6933202da4ff8695823ea840d1be07bb)), closes [#5852](https://github.com/SAP/ui5-webcomponents/issues/5852)
* **ui5-notifications:** add missing imports for used icons ([#5907](https://github.com/SAP/ui5-webcomponents/issues/5907)) ([a50a22f](https://github.com/SAP/ui5-webcomponents/commit/a50a22fc1b6fd7a7d94acc90fbf82c8c37266f97)), closes [#5905](https://github.com/SAP/ui5-webcomponents/issues/5905)
* **ui5-shellbar:** outline buttons color on focus fixed for quartz ([#5868](https://github.com/SAP/ui5-webcomponents/issues/5868)) ([f61df7e](https://github.com/SAP/ui5-webcomponents/commit/f61df7ec8d9e0530f69b1735388ab277b667fa94))


### Features

* **framework:** fetch illustrations on demand ([#5927](https://github.com/SAP/ui5-webcomponents/issues/5927)) ([f8e1033](https://github.com/SAP/ui5-webcomponents/commit/f8e1033643626261dcad8a38f65c325ba9aff99f))
* **framework:** generate custom elements manifest ([#5964](https://github.com/SAP/ui5-webcomponents/issues/5964)) ([0d62770](https://github.com/SAP/ui5-webcomponents/commit/0d62770cace54fd9aef73d9632dd06d8a83680e9))
* **ui5-barcodescanner:** downgraded to lower helper version ([#5925](https://github.com/SAP/ui5-webcomponents/issues/5925)) ([bf2fc4b](https://github.com/SAP/ui5-webcomponents/commit/bf2fc4b43bea86d330eb66fbe60dc226e9e9f550))





# [1.8.0](https://github.com/SAP/ui5-webcomponents/compare/v1.7.1...v1.8.0) (2022-10-03)


### Bug Fixes

* **ui5-illustrated-message:** removed redundant scrollbar in RTL ([#5819](https://github.com/SAP/ui5-webcomponents/issues/5819)) ([676adcd](https://github.com/SAP/ui5-webcomponents/commit/676adcd1e706e528440c9a75edb5713ef538460d)), closes [#5788](https://github.com/SAP/ui5-webcomponents/issues/5788)
* **ui5-side-navigation:** toggle icon no longer shrinks with long text ([#5837](https://github.com/SAP/ui5-webcomponents/issues/5837)) ([8a69be2](https://github.com/SAP/ui5-webcomponents/commit/8a69be21c683ed98a522e2391eeb61901acb0e7d)), closes [#5825](https://github.com/SAP/ui5-webcomponents/issues/5825)


### Features

* **f6navigation:** improve fastgroup navigation ([#5844](https://github.com/SAP/ui5-webcomponents/issues/5844)) ([f44f57b](https://github.com/SAP/ui5-webcomponents/commit/f44f57b27850de03e430d08e3e9adc71d60296fe))
* **ui5-illustrated-message:** accessible-name-ref added ([#5765](https://github.com/SAP/ui5-webcomponents/issues/5765)) ([51165df](https://github.com/SAP/ui5-webcomponents/commit/51165df780d92404c63e16a09dbfe579c533456c))





## [1.7.1](https://github.com/SAP/ui5-webcomponents/compare/v1.7.0...v1.7.1) (2022-09-08)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.7.0](https://github.com/SAP/ui5-webcomponents/compare/v1.6.0...v1.7.0) (2022-09-02)


### Bug Fixes

* **ui5-bar:** adjust resizing behavior ([#5678](https://github.com/SAP/ui5-webcomponents/issues/5678)) ([b6efba2](https://github.com/SAP/ui5-webcomponents/commit/b6efba285ef03c4a873dca92b328cb5c3d1ddf78))
* **ui5-li-notification:** align actions' texts to the left ([#5706](https://github.com/SAP/ui5-webcomponents/issues/5706)) ([f746016](https://github.com/SAP/ui5-webcomponents/commit/f746016d6311080fc189079943c273e7e6e21946)), closes [#5704](https://github.com/SAP/ui5-webcomponents/issues/5704)
* **ui5-link:** multiple click events ([#5642](https://github.com/SAP/ui5-webcomponents/issues/5642)) ([74fd5b9](https://github.com/SAP/ui5-webcomponents/commit/74fd5b91fd83bf28c0f4347df92b3721eb11577d))
* **ui5-view-settings-dialog:** focus correct page on open ([#5746](https://github.com/SAP/ui5-webcomponents/issues/5746)) ([d7a8e10](https://github.com/SAP/ui5-webcomponents/commit/d7a8e10e069a8d6df8aff4acf2d2de2eaa7d081d)), closes [#5451](https://github.com/SAP/ui5-webcomponents/issues/5451)
* **ui5-view-settings-dialog:** update setConfirmedSettings param string type from String to Object and description sample code ([#5534](https://github.com/SAP/ui5-webcomponents/issues/5534)) ([da16e2c](https://github.com/SAP/ui5-webcomponents/commit/da16e2c6ea44cd4c500931b1ae2db17434391125))


### Features

* **ui5-illustrated-message:** introduce title slot ([#5611](https://github.com/SAP/ui5-webcomponents/issues/5611)) ([16ec3a8](https://github.com/SAP/ui5-webcomponents/commit/16ec3a8b1a84fd9b32cc635050f5ff2aefc4c5c2)), closes [#5503](https://github.com/SAP/ui5-webcomponents/issues/5503)





# [1.6.0](https://github.com/SAP/ui5-webcomponents/compare/v1.5.0...v1.6.0) (2022-07-25)


### Features

* **ui5-bar:** implement resize handlers for each slot ([#5482](https://github.com/SAP/ui5-webcomponents/issues/5482)) ([a8a4acd](https://github.com/SAP/ui5-webcomponents/commit/a8a4acd))
* **ui5-shellbar:** new property accessibilityRoles ([#5551](https://github.com/SAP/ui5-webcomponents/issues/5551)) ([eef5c50](https://github.com/SAP/ui5-webcomponents/commit/eef5c50)), closes [#4775](https://github.com/SAP/ui5-webcomponents/issues/4775)





# [1.5.0](https://github.com/SAP/ui5-webcomponents/compare/v1.4.0...v1.5.0) (2022-07-03)


### Bug Fixes

* **f6navigation:** prevent default behavior on windows OS ([#5424](https://github.com/SAP/ui5-webcomponents/issues/5424)) ([a494f85](https://github.com/SAP/ui5-webcomponents/commit/a494f85))
* **ui5-shellbar:** correct accessibility DOM ([#5395](https://github.com/SAP/ui5-webcomponents/issues/5395)) ([aba5fb5](https://github.com/SAP/ui5-webcomponents/commit/aba5fb5))
* **ui5-timeline-item:** align text in title link ([51954b7](https://github.com/SAP/ui5-webcomponents/commit/51954b7)), closes [#5163](https://github.com/SAP/ui5-webcomponents/issues/5163)


### Features

* **ui5-illustrated-message:** implement size property ([#5405](https://github.com/SAP/ui5-webcomponents/issues/5405)) ([c58690d](https://github.com/SAP/ui5-webcomponents/commit/c58690d))
* **ui5-view-settings-dialog:** Implement behaviour for external setting of confirmed settings ([#5222](https://github.com/SAP/ui5-webcomponents/issues/5222)) ([7fbb235](https://github.com/SAP/ui5-webcomponents/commit/7fbb235))





# [1.4.0](https://github.com/SAP/ui5-webcomponents/compare/v1.3.1...v1.4.0) (2022-05-25)


### Bug Fixes

* **ui5-illustrated-message:** make component language aware ([#5158](https://github.com/SAP/ui5-webcomponents/issues/5158)) ([5b6502b](https://github.com/SAP/ui5-webcomponents/commit/5b6502b))
* **ui5-page:** remove unnecessary scrollbar ([#5258](https://github.com/SAP/ui5-webcomponents/issues/5258)) ([8ef6289](https://github.com/SAP/ui5-webcomponents/commit/8ef6289))


### Features

* **ui5-notifications:** implement SAP Horizon theme ([#5067](https://github.com/SAP/ui5-webcomponents/issues/5067)) ([ccdfe4c](https://github.com/SAP/ui5-webcomponents/commit/ccdfe4c))
* **ui5-shellbar:** implement Horizon theme ([#5197](https://github.com/SAP/ui5-webcomponents/issues/5197)) ([d278c09](https://github.com/SAP/ui5-webcomponents/commit/d278c09)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-side-navigation:** implement SAP Horizon theme family ([#5081](https://github.com/SAP/ui5-webcomponents/issues/5081)) ([d8d9315](https://github.com/SAP/ui5-webcomponents/commit/d8d9315)), closes [#5006](https://github.com/SAP/ui5-webcomponents/issues/5006)
* **ui5-timeline:** implement Horizon theme ([#5155](https://github.com/SAP/ui5-webcomponents/issues/5155)) ([e557f71](https://github.com/SAP/ui5-webcomponents/commit/e557f71))
* **ui5-upload-collection:** implement SAP Horizon theme family ([#5148](https://github.com/SAP/ui5-webcomponents/issues/5148)) ([7956864](https://github.com/SAP/ui5-webcomponents/commit/7956864))





## [1.3.1](https://github.com/SAP/ui5-webcomponents/compare/v1.3.0...v1.3.1) (2022-04-27)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.3.0](https://github.com/SAP/ui5-webcomponents/compare/v1.2.4...v1.3.0) (2022-04-19)


### Bug Fixes

* **ui5-flexible-column-layout:** correct column border styles for RTL ([#4919](https://github.com/SAP/ui5-webcomponents/issues/4919)) ([660f639](https://github.com/SAP/ui5-webcomponents/commit/660f639)), closes [#4906](https://github.com/SAP/ui5-webcomponents/issues/4906)
* **ui5-illustrated-message:** remove offensive characters ([#4929](https://github.com/SAP/ui5-webcomponents/issues/4929)) ([cbf5b02](https://github.com/SAP/ui5-webcomponents/commit/cbf5b02))
* **ui5-illustrated-message:** updated illustrations ([#4950](https://github.com/SAP/ui5-webcomponents/issues/4950)) ([6ff4e1b](https://github.com/SAP/ui5-webcomponents/commit/6ff4e1b))
* **ui5-media-gallery:** correct overflow label ([#4903](https://github.com/SAP/ui5-webcomponents/issues/4903)) ([4f28a6e](https://github.com/SAP/ui5-webcomponents/commit/4f28a6e))
* **ui5-page:** Allow developers to be able to overwrite responsive paddings ([#5056](https://github.com/SAP/ui5-webcomponents/issues/5056)) ([b09dd35](https://github.com/SAP/ui5-webcomponents/commit/b09dd35))
* **ui5-shellbar:** searchfield placeholder color ([#5079](https://github.com/SAP/ui5-webcomponents/issues/5079)) ([aba6aab](https://github.com/SAP/ui5-webcomponents/commit/aba6aab))
* **ui5-shellbar, ui5-breadcrumbs, ui5-barcode-scanner-dialog:** align popover paddings ([#4894](https://github.com/SAP/ui5-webcomponents/issues/4894)) ([b947d1b](https://github.com/SAP/ui5-webcomponents/commit/b947d1b)), closes [#4872](https://github.com/SAP/ui5-webcomponents/issues/4872)
* **ui5-view-settings-dialog:** adjust scrollbar behavior  ([#4795](https://github.com/SAP/ui5-webcomponents/issues/4795)) ([8f58fd5](https://github.com/SAP/ui5-webcomponents/commit/8f58fd5)), closes [#4724](https://github.com/SAP/ui5-webcomponents/issues/4724) [#4725](https://github.com/SAP/ui5-webcomponents/issues/4725) [#4860](https://github.com/SAP/ui5-webcomponents/issues/4860)
* **ui5-view-settings-dialog:** fixing comments from previous commit ([#4851](https://github.com/SAP/ui5-webcomponents/issues/4851)) ([3fc5814](https://github.com/SAP/ui5-webcomponents/commit/3fc5814))
* **ui5-view-settings-dialog:** including title in initial reading ([#4827](https://github.com/SAP/ui5-webcomponents/issues/4827)) ([685d4ba](https://github.com/SAP/ui5-webcomponents/commit/685d4ba)), closes [#4660](https://github.com/SAP/ui5-webcomponents/issues/4660)
* **ui5-view-settings-dialog:** replacement of the slot with ui5 li element ([#5013](https://github.com/SAP/ui5-webcomponents/issues/5013)) ([839ddf8](https://github.com/SAP/ui5-webcomponents/commit/839ddf8)), closes [#4888](https://github.com/SAP/ui5-webcomponents/issues/4888)
* **ui5-view-settings-dialog:** visual alignment ([#4867](https://github.com/SAP/ui5-webcomponents/issues/4867)) ([8a628df](https://github.com/SAP/ui5-webcomponents/commit/8a628df)), closes [#4102](https://github.com/SAP/ui5-webcomponents/issues/4102) [#3744](https://github.com/SAP/ui5-webcomponents/issues/3744) [#4838](https://github.com/SAP/ui5-webcomponents/issues/4838)
* correct responsive padding in some consumers of popups ([#4926](https://github.com/SAP/ui5-webcomponents/issues/4926)) ([b501153](https://github.com/SAP/ui5-webcomponents/commit/b501153)), closes [#4870](https://github.com/SAP/ui5-webcomponents/issues/4870)


### Features

* **ui5-fcl:** implement Horizon theme ([#5071](https://github.com/SAP/ui5-webcomponents/issues/5071)) ([7a2a568](https://github.com/SAP/ui5-webcomponents/commit/7a2a568)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-wizard:** implement SAP Horizon theme ([#5076](https://github.com/SAP/ui5-webcomponents/issues/5076)) ([801069d](https://github.com/SAP/ui5-webcomponents/commit/801069d))





## [1.2.4](https://github.com/SAP/ui5-webcomponents/compare/v1.2.3...v1.2.4) (2022-03-30)


### Bug Fixes

* **ui5-illustrated-message:** remove offensive characters ([#4929](https://github.com/SAP/ui5-webcomponents/issues/4929)) ([a33c7a5](https://github.com/SAP/ui5-webcomponents/commit/a33c7a5))





## [1.2.3](https://github.com/SAP/ui5-webcomponents/compare/v1.2.2...v1.2.3) (2022-03-23)

**Note:** Version bump only for package @ui5/webcomponents-fiori





## [1.2.2](https://github.com/SAP/ui5-webcomponents/compare/v1.2.1...v1.2.2) (2022-03-22)


### Bug Fixes

* **ui5-flexible-column-layout:** correct column border styles for RTL ([#4919](https://github.com/SAP/ui5-webcomponents/issues/4919)) ([2f40bd7](https://github.com/SAP/ui5-webcomponents/commit/2f40bd7)), closes [#4906](https://github.com/SAP/ui5-webcomponents/issues/4906)
* **ui5-view-settings-dialog:** adjust scrollbar behavior  ([#4795](https://github.com/SAP/ui5-webcomponents/issues/4795)) ([ddcb01e](https://github.com/SAP/ui5-webcomponents/commit/ddcb01e)), closes [#4724](https://github.com/SAP/ui5-webcomponents/issues/4724) [#4725](https://github.com/SAP/ui5-webcomponents/issues/4725) [#4860](https://github.com/SAP/ui5-webcomponents/issues/4860)





## [1.2.1](https://github.com/SAP/ui5-webcomponents/compare/v1.2.0...v1.2.1) (2022-03-02)


### Bug Fixes

* **ui5-view-settings-dialog:** fix circular dependency JS error ([#4844](https://github.com/SAP/ui5-webcomponents/issues/4844)) ([057a7d8](https://github.com/SAP/ui5-webcomponents/commit/057a7d8)), closes [#4837](https://github.com/SAP/ui5-webcomponents/issues/4837)





# [1.2.0](https://github.com/SAP/ui5-webcomponents/compare/v1.1.2...v1.2.0) (2022-02-28)


### Bug Fixes

* correct scoping issues with several components ([#4820](https://github.com/SAP/ui5-webcomponents/issues/4820)) ([621dc20](https://github.com/SAP/ui5-webcomponents/commit/621dc20))
* **ui5-flexible-column-layout:** fix accessibility of hidden columns ([#4811](https://github.com/SAP/ui5-webcomponents/issues/4811)) ([d9f514f](https://github.com/SAP/ui5-webcomponents/commit/d9f514f)), closes [#4789](https://github.com/SAP/ui5-webcomponents/issues/4789)
* **ui5-media-gallery-item:** correct jsdoc ([#4819](https://github.com/SAP/ui5-webcomponents/issues/4819)) ([5783fa7](https://github.com/SAP/ui5-webcomponents/commit/5783fa7))
* **ui5-view-settings-dialog:** improve `title` text accessibility  ([#4783](https://github.com/SAP/ui5-webcomponents/issues/4783)) ([88a13df](https://github.com/SAP/ui5-webcomponents/commit/88a13df)), closes [#4660](https://github.com/SAP/ui5-webcomponents/issues/4660)
* **ui5-wizard:** prevent unnecessary content scrolling ([#4774](https://github.com/SAP/ui5-webcomponents/issues/4774)) ([751db3f](https://github.com/SAP/ui5-webcomponents/commit/751db3f))
* scoped bundles ([#4745](https://github.com/SAP/ui5-webcomponents/issues/4745)) ([2cd4c7e](https://github.com/SAP/ui5-webcomponents/commit/2cd4c7e))


### Features

* **ui5-breadcrumbs:** allow preventDefault in item-click event listener ([#4589](https://github.com/SAP/ui5-webcomponents/issues/4589)) ([ccb4c83](https://github.com/SAP/ui5-webcomponents/commit/ccb4c83))
* **ui5-button:** add new `tooltip` property ([#4737](https://github.com/SAP/ui5-webcomponents/issues/4737)) ([df8f013](https://github.com/SAP/ui5-webcomponents/commit/df8f013)), closes [#4689](https://github.com/SAP/ui5-webcomponents/issues/4689)
* **ui5-button:** implement accessibilityAttributes property ([#4655](https://github.com/SAP/ui5-webcomponents/issues/4655)) ([d27c4b5](https://github.com/SAP/ui5-webcomponents/commit/d27c4b5)), closes [#3546](https://github.com/SAP/ui5-webcomponents/issues/3546)
* **ui5-illustrated-message:** add TNT illustrations ([#4710](https://github.com/SAP/ui5-webcomponents/issues/4710)) ([822a73c](https://github.com/SAP/ui5-webcomponents/commit/822a73c))
* **ui5-popup:** аdd default responsive paddings ([#4567](https://github.com/SAP/ui5-webcomponents/issues/4567)) ([ddc1e39](https://github.com/SAP/ui5-webcomponents/commit/ddc1e39)), closes [#4402](https://github.com/SAP/ui5-webcomponents/issues/4402)
* **ui5-side-navigation:** make selection-change event preventable ([#4732](https://github.com/SAP/ui5-webcomponents/issues/4732)) ([d908465](https://github.com/SAP/ui5-webcomponents/commit/d908465)), closes [#4700](https://github.com/SAP/ui5-webcomponents/issues/4700)
* **ui5-timeline:** add `accessible-name` support ([#4721](https://github.com/SAP/ui5-webcomponents/issues/4721)) ([0562e89](https://github.com/SAP/ui5-webcomponents/commit/0562e89)), closes [#4644](https://github.com/SAP/ui5-webcomponents/issues/4644)
* **ui5-view-settings-dialog:** add more event.details to confirm/cancel events ([#4772](https://github.com/SAP/ui5-webcomponents/issues/4772)) ([a3eca7a](https://github.com/SAP/ui5-webcomponents/commit/a3eca7a)), closes [#4539](https://github.com/SAP/ui5-webcomponents/issues/4539)





## [1.1.2](https://github.com/SAP/ui5-webcomponents/compare/v1.1.1...v1.1.2) (2022-01-26)


### Bug Fixes

* **ui5-illustrated-message:** remove uncompleted illustration ([#4638](https://github.com/SAP/ui5-webcomponents/issues/4638)) ([adafeba](https://github.com/SAP/ui5-webcomponents/commit/adafeba))





## [1.1.1](https://github.com/SAP/ui5-webcomponents/compare/v1.1.0...v1.1.1) (2022-01-24)


### Bug Fixes

* **ui5-media-gallery-item:** add missing icon import ([#4615](https://github.com/SAP/ui5-webcomponents/issues/4615)) ([d04cf8c](https://github.com/SAP/ui5-webcomponents/commit/d04cf8c))
* **ui5-media-gallery-item:** correct initialization order ([#4614](https://github.com/SAP/ui5-webcomponents/issues/4614)) ([436f8f4](https://github.com/SAP/ui5-webcomponents/commit/436f8f4)), closes [#4610](https://github.com/SAP/ui5-webcomponents/issues/4610)





# [1.1.0](https://github.com/SAP/ui5-webcomponents/compare/v1.0.2...v1.1.0) (2022-01-21)


### Bug Fixes

* **ui5-bar:** fix rtl support ([#4496](https://github.com/SAP/ui5-webcomponents/issues/4496)) ([e5c0f2d](https://github.com/SAP/ui5-webcomponents/commit/e5c0f2d))
* **ui5-bar:** remove unnecessary slot names ([#4510](https://github.com/SAP/ui5-webcomponents/issues/4510)) ([32d4507](https://github.com/SAP/ui5-webcomponents/commit/32d4507))
* **ui5-li-notification-group:** fixed close button functionality in shell bar sample ([#4408](https://github.com/SAP/ui5-webcomponents/issues/4408)) ([6a66797](https://github.com/SAP/ui5-webcomponents/commit/6a66797)), closes [#4202](https://github.com/SAP/ui5-webcomponents/issues/4202)
* **ui5-li-notification-group:** visual fixes for right-to-left mode ([#4354](https://github.com/SAP/ui5-webcomponents/issues/4354)) ([13b7d68](https://github.com/SAP/ui5-webcomponents/commit/13b7d68)), closes [#4255](https://github.com/SAP/ui5-webcomponents/issues/4255) [#4256](https://github.com/SAP/ui5-webcomponents/issues/4256) [#4257](https://github.com/SAP/ui5-webcomponents/issues/4257)
* **ui5-shellbar:** allow selection with Enter key in overflow menu ([#4577](https://github.com/SAP/ui5-webcomponents/issues/4577)) ([fb40514](https://github.com/SAP/ui5-webcomponents/commit/fb40514)), closes [#4556](https://github.com/SAP/ui5-webcomponents/issues/4556)
* **ui5-side-navigation:** correct styles for static area ([#4526](https://github.com/SAP/ui5-webcomponents/issues/4526)) ([7d35bd6](https://github.com/SAP/ui5-webcomponents/commit/7d35bd6)), closes [#4515](https://github.com/SAP/ui5-webcomponents/issues/4515)
* **ui5-view-settings-dialog:** implement single page functionality ([#4419](https://github.com/SAP/ui5-webcomponents/issues/4419)) ([572a323](https://github.com/SAP/ui5-webcomponents/commit/572a323))
* Scoping issues corrected ([#4573](https://github.com/SAP/ui5-webcomponents/issues/4573)) ([4e430d3](https://github.com/SAP/ui5-webcomponents/commit/4e430d3))
* **ui5-upload-collection:** make buttons visible on small screens ([#4361](https://github.com/SAP/ui5-webcomponents/issues/4361)) ([fcb7f62](https://github.com/SAP/ui5-webcomponents/commit/fcb7f62))
* **ui5-upload-collection:** removed active and hover states ([#4360](https://github.com/SAP/ui5-webcomponents/issues/4360)) ([cb76902](https://github.com/SAP/ui5-webcomponents/commit/cb76902)), closes [#4258](https://github.com/SAP/ui5-webcomponents/issues/4258)
* **ui5-wizard:** adjust content and navigator paddings based on spec ([#4479](https://github.com/SAP/ui5-webcomponents/issues/4479)) ([303ecb1](https://github.com/SAP/ui5-webcomponents/commit/303ecb1))
* **ui5-wizard:** make playground sample fully usable ([#4457](https://github.com/SAP/ui5-webcomponents/issues/4457)) ([1416d42](https://github.com/SAP/ui5-webcomponents/commit/1416d42))
* adding stable selectors for tab container and shellbar ([#4369](https://github.com/SAP/ui5-webcomponents/issues/4369)) ([9abdaba](https://github.com/SAP/ui5-webcomponents/commit/9abdaba))


### Features

* **ui5-illustrated-message:** add more illustrations to the default set ([#4587](https://github.com/SAP/ui5-webcomponents/issues/4587)) ([417bd6a](https://github.com/SAP/ui5-webcomponents/commit/417bd6a))
* stable-dom-ref supported for abstract items ([#4604](https://github.com/SAP/ui5-webcomponents/issues/4604)) ([5526dea](https://github.com/SAP/ui5-webcomponents/commit/5526dea))
* **ui5-dynamic-side-content:** initial implementation ([#4379](https://github.com/SAP/ui5-webcomponents/issues/4379)) ([c36cb57](https://github.com/SAP/ui5-webcomponents/commit/c36cb57))
* **ui5-shellbar:** improved accessibilityTexts property ([#4551](https://github.com/SAP/ui5-webcomponents/issues/4551)) ([c811a41](https://github.com/SAP/ui5-webcomponents/commit/c811a41))
* implement F6 Navigation Helper ([#4490](https://github.com/SAP/ui5-webcomponents/issues/4490)) ([60d0dc1](https://github.com/SAP/ui5-webcomponents/commit/60d0dc1))
* **ui5-flexible-column-layout:** new property accessibilityRoles ([#4446](https://github.com/SAP/ui5-webcomponents/issues/4446)) ([f515f3d](https://github.com/SAP/ui5-webcomponents/commit/f515f3d)), closes [#3804](https://github.com/SAP/ui5-webcomponents/issues/3804) [#3796](https://github.com/SAP/ui5-webcomponents/issues/3796)
* **ui5-media-gallery:** Initial implementation ([#4427](https://github.com/SAP/ui5-webcomponents/issues/4427)) ([17cb225](https://github.com/SAP/ui5-webcomponents/commit/17cb225))
* **ui5-shellbar:** introduce accessibilityTexts property ([#4377](https://github.com/SAP/ui5-webcomponents/issues/4377)) ([f762e76](https://github.com/SAP/ui5-webcomponents/commit/f762e76)), closes [#4009](https://github.com/SAP/ui5-webcomponents/issues/4009)
* **ui5-tabcontainer:** implement overflow functionality ([#4403](https://github.com/SAP/ui5-webcomponents/issues/4403)) ([a38bbab](https://github.com/SAP/ui5-webcomponents/commit/a38bbab)), closes [#2540](https://github.com/SAP/ui5-webcomponents/issues/2540)
* **ui5-wizard:** Extend keyboard handling ([#4444](https://github.com/SAP/ui5-webcomponents/issues/4444)) ([57151a3](https://github.com/SAP/ui5-webcomponents/commit/57151a3))





## [1.0.2](https://github.com/SAP/ui5-webcomponents/compare/v1.0.1...v1.0.2) (2021-11-29)

**Note:** Version bump only for package @ui5/webcomponents-fiori





## [1.0.1](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0...v1.0.1) (2021-11-10)

**Note:** Version bump only for package @ui5/webcomponents-fiori





# [1.0.0](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.16...v1.0.0) (2021-11-10)


**Note:** Version bump only for package @ui5/webcomponents-fiori




# [1.0.0-rc.16](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.15...v1.0.0-rc.16) (2021-11-09)


### Bug Fixes

* **ui5-bar:** align `middleContent` slot centrally ([#3719](https://github.com/SAP/ui5-webcomponents/issues/3719)) ([d5a0a3a](https://github.com/SAP/ui5-webcomponents/commit/d5a0a3a)), closes [#3456](https://github.com/SAP/ui5-webcomponents/issues/3456) [#3456](https://github.com/SAP/ui5-webcomponents/issues/3456)
* **ui5-flexible-column-layout:** documentation improvement ([#3908](https://github.com/SAP/ui5-webcomponents/issues/3908)) ([dee93fa](https://github.com/SAP/ui5-webcomponents/commit/dee93fa))
* **ui5-flexible-column-layout:** speech output on layout arrows ([#4034](https://github.com/SAP/ui5-webcomponents/issues/4034)) ([272e600](https://github.com/SAP/ui5-webcomponents/commit/272e600)), closes [#3699](https://github.com/SAP/ui5-webcomponents/issues/3699)
* **ui5-illustrated-message:** add missing dependencies ([#3822](https://github.com/SAP/ui5-webcomponents/issues/3822)) ([75e6a8c](https://github.com/SAP/ui5-webcomponents/commit/75e6a8c))
* **ui5-illustrated-message:** generation script ([#3903](https://github.com/SAP/ui5-webcomponents/issues/3903)) ([ecf9563](https://github.com/SAP/ui5-webcomponents/commit/ecf9563))
* **ui5-illustrated-message:** remove style attribute of svg ([#3605](https://github.com/SAP/ui5-webcomponents/issues/3605)) ([41f72e3](https://github.com/SAP/ui5-webcomponents/commit/41f72e3))
* **ui5-li-notification:** fix icon padding in rtl ([#3876](https://github.com/SAP/ui5-webcomponents/issues/3876)) ([6ebfecb](https://github.com/SAP/ui5-webcomponents/commit/6ebfecb))
* **ui5-list, ui5-table, ui5-notification, ui5-busy-indicator:** getFocusDomRef returns the correct element when the state is busy ([#3951](https://github.com/SAP/ui5-webcomponents/issues/3951)) ([ec81c15](https://github.com/SAP/ui5-webcomponents/commit/ec81c15)), closes [#3922](https://github.com/SAP/ui5-webcomponents/issues/3922)
* **ui5-product-switch:** adapt focus styles to sap_horizon ([#4276](https://github.com/SAP/ui5-webcomponents/issues/4276)) ([b053ad0](https://github.com/SAP/ui5-webcomponents/commit/b053ad0))
* **ui5-product-switch-item:** no-wrap title behavior added when subtitle is not present ([#3800](https://github.com/SAP/ui5-webcomponents/issues/3800)) ([3f007fd](https://github.com/SAP/ui5-webcomponents/commit/3f007fd))
* **ui5-shellbar:** fix public readonly getters ([#4283](https://github.com/SAP/ui5-webcomponents/issues/4283)) ([d90daf5](https://github.com/SAP/ui5-webcomponents/commit/d90daf5))
* **ui5-shellbar:** fixed growing of left container ([#4105](https://github.com/SAP/ui5-webcomponents/issues/4105)) ([5b167f4](https://github.com/SAP/ui5-webcomponents/commit/5b167f4))
* **ui5-shellbar:** press on custom action throws JS error ([#4281](https://github.com/SAP/ui5-webcomponents/issues/4281)) ([c73294b](https://github.com/SAP/ui5-webcomponents/commit/c73294b))
* **ui5-shellbar:** remove empty secondary title wrapper ([#3737](https://github.com/SAP/ui5-webcomponents/issues/3737)) ([28d9a1a](https://github.com/SAP/ui5-webcomponents/commit/28d9a1a)), closes [#3698](https://github.com/SAP/ui5-webcomponents/issues/3698) [#3698](https://github.com/SAP/ui5-webcomponents/issues/3698)
* **ui5-shellbar:** remove unnecessary aria-label from buttons ([#3981](https://github.com/SAP/ui5-webcomponents/issues/3981)) ([d60120d](https://github.com/SAP/ui5-webcomponents/commit/d60120d)), closes [#3953](https://github.com/SAP/ui5-webcomponents/issues/3953)
* **ui5-shellbar-item:** fix JS error on click ([#4287](https://github.com/SAP/ui5-webcomponents/issues/4287)) ([3289da4](https://github.com/SAP/ui5-webcomponents/commit/3289da4))
* **ui5-timeline:** align indicator in compact mode ([#3902](https://github.com/SAP/ui5-webcomponents/issues/3902)) ([0c31502](https://github.com/SAP/ui5-webcomponents/commit/0c31502))
* **ui5-timeline:** elements with role option have a parent element with role listbox ([#4053](https://github.com/SAP/ui5-webcomponents/issues/4053)) ([2b27754](https://github.com/SAP/ui5-webcomponents/commit/2b27754)), closes [#3459](https://github.com/SAP/ui5-webcomponents/issues/3459)
* **ui5-timeline:** keyboard handling is now compliant with the specification ([#3722](https://github.com/SAP/ui5-webcomponents/issues/3722)) ([2ad208e](https://github.com/SAP/ui5-webcomponents/commit/2ad208e))
* **ui5-tree, ui5-table, ui5-side-navigation:** unnecessary scrollbar in RTL is removed ([#3948](https://github.com/SAP/ui5-webcomponents/issues/3948)) ([61fe0fe](https://github.com/SAP/ui5-webcomponents/commit/61fe0fe))
* **ui5-upload-collection:** exploratory testing issues ([#3797](https://github.com/SAP/ui5-webcomponents/issues/3797)) ([7028b6c](https://github.com/SAP/ui5-webcomponents/commit/7028b6c)), closes [#3625](https://github.com/SAP/ui5-webcomponents/issues/3625)
* **ui5-upload-collection:** fix "no files" heading HTML tag ([#3930](https://github.com/SAP/ui5-webcomponents/issues/3930)) ([e020249](https://github.com/SAP/ui5-webcomponents/commit/e020249))
* **ui5-wizard:** check if tab has a focusable element ([#3904](https://github.com/SAP/ui5-webcomponents/issues/3904)) ([a64eaf8](https://github.com/SAP/ui5-webcomponents/commit/a64eaf8))
* **ui5-wizard:** grouped steps could be activated ([#3961](https://github.com/SAP/ui5-webcomponents/issues/3961)) ([be36219](https://github.com/SAP/ui5-webcomponents/commit/be36219))
* **ui5-wizard:** remove unneeded aria properties ([#4262](https://github.com/SAP/ui5-webcomponents/issues/4262)) ([7fa969b](https://github.com/SAP/ui5-webcomponents/commit/7fa969b))
* **ui5-wizard:** step titles are now visible on phone ([#3895](https://github.com/SAP/ui5-webcomponents/issues/3895)) ([9a183b4](https://github.com/SAP/ui5-webcomponents/commit/9a183b4))
* **ui5-view-settings-dialog:** import all dependencies ([#4074](https://github.com/SAP/ui5-webcomponents/issues/4074)) ([11d529e](https://github.com/SAP/ui5-webcomponents/commit/11d529e))


### Code Refactoring

* **ui5-message-strip:** rename tag name ([#4268](https://github.com/SAP/ui5-webcomponents/issues/4268)) ([ec30ec2](https://github.com/SAP/ui5-webcomponents/commit/ec30ec2))
* **ui5-shellbar-item:** rename "item-click" to "click" ([#4282](https://github.com/SAP/ui5-webcomponents/issues/4282)) ([4cd86b1](https://github.com/SAP/ui5-webcomponents/commit/4cd86b1))


### Features

* **ui5-illustrated-message:** add TNT illustration set ([#3857](https://github.com/SAP/ui5-webcomponents/issues/3857)) ([0ade371](https://github.com/SAP/ui5-webcomponents/commit/0ade371))
* **ui5-illustrated-message:** introduce subtitle slot ([#3633](https://github.com/SAP/ui5-webcomponents/issues/3633)) ([96ccf93](https://github.com/SAP/ui5-webcomponents/commit/96ccf93)), closes [#3557](https://github.com/SAP/ui5-webcomponents/issues/3557) [#3557](https://github.com/SAP/ui5-webcomponents/issues/3557)
* **ui5-li-notification:** adjust focus styles to sap_horizon ([#4228](https://github.com/SAP/ui5-webcomponents/issues/4228)) ([1f681d0](https://github.com/SAP/ui5-webcomponents/commit/1f681d0))
* **ui5-shellbar:** implement sap_horizon ([#4251](https://github.com/SAP/ui5-webcomponents/issues/4251)) ([7500a08](https://github.com/SAP/ui5-webcomponents/commit/7500a08))
* **ui5-side-navigation:** adjust focus styles in overflow to sap_horizon ([#4240](https://github.com/SAP/ui5-webcomponents/issues/4240)) ([99e962c](https://github.com/SAP/ui5-webcomponents/commit/99e962c))
* introduce sap_horizon theme initial draft ([#3991](https://github.com/SAP/ui5-webcomponents/issues/3991)) ([b1afaf0](https://github.com/SAP/ui5-webcomponents/commit/b1afaf0)), closes [#3988](https://github.com/SAP/ui5-webcomponents/issues/3988)
* rework stableDomRef concept ([#4210](https://github.com/SAP/ui5-webcomponents/issues/4210)) ([d1ebea3](https://github.com/SAP/ui5-webcomponents/commit/d1ebea3))
* **ui5-product-switch:** add selected state to an item ([#3872](https://github.com/SAP/ui5-webcomponents/issues/3872)) ([9e7928b](https://github.com/SAP/ui5-webcomponents/commit/9e7928b))
* **ui5-side-navigation:** Items now have tooltip ([#3921](https://github.com/SAP/ui5-webcomponents/issues/3921)) ([5849a38](https://github.com/SAP/ui5-webcomponents/commit/5849a38)), closes [#3549](https://github.com/SAP/ui5-webcomponents/issues/3549) [#3549](https://github.com/SAP/ui5-webcomponents/issues/3549)
* **ui5-timeline:** implement sap_horizon theme ([13a168e](https://github.com/SAP/ui5-webcomponents/commit/13a168e))
* **ui5-upload-collection:** Added "accessibleName" property ([#3917](https://github.com/SAP/ui5-webcomponents/issues/3917)) ([ea79fb3](https://github.com/SAP/ui5-webcomponents/commit/ea79fb3)), closes [#3768](https://github.com/SAP/ui5-webcomponents/issues/3768) [#3768](https://github.com/SAP/ui5-webcomponents/issues/3768)
* **ui5-view-settings-dialog:** introduce filter section ([#3616](https://github.com/SAP/ui5-webcomponents/issues/3616)) ([52987c2](https://github.com/SAP/ui5-webcomponents/commit/52987c2))
* **ui5-view-settings-dialog:** introduce new component ([#3502](https://github.com/SAP/ui5-webcomponents/issues/3502)) ([3bc11e3](https://github.com/SAP/ui5-webcomponents/commit/3bc11e3)), closes [#3304](https://github.com/SAP/ui5-webcomponents/issues/3304) [#3304](https://github.com/SAP/ui5-webcomponents/issues/3304)
* **ui5-wizard:** SAP Horizon theme implementation ([#4172](https://github.com/SAP/ui5-webcomponents/issues/4172)) ([67eea9b](https://github.com/SAP/ui5-webcomponents/commit/67eea9b))


### BREAKING CHANGES

* **ui5-shellbar-item:** ShellBarItem's event "item-click" has been renamed to "click".
* **ui5-message-strip:** MessageStrip component's tag name has been renamed from ui5-messagestrip to ui5-message-strip.
* **ui5-wizard:** accessible-name has been removed





# [1.0.0-rc.15](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.14...v1.0.0-rc.15) (2021-07-23)


### Bug Fixes

* **ui5-bar:** aria-label added depending on the "design" property ([#3161](https://github.com/SAP/ui5-webcomponents/issues/3161)) ([7ffb575](https://github.com/SAP/ui5-webcomponents/commit/7ffb575)), closes [#3020](https://github.com/SAP/ui5-webcomponents/issues/3020)
* **ui5-bar:** rename middleContent slot ([#3440](https://github.com/SAP/ui5-webcomponents/issues/3440)) ([e235d7d](https://github.com/SAP/ui5-webcomponents/commit/e235d7d)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-flexible-column-layout:** column borders in high contrast themes ([#3328](https://github.com/SAP/ui5-webcomponents/issues/3328)) ([bd18bb9](https://github.com/SAP/ui5-webcomponents/commit/bd18bb9)), closes [#3320](https://github.com/SAP/ui5-webcomponents/issues/3320)
* **ui5-flexible-column-layout:** correct columns display ([#3444](https://github.com/SAP/ui5-webcomponents/issues/3444)) ([62977d0](https://github.com/SAP/ui5-webcomponents/commit/62977d0)), closes [#3425](https://github.com/SAP/ui5-webcomponents/issues/3425)
* **ui5-flexible-column-layout:** rename noArrows property to hideArrows ([#3352](https://github.com/SAP/ui5-webcomponents/issues/3352)) ([8660d11](https://github.com/SAP/ui5-webcomponents/commit/8660d11)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-shellbar:** fix search field width ([#3296](https://github.com/SAP/ui5-webcomponents/issues/3296)) ([51fb1a3](https://github.com/SAP/ui5-webcomponents/commit/51fb1a3))
* **ui5-shellbar:** Fix unnecessary cutting space on left side ([#3513](https://github.com/SAP/ui5-webcomponents/issues/3513)) ([c7e6f07](https://github.com/SAP/ui5-webcomponents/commit/c7e6f07)), closes [#3501](https://github.com/SAP/ui5-webcomponents/issues/3501)
* **ui5-shellbar:** hide notification bubble if empty str ([#3123](https://github.com/SAP/ui5-webcomponents/issues/3123)) ([33fde82](https://github.com/SAP/ui5-webcomponents/commit/33fde82)), closes [#3121](https://github.com/SAP/ui5-webcomponents/issues/3121)
* **ui5-shellbar:** menu button arrow position ([#3285](https://github.com/SAP/ui5-webcomponents/issues/3285)) ([18ea76d](https://github.com/SAP/ui5-webcomponents/commit/18ea76d)), closes [#3199](https://github.com/SAP/ui5-webcomponents/issues/3199)
* **ui5-side-navigation:** items in popup fire click event ([#3468](https://github.com/SAP/ui5-webcomponents/issues/3468)) ([658328a](https://github.com/SAP/ui5-webcomponents/commit/658328a))
* **ui5-upload-collection:** change file deleted event name ([#3413](https://github.com/SAP/ui5-webcomponents/issues/3413)) ([5898eb8](https://github.com/SAP/ui5-webcomponents/commit/5898eb8)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-upload-collection:** rename noDnd property to hideDragOverlay ([#3335](https://github.com/SAP/ui5-webcomponents/issues/3335)) ([c360443](https://github.com/SAP/ui5-webcomponents/commit/c360443)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-upload-collection-item:** fixed keyboard navigation ([#3327](https://github.com/SAP/ui5-webcomponents/issues/3327)) ([aad0c32](https://github.com/SAP/ui5-webcomponents/commit/aad0c32))
* **ui5-wizard:** Circle's number horizontally aligned with the step's title ([#3370](https://github.com/SAP/ui5-webcomponents/issues/3370)) ([2cd97ec](https://github.com/SAP/ui5-webcomponents/commit/2cd97ec)), closes [#3251](https://github.com/SAP/ui5-webcomponents/issues/3251) [#3251](https://github.com/SAP/ui5-webcomponents/issues/3251)
* **ui5-wizard:** correct aria-controls value ([#3180](https://github.com/SAP/ui5-webcomponents/issues/3180)) ([d449812](https://github.com/SAP/ui5-webcomponents/commit/d449812))
* **ui5-wizard:** implement revised accessibility spec ([#2990](https://github.com/SAP/ui5-webcomponents/issues/2990)) ([99cb6b1](https://github.com/SAP/ui5-webcomponents/commit/99cb6b1))
* **ui5-wizard-step:** rename properties ([#3334](https://github.com/SAP/ui5-webcomponents/issues/3334)) ([b0e73ad](https://github.com/SAP/ui5-webcomponents/commit/b0e73ad)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* keep invisible texts out of the view port ([#3085](https://github.com/SAP/ui5-webcomponents/issues/3085)) ([de47520](https://github.com/SAP/ui5-webcomponents/commit/de47520)), closes [#2723](https://github.com/SAP/ui5-webcomponents/issues/2723) [#2723](https://github.com/SAP/ui5-webcomponents/issues/2723)


### Features

* **ui5-page:** implement responsive paddings ([#3412](https://github.com/SAP/ui5-webcomponents/issues/3412)) ([b720393](https://github.com/SAP/ui5-webcomponents/commit/b720393))
* **ui5-product-switch:** Implement accessibility specification ([#2865](https://github.com/SAP/ui5-webcomponents/issues/2865)) ([8c0225c](https://github.com/SAP/ui5-webcomponents/commit/8c0225c)), closes [#2707](https://github.com/SAP/ui5-webcomponents/issues/2707)
* **ui5-wizard:** set initial focus when a step is changed ([#3310](https://github.com/SAP/ui5-webcomponents/issues/3310)) ([70f5563](https://github.com/SAP/ui5-webcomponents/commit/70f5563))



# [1.0.0-rc.14](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.13...v1.0.0-rc.14) (2021-04-01)


### Bug Fixes



* **ui5-li-notification-group, ui5-li-notification:** fix i18n bundles usage ([#3063](https://github.com/SAP/ui5-webcomponents/issues/3063)) ([d6b6fa4](https://github.com/SAP/ui5-webcomponents/commit/d6b6fa4))
* **ui5-upload-collection-item:** make use of both main & fiori i18n bundles ([#3061](https://github.com/SAP/ui5-webcomponents/issues/3061)) ([2a01cb4](https://github.com/SAP/ui5-webcomponents/commit/2a01cb4))


### Features

* **ui5-static-area-item:** StaticAreaItem can now be scoped ([#3076](https://github.com/SAP/ui5-webcomponents/issues/3076)) ([9a7ffe4](https://github.com/SAP/ui5-webcomponents/commit/9a7ffe4))
* **ui5-wizard:** add parameter to selectionChange event ([#3034](https://github.com/SAP/ui5-webcomponents/issues/3034)) ([7ad94d2](https://github.com/SAP/ui5-webcomponents/commit/7ad94d2))



# [1.0.0-rc.13](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.12...v1.0.0-rc.13) (2021-03-26)


### Bug Fixes

* **ui5-page:** correct background-design styles ([#2862](https://github.com/SAP/ui5-webcomponents/issues/2862)) ([b10ee4c](https://github.com/SAP/ui5-webcomponents/commit/b10ee4c))
* **ui5-upload-collection:** add region and roledescription to root element ([#2915](https://github.com/SAP/ui5-webcomponents/issues/2915)) ([6db9f09](https://github.com/SAP/ui5-webcomponents/commit/6db9f09))
* **ui5-upload-collection:** add tooltip to edit button ([#2886](https://github.com/SAP/ui5-webcomponents/issues/2886)) ([35de38c](https://github.com/SAP/ui5-webcomponents/commit/35de38c))
* **ui5-upload-collection-item:** show disabled delete button ([#2893](https://github.com/SAP/ui5-webcomponents/issues/2893)) ([b609b47](https://github.com/SAP/ui5-webcomponents/commit/b609b47))
* **ui5-wizard:** use CSS vars for navigation bg-color ([#2892](https://github.com/SAP/ui5-webcomponents/issues/2892)) ([c967c6c](https://github.com/SAP/ui5-webcomponents/commit/c967c6c))





# [1.0.0-rc.12](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.11...v1.0.0-rc.12) (2021-02-18)


### Bug Fixes

* **ui5-li-notification:** it is now possible to not have a description ([#2744](https://github.com/SAP/ui5-webcomponents/issues/2744)) ([ef35f84](https://github.com/SAP/ui5-webcomponents/commit/ef35f84))
* **ui5-li-notification-group:** align priority icon ([#2584](https://github.com/SAP/ui5-webcomponents/issues/2584)) ([ff247f0](https://github.com/SAP/ui5-webcomponents/commit/ff247f0))
* **ui5-upload-collection:** wrap noDataText/Desc text ([#2674](https://github.com/SAP/ui5-webcomponents/issues/2674)) ([c48bfe7](https://github.com/SAP/ui5-webcomponents/commit/c48bfe7)), closes [#2672](https://github.com/SAP/ui5-webcomponents/issues/2672)
* **ui5-upload-collection-item:** fix title behaviour on small screens ([#2699](https://github.com/SAP/ui5-webcomponents/issues/2699)) ([bb7c952](https://github.com/SAP/ui5-webcomponents/commit/bb7c952))
* **ui5-wizard:** observe content height changes ([#2801](https://github.com/SAP/ui5-webcomponents/issues/2801)) ([b4cbc43](https://github.com/SAP/ui5-webcomponents/commit/b4cbc43))


### Features

* **ui5-li-notification*:** full-fill accessibility spec ([#2578](https://github.com/SAP/ui5-webcomponents/issues/2578)) ([20de5ae](https://github.com/SAP/ui5-webcomponents/commit/20de5ae))
* **ui5-page:** Initial implementation ([#2685](https://github.com/SAP/ui5-webcomponents/issues/2685)) ([bd09e17](https://github.com/SAP/ui5-webcomponents/commit/bd09e17)), closes [#2433](https://github.com/SAP/ui5-webcomponents/issues/2433)
* **ui5-wizard:** improve progress navigator responsiveness ([#2590](https://github.com/SAP/ui5-webcomponents/issues/2590)) ([01cd6f9](https://github.com/SAP/ui5-webcomponents/commit/01cd6f9))




# [1.0.0-rc.11](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.10...v1.0.0-rc.11) (2020-12-21)


### Bug Fixes

* **docs:** fix ui5-side-navigation sample ([#2564](https://github.com/SAP/ui5-webcomponents/issues/2564)) ([0338fdc](https://github.com/SAP/ui5-webcomponents/commit/0338fdc))
* **ui5-shellbar:** fix overlapping of the search box over icons ([#2155](https://github.com/SAP/ui5-webcomponents/issues/2155)) ([3597902](https://github.com/SAP/ui5-webcomponents/commit/3597902)), closes [#2044](https://github.com/SAP/ui5-webcomponents/issues/2044)
* **ui5-upload-collection:** fire drop only when files are dropped within dnd overlay ([#2527](https://github.com/SAP/ui5-webcomponents/issues/2527)) ([455f614](https://github.com/SAP/ui5-webcomponents/commit/455f614))
* **ui5-wizard:** correct phone breakpoint size ([#2596](https://github.com/SAP/ui5-webcomponents/issues/2596)) ([c98d9ba](https://github.com/SAP/ui5-webcomponents/commit/c98d9ba))
* **ui5-wizard:** fix styling issues ([#2547](https://github.com/SAP/ui5-webcomponents/issues/2547)) ([65cb42f](https://github.com/SAP/ui5-webcomponents/commit/65cb42f)), closes [#2523](https://github.com/SAP/ui5-webcomponents/issues/2523)


### Features

* **framework:** Change child-parent invalidation API ([#2541](https://github.com/SAP/ui5-webcomponents/issues/2541)) ([a1a3f80](https://github.com/SAP/ui5-webcomponents/commit/a1a3f80))
* **ui5-bar:** initial implementation ([#2533](https://github.com/SAP/ui5-webcomponents/issues/2533)) ([5c601cd](https://github.com/SAP/ui5-webcomponents/commit/5c601cd)), closes [#2434](https://github.com/SAP/ui5-webcomponents/issues/2434)
* **ui5-flexible-column-layout:** add start/mid/endColumnAccessibleName properties ([#2483](https://github.com/SAP/ui5-webcomponents/issues/2483)) ([fb0b24c](https://github.com/SAP/ui5-webcomponents/commit/fb0b24c))
* **ui5-side-navigation:** add "header" slot ([#2520](https://github.com/SAP/ui5-webcomponents/issues/2520)) ([b5c4a92](https://github.com/SAP/ui5-webcomponents/commit/b5c4a92)), closes [#2518](https://github.com/SAP/ui5-webcomponents/issues/2518)
* **ui5-side-navigation-item, ui5-side-navigation-sub-item:** introduce click event ([#2298](https://github.com/SAP/ui5-webcomponents/issues/2298)) ([d73ce38](https://github.com/SAP/ui5-webcomponents/commit/d73ce38))





# [1.0.0-rc.10](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.9...v1.0.0-rc.10) (2020-11-12)



### Features

* **ui5-wizard:** introduce new component ([#2400](https://github.com/SAP/ui5-webcomponents/issues/2400)) ([bdec517](https://github.com/SAP/ui5-webcomponents/commit/bdec517)), closes [#2368](https://github.com/SAP/ui5-webcomponents/issues/2368)



# [1.0.0-rc.9](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.8...v1.0.0-rc.9) (2020-10-08)


### Bug Fixes

* **components:** fix setting contentDensity styles ([#2094](https://github.com/SAP/ui5-webcomponents/issues/2094)) ([9454ab7](https://github.com/SAP/ui5-webcomponents/commit/9454ab7)), closes [#2093](https://github.com/SAP/ui5-webcomponents/issues/2093)
* **ui5-flexible-column-layout:** Fix arrow misplacement in IE ([#2032](https://github.com/SAP/ui5-webcomponents/issues/2032)) ([57be7c2](https://github.com/SAP/ui5-webcomponents/commit/57be7c2)), closes [#1998](https://github.com/SAP/ui5-webcomponents/issues/1998)
* **ui5-shellbar:** remove width limitation of logo ([230cd7f](https://github.com/SAP/ui5-webcomponents/commit/230cd7f)), closes [#2066](https://github.com/SAP/ui5-webcomponents/issues/2066)
* **ui5-shellbar-item:** Update count properly ([#2049](https://github.com/SAP/ui5-webcomponents/issues/2049)) ([2499c56](https://github.com/SAP/ui5-webcomponents/commit/2499c56)), closes [#2048](https://github.com/SAP/ui5-webcomponents/issues/2048)


### Features

* **ui5-shellbar:** implement root part ([#2299](https://github.com/SAP/ui5-webcomponents/issues/2299)) ([de2d07f](https://github.com/SAP/ui5-webcomponents/commit/de2d07f))





# [1.0.0-rc.8](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2020-07-30)


### Bug Fixes

* **ui5-upload-collection-item:** Activate editing with SPACE ([#2024](https://github.com/SAP/ui5-webcomponents/issues/2024)) ([45de0f2](https://github.com/SAP/ui5-webcomponents/commit/45de0f2)), closes [#2003](https://github.com/SAP/ui5-webcomponents/issues/2003)
* **ui5-file-uploader:** Setting the value to an empty string also resets the file input ([#1715](https://github.com/SAP/ui5-webcomponents/issues/1715)) ([f8b1b39](https://github.com/SAP/ui5-webcomponents/commit/f8b1b39))
* **ui5-shellbar:** Fix popup opening on notificationClick ([#1632](https://github.com/SAP/ui5-webcomponents/issues/1632)) ([04b44b4](https://github.com/SAP/ui5-webcomponents/commit/04b44b4))
* **ui5-shellbar:** Fix profile bg-color ([#1945](https://github.com/SAP/ui5-webcomponents/issues/1945)) ([a3207e5](https://github.com/SAP/ui5-webcomponents/commit/a3207e5)), closes [#1944](https://github.com/SAP/ui5-webcomponents/issues/1944)
* **ui5-shellbar:** Fix search field focus handling ([#1636](https://github.com/SAP/ui5-webcomponents/issues/1636)) ([c65010b](https://github.com/SAP/ui5-webcomponents/commit/c65010b))
* **ui5-shellbar:** Fix search field visual in IE ([#1643](https://github.com/SAP/ui5-webcomponents/issues/1643)) ([afec3fe](https://github.com/SAP/ui5-webcomponents/commit/afec3fe))
* **ui5-shellbar:** Style profile correctly on IE ([#1807](https://github.com/SAP/ui5-webcomponents/issues/1807)) ([4198599](https://github.com/SAP/ui5-webcomponents/commit/4198599))
* **ui5-upload-collection:** Set minimum height in no-data mode ([#1683](https://github.com/SAP/ui5-webcomponents/issues/1683)) ([549148d](https://github.com/SAP/ui5-webcomponents/commit/549148d))
* **ui5-upload-collection:** Provide min-height also when DND mode is on ([#1770](https://github.com/SAP/ui5-webcomponents/issues/1770)) ([33fa055](https://github.com/SAP/ui5-webcomponents/commit/33fa055))
* **ui5-upload-collection:** The component does not get stuck when dropping on the body ([#1897](https://github.com/SAP/ui5-webcomponents/issues/1897)) ([f236e0d](https://github.com/SAP/ui5-webcomponents/commit/f236e0d))
* correct styles for some elements ([#1773](https://github.com/SAP/ui5-webcomponents/issues/1773)) ([1a5db12](https://github.com/SAP/ui5-webcomponents/commit/1a5db12))
* **ui5-upload-collection-item:** Make component responsive ([#1579](https://github.com/SAP/ui5-webcomponents/issues/1579)) ([47d37c3](https://github.com/SAP/ui5-webcomponents/commit/47d37c3))


### Features

* **ui5-flexible-column-layout:** Introduce new components ([#1867](https://github.com/SAP/ui5-webcomponents/issues/1867)) ([7a68dd2](https://github.com/SAP/ui5-webcomponents/commit/7a68dd2))
* **ui5-side-navigation:** Initial implementation ([#1889](https://github.com/SAP/ui5-webcomponents/issues/1889)) ([47b38cc](https://github.com/SAP/ui5-webcomponents/commit/47b38cc))
* **ui5-li-notification, ui5-li-notification-group:** Introduce new components ([#1576](https://github.com/SAP/ui5-webcomponents/issues/1576)) ([ef62f81](https://github.com/SAP/ui5-webcomponents/commit/ef62f81)), closes [#1478](https://github.com/SAP/ui5-webcomponents/issues/1478)
* **ui5-shellbar:** Add "logo" slot ([#1842](https://github.com/SAP/ui5-webcomponents/issues/1842)) ([08fc5f3](https://github.com/SAP/ui5-webcomponents/commit/08fc5f3))
* **ui5-shellbar:** Enable tooltips of custom icons ([#1863](https://github.com/SAP/ui5-webcomponents/issues/1863)) ([4338d56](https://github.com/SAP/ui5-webcomponents/commit/4338d56))
* **ui5-shellbar:** Implement accessibility spec ([#1553](https://github.com/SAP/ui5-webcomponents/issues/1553)) ([3b7b439](https://github.com/SAP/ui5-webcomponents/commit/3b7b439))
* **ui5-upload-collection-item:** Implement keyboard handling ([#1702](https://github.com/SAP/ui5-webcomponents/issues/1702)) ([37bf177](https://github.com/SAP/ui5-webcomponents/commit/37bf177))





# [1.0.0-rc.7](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2020-04-30)


### Bug Fixes

* **ui5-product-switch-item:** fix active state ([#1547](https://github.com/SAP/ui5-webcomponents/issues/1547)) ([0305da8](https://github.com/SAP/ui5-webcomponents/commit/0305da8))
* **ui5-shellbar:** check for profile correctly ([#1438](https://github.com/SAP/ui5-webcomponents/issues/1438)) ([a4f502b](https://github.com/SAP/ui5-webcomponents/commit/a4f502b))
* **ui5-shellbar:** do not duplicate popover menu items ([#1456](https://github.com/SAP/ui5-webcomponents/issues/1456)) ([ae20272](https://github.com/SAP/ui5-webcomponents/commit/ae20272))
* **ui5-shellbar:** enable items keyboard handling ([#1473](https://github.com/SAP/ui5-webcomponents/issues/1473)) ([185851a](https://github.com/SAP/ui5-webcomponents/commit/185851a))
* **ui5-shellbar:** fix menuItems cloning ([#1457](https://github.com/SAP/ui5-webcomponents/issues/1457)) ([f4d2547](https://github.com/SAP/ui5-webcomponents/commit/f4d2547))
* **ui5-upload-collection:** ensure event.dataTransfer.types is array ([#1433](https://github.com/SAP/ui5-webcomponents/issues/1433)) ([28cc988](https://github.com/SAP/ui5-webcomponents/commit/28cc988))


### Features

* **ui5-upload-collection:** implement new webcomponent ([#1316](https://github.com/SAP/ui5-webcomponents/issues/1316)) ([54038e4](https://github.com/SAP/ui5-webcomponents/commit/54038e4))





# [1.0.0-rc.6](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2020-03-27)


### Bug Fixes

* **ui5-shellbar:** Change path in imports for playground ([#1008](https://github.com/SAP/ui5-webcomponents/issues/1008)) ([bfe36dd](https://github.com/SAP/ui5-webcomponents/commit/bfe36dd))
* **ui5-shellbar:** fire logoClick on small size ([#1192](https://github.com/SAP/ui5-webcomponents/issues/1192)) ([b84b9d8](https://github.com/SAP/ui5-webcomponents/commit/b84b9d8))
* **ui5-shellbar:** fix search field behavior ([#1264](https://github.com/SAP/ui5-webcomponents/issues/1264)) ([2beb1c5](https://github.com/SAP/ui5-webcomponents/commit/2beb1c5))
* **ui5-shellbar:** provide correct target ref when item is in overflow popover ([#1334](https://github.com/SAP/ui5-webcomponents/issues/1334)) ([7636bb7](https://github.com/SAP/ui5-webcomponents/commit/7636bb7))



### Features

* **ui5-shellbar:** add profile slot ([#1222](https://github.com/SAP/ui5-webcomponents/issues/1222)) ([9dab18b](https://github.com/SAP/ui5-webcomponents/commit/9dab18b))
* **ui5-shellbar-item:** introduce count property ([#1221](https://github.com/SAP/ui5-webcomponents/issues/1221)) ([02ddd0d](https://github.com/SAP/ui5-webcomponents/commit/02ddd0d))


### BREAKING CHANGES

* **ui5-shellbar:** profile property is removed in favour of profile slot


# [1.0.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2019-12-02)


### Features

* **ui5-product-switch:** initial implementation ([#971](https://github.com/SAP/ui5-webcomponents/pull/971)) ([4646fcd](https://github.com/SAP/ui5-webcomponents/commit/70d44b1ebf4b47c7e99ebf96feb19e5c04646fcd))

### Code Refactoring

* **ui5-shellbar:** move component to @ui5/webcomponents-fiori package ([#887](https://github.com/SAP/ui5-webcomponents/pull/887)) ([06f1770](https://github.com/SAP/ui5-webcomponents/commit/17c25ff123436c1f6e11513055b33977b06f1770))	
* **ui5-shellbar:** extract animated co-pilot SVG as add-on asset ([#904](https://github.com/SAP/ui5-webcomponents/pull/904)) ([c25e0a7](https://github.com/SAP/ui5-webcomponents/commit/59fead49d7a3222d55270584bb048190dc25e0a7))
* **ui5-shellbar:** optimize animated co-pilot SVG size from 15kb to 8kb ([#960](https://github.com/SAP/ui5-webcomponents/pull/960)) ([42bd7cd](https://github.com/SAP/ui5-webcomponents/commit/66d8c62658648cfeb7392607e9b66548c42bd7cd))
* **ui5-shellbar:** "icon" slot renamed to "startButton" ([#901](https://github.com/SAP/ui5-webcomponents/pull/901)) ([3e38149](https://github.com/SAP/ui5-webcomponents/commit/5ca3280ca166934ab02de92a04eccc8f53e38149))
* **ui5-shellbar-item:** "src" property renamed to "name" ([#928](https://github.com/SAP/ui5-webcomponents/pull/928)) ([8e060d1](https://github.com/SAP/ui5-webcomponents/commit/0489673610ce2fd0e96d0a3a1f4e0465d8e060d1))

### BREAKING CHANGES

* **ui5-shellbar:** extract animated co-pilot SVG as add-on asset

To get the ShellBar's coPilot animated SVG you have to import the following module:
```js
	import @ui5/webcomponents/dist/features/CoPilotAnimation.js` 
```

* **ui5-shellbar:** "icon" slot renamed to "startButton" ([#901](https://github.com/SAP/ui5-webcomponents/pull/901)) ([3e38149](https://github.com/SAP/ui5-webcomponents/commit/5ca3280ca166934ab02de92a04eccc8f53e38149))

* **ui5-shellbar-item:** "src" property renamed to "name":

The src property was renamed to icon and accepts icon name (such as "add") instead of icon src (such as "sap-icon://add")
