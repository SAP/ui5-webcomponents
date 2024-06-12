# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.4...v2.0.0-rc.5) (2024-06-06)


### Bug Fixes

* **ui5-combobox:** fix grouping sample ([#9085](https://github.com/SAP/ui5-webcomponents/issues/9085)) ([2c160d3](https://github.com/SAP/ui5-webcomponents/commit/2c160d31bbc6d7328dc8073582ec6a63415513e8))
* **ui5-notification-list:** improved accessibility ([#9070](https://github.com/SAP/ui5-webcomponents/issues/9070)) ([5e62d4a](https://github.com/SAP/ui5-webcomponents/commit/5e62d4af792d7043f931b0f8f894d36a85f18395))


### Code Refactoring

* **ui5-link:** wrap text by default ([#9006](https://github.com/SAP/ui5-webcomponents/issues/9006)) ([1924b54](https://github.com/SAP/ui5-webcomponents/commit/1924b5457f22c428527f8be3fbdd46d9d5d7ffed))
* **ui5-radio-button:** wrap text by default ([#9117](https://github.com/SAP/ui5-webcomponents/issues/9117)) ([b8d7bac](https://github.com/SAP/ui5-webcomponents/commit/b8d7bac56c783825cf9354e020730e0d6a87a2b4))


### Features

* **ui5-menu-item:** add endContent slot ([dc3cfde](https://github.com/SAP/ui5-webcomponents/commit/dc3cfde6483e9d4200ed9b4c1772872836233842)), closes [#6350](https://github.com/SAP/ui5-webcomponents/issues/6350)


### BREAKING CHANGES

* **ui5-radio-button:** `wrapping-type` property default value has changed from `None` to `Normal`.
Before:
```html
<ui5-radio-button text="Option A with long long text"></ui5-radio-button>
<!-- would truncate the text if there is not enough space -->
```

Now:
```html
<ui5-radio-button text="Option A with long long text"></ui5-radio-button>
<!-- would let the text wrap if there is not enough space -->
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
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

* **ui5-button:** adjust ui5-button menu button samples to use open/opener ([974ff8c](https://github.com/SAP/ui5-webcomponents/commit/974ff8c4e3582f6a18621100a9fb6ae8b2f47dbd))
* **ui5-notification:** implement keyboard navigation spec ([#8975](https://github.com/SAP/ui5-webcomponents/issues/8975)) ([d68c883](https://github.com/SAP/ui5-webcomponents/commit/d68c883f527e57f75bdad5a7a421b3ab8e4efbb0))


### Code Refactoring

* **ui5-option:** make options physical elements ([#8903](https://github.com/SAP/ui5-webcomponents/issues/8903)) ([8d6fac7](https://github.com/SAP/ui5-webcomponents/commit/8d6fac75151fd3f42f58ec29cc8f27d0383114d2)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#7887](https://github.com/SAP/ui5-webcomponents/issues/7887)
* **ui5-shellbar:** introducing assistant slot ([#8963](https://github.com/SAP/ui5-webcomponents/issues/8963)) ([2a8c252](https://github.com/SAP/ui5-webcomponents/commit/2a8c252ecf67fce81d5ac7b2a7d949c058de9d17)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#7887](https://github.com/SAP/ui5-webcomponents/issues/7887)


### Features

* **ui5-button:** add second (end) icon ([2e97c03](https://github.com/SAP/ui5-webcomponents/commit/2e97c03fc8f9d00c7d9bdd8c1ceb63bac13b7e32))
* **ui5-dynamic-page:** introduce new component ([#7899](https://github.com/SAP/ui5-webcomponents/issues/7899)) ([3752ce7](https://github.com/SAP/ui5-webcomponents/commit/3752ce701fe915fa0b02ba2b114c40bf3b7d9123))
* **ui5-form:** introduce Form web component ([#8281](https://github.com/SAP/ui5-webcomponents/issues/8281)) ([8d72042](https://github.com/SAP/ui5-webcomponents/commit/8d720429d9ad416f73f42c08ab9aa0e892e24ddb)), closes [#7854](https://github.com/SAP/ui5-webcomponents/issues/7854)
* **ui5-input:** allow custom icon styling ([#8881](https://github.com/SAP/ui5-webcomponents/issues/8881)) ([cf9f1c2](https://github.com/SAP/ui5-webcomponents/commit/cf9f1c28c93b9fa6c8663ce24d3c5e6d1ff4cc4e)), closes [#8182](https://github.com/SAP/ui5-webcomponents/issues/8182) [#6132](https://github.com/SAP/ui5-webcomponents/issues/6132)
* **ui5-li-notification:** implement new design ([#8426](https://github.com/SAP/ui5-webcomponents/issues/8426)) ([e451cdc](https://github.com/SAP/ui5-webcomponents/commit/e451cdc3709553dcb780f637463dc1b29e8f2971))
* **ui5-list,ui5-tree:** make drag&drop feature public ([#8904](https://github.com/SAP/ui5-webcomponents/issues/8904)) ([60b8038](https://github.com/SAP/ui5-webcomponents/commit/60b8038b0731bbf5a3222bc757fcc710d213b7d2))


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
* **ui5-option:** The ui5-select-menu and ui5-select-menu-option components are removed. Custom options can now be created using the ui5-option-custom, directly placed inside the default slot of the ui5-select

SelectMenu & SelectMenuOption
Changed item	Old	New
SelectMenu	ui5-select-menu	removed
SelectMenuOption	ui5-select-menu-option	ui5-option-custom
If you have previously used the ui5-select-menu and ui5-select-menu-option:

<ui5-select menu="selectMenu"></ui5-select>

<ui5-select-menu id="selectMenu">
    <ui5-select-menu-option>
        <div class="optionContent">custom</div>
    </ui5-select-menu-option>
</ui5-select-menu>
Now use just ui5-select and ui5-option-custom instead:

<ui5-select>
    <ui5-option-custom>
        <div class="optionContent">custom</div>
    </ui5-option-custom>
</ui5-select>
Select
Changed item	Old	New
property	menu	removed
The menu property of the ui5-select is removed.
* **ui5-button:** iconEnd property is changed from boolean to string type and now can accept name for second/end icon.

Before:

`<ui5-button icon="home" icon-end>Button</ui5-button>`

Now:

`<ui5-button end-icon="home">Button</ui5-button>`

or 

`<ui5-button icon="employee" end-icon="home">Button</ui5-button>`





# [2.0.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.2...v2.0.0-rc.3) (2024-05-10)


### Code Refactoring

* rename ValueState values ([#8864](https://github.com/SAP/ui5-webcomponents/issues/8864)) ([ef9304d](https://github.com/SAP/ui5-webcomponents/commit/ef9304da4b1446178b1b2bfa737d9867461cc4bc))
* **theming:** remove Belize theme ([#8519](https://github.com/SAP/ui5-webcomponents/issues/8519)) ([990313f](https://github.com/SAP/ui5-webcomponents/commit/990313fc8e429a491f4d6e67306d3df2703e54fe)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-badge:** change default values of properties ([#8601](https://github.com/SAP/ui5-webcomponents/issues/8601)) ([6d1df02](https://github.com/SAP/ui5-webcomponents/commit/6d1df02a126443fc13febccd4b036e387b8d0190))
* **ui5-badge:** rename Badge `ui5-badge` to Tag `ui5-tag` ([#8884](https://github.com/SAP/ui5-webcomponents/issues/8884)) ([4b8c1ee](https://github.com/SAP/ui5-webcomponents/commit/4b8c1eee72a6baea79a58983e8cc021addca9480))
* **ui5-carousel:** replace items-per-page-s, items-per-page-m, items-per-page-l properties ([#8635](https://github.com/SAP/ui5-webcomponents/issues/8635)) ([fc8d15a](https://github.com/SAP/ui5-webcomponents/commit/fc8d15a212778072e8cead5febcae3492ae0a8e1)), closes [#8494](https://github.com/SAP/ui5-webcomponents/issues/8494) [#8496](https://github.com/SAP/ui5-webcomponents/issues/8496) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8497](https://github.com/SAP/ui5-webcomponents/issues/8497) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8504](https://github.com/SAP/ui5-webcomponents/issues/8504) [#8509](https://github.com/SAP/ui5-webcomponents/issues/8509) [#8507](https://github.com/SAP/ui5-webcomponents/issues/8507) [#8511](https://github.com/SAP/ui5-webcomponents/issues/8511) [#8501](https://github.com/SAP/ui5-webcomponents/issues/8501) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8503](https://github.com/SAP/ui5-webcomponents/issues/8503) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8506](https://github.com/SAP/ui5-webcomponents/issues/8506) [#8502](https://github.com/SAP/ui5-webcomponents/issues/8502) [#8524](https://github.com/SAP/ui5-webcomponents/issues/8524) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8525](https://github.com/SAP/ui5-webcomponents/issues/8525) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8518](https://github.com/SAP/ui5-webcomponents/issues/8518) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8526](https://github.com/SAP/ui5-webcomponents/issues/8526) [#8529](https://github.com/SAP/ui5-webcomponents/issues/8529) [#8528](https://github.com/SAP/ui5-webcomponents/issues/8528) [#8531](https://github.com/SAP/ui5-webcomponents/issues/8531) [#8532](https://github.com/SAP/ui5-webcomponents/issues/8532) [#8534](https://github.com/SAP/ui5-webcomponents/issues/8534) [#8163](https://github.com/SAP/ui5-webcomponents/issues/8163) [#8527](https://github.com/SAP/ui5-webcomponents/issues/8527) [#8538](https://github.com/SAP/ui5-webcomponents/issues/8538) [#8521](https://github.com/SAP/ui5-webcomponents/issues/8521) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8542](https://github.com/SAP/ui5-webcomponents/issues/8542) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8548](https://github.com/SAP/ui5-webcomponents/issues/8548) [#8555](https://github.com/SAP/ui5-webcomponents/issues/8555) [#8559](https://github.com/SAP/ui5-webcomponents/issues/8559) [#8565](https://github.com/SAP/ui5-webcomponents/issues/8565) [#8570](https://github.com/SAP/ui5-webcomponents/issues/8570) [#8558](https://github.com/SAP/ui5-webcomponents/issues/8558) [#8568](https://github.com/SAP/ui5-webcomponents/issues/8568) [#8596](https://github.com/SAP/ui5-webcomponents/issues/8596) [#8192](https://github.com/SAP/ui5-webcomponents/issues/8192) [#8606](https://github.com/SAP/ui5-webcomponents/issues/8606) [#8605](https://github.com/SAP/ui5-webcomponents/issues/8605) [#8600](https://github.com/SAP/ui5-webcomponents/issues/8600) [#8602](https://github.com/SAP/ui5-webcomponents/issues/8602)
* **ui5-icon:** add mode property ([#8834](https://github.com/SAP/ui5-webcomponents/issues/8834)) ([446483d](https://github.com/SAP/ui5-webcomponents/commit/446483d548bce20d36ffa0536a56bfab1cb00cfe))
* **ui5-list:** enable hierarchical groups ([#8632](https://github.com/SAP/ui5-webcomponents/issues/8632)) ([193ed52](https://github.com/SAP/ui5-webcomponents/commit/193ed52f2085bef380005337001dc4f2f131a971)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-page:** rename disableScrolling and floatingFooter properties ([#8816](https://github.com/SAP/ui5-webcomponents/issues/8816)) ([2f6fe6c](https://github.com/SAP/ui5-webcomponents/commit/2f6fe6c1e598ebb807ade1b1bfabe93c76f1b6fb))
* **ui5-segmented-button-item:** implement segmented button item independently from button ([#8669](https://github.com/SAP/ui5-webcomponents/issues/8669)) ([7b5f751](https://github.com/SAP/ui5-webcomponents/commit/7b5f7513bf91bcc20553dfefa4f40215c10e567b))
* **ui5-table:** move Table to `@ui5/webcomponents-compat` ([#8849](https://github.com/SAP/ui5-webcomponents/issues/8849)) ([779bcdc](https://github.com/SAP/ui5-webcomponents/commit/779bcdcaff6693252d0a8b69b886bf7b939c7887))
* **ui5-title:** wrap text by default ([#8916](https://github.com/SAP/ui5-webcomponents/issues/8916)) ([f267f50](https://github.com/SAP/ui5-webcomponents/commit/f267f504a93d45a65c4cdf2acff8c65182ba1df2))
* **ui5-toast:** replace `show` method with `open` property ([#8855](https://github.com/SAP/ui5-webcomponents/issues/8855)) ([372d27d](https://github.com/SAP/ui5-webcomponents/commit/372d27d9db9afd40ffaf85cbfab61f10284063c3)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)


### Features

* **ui5-badge:** new property added ([#8714](https://github.com/SAP/ui5-webcomponents/issues/8714)) ([a60c5ee](https://github.com/SAP/ui5-webcomponents/commit/a60c5ee50d18498db6af21e9c5d87b20699793c7))


### BREAKING CHANGES

* **ui5-title:** wrapping-type property default value has changed from `None` to `Normal`.
Previously long texts would truncate if there is not enough space. Now, long texts would wrap.

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
* **ui5-icon:** The properties `ariaHidden` , `interactive` and `accessibleRole` , previously available in the `ui5-icon` component, have been removed. They are replaced by a new property named `mode` that specifies the component's mode. 
Alongside this update, a new enumeration `IconMode`, has been introduced to outline the available options for this property:

`Image`: This is the default setting. It configures the component to internally render `role="img"`.
`Interactive`: Configures the component to internally render `role="button"`. This mode also supports focus and press handling to enhance interactivity.
`Decorative`: In this mode, the component internally renders `role="presentation"` and `aria-hidden="true"`, making it purely decorative without semantic content or interactivity.

Now, you can set the mode of the `ui5-icon` as it follows:
```html
<ui5-icon id="imageIcon" mode="Image" name="add-equipment"></ui5-icon>
<ui5-icon id="myInteractiveIcon" mode="Interactive" name="add-equipment"></ui5-icon>
<ui5-icon id="decorativeIcon" mode="Decorative" name="add-equipment"></ui5-icon>
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* **ui5-table:** If you previously used the Table from `@ui5/webcomponents`, you need to import it from @ui5/webcomponents-compat:
```ts
import "@ui5/webcomponents-compat/dist/Table.js"; // ui5-table
import "@ui5/webcomponents-compat/dist/TableColumn.js"; // ui5-table-column
import "@ui5/webcomponents-compat/dist/TableRow.js"; // ui5-table-row`
import "@ui5/webcomponents-compat/dist/TableGroupRow.js";` // ui5-table-group-row
import "@ui5/webcomponents-compat/dist/TableCell.js"; // ui5-table-cell
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
* **theming:** Remove SAP Belize theme
* **ui5-page:** `disableScrolling` has been renamed, `floatingFooter` property has been removed and `fixedFooter` property has been added instead.

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** "Device#isIE" method has been removed and no longer available

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** Removed the `CSP.js` module and the creation of `<style>` and `<link>` tags, as all browsers now support adoptedStyleSheets. The following APIs are not available any more and should not be used:
```ts
import { setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPackageCSSRoot } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPreloadLinks } from "@ui5/webcomponents-base/dist/CSP.js"
```
* **ui5-carousel:** Removed the `ICardHeader` interface. If you previously used the interface
```ts
import type { ICardHeader } from "@ui5/webcomponents-base/dist/Card.js"
```
Use the CardHeader type instead:
```ts
import type CardHeader from "@ui5/webcomponents-base/dist/CardHeader.js"
```
* **ui5-carousel:** Removed the `IUploadCollectionItem` interface. If you previously used the interface:
```js
import type { IUploadCollectionItem} from "@ui5/webcomponents-fiori/dist/UploadCollection.js"
```
Use the `UploadCollectionItem` type instead:
```js
import type UploadCollectionItem from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js"
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** The `size` property now accepts different values. If you previously used it like:
```html
<ui5-busy-indicator size="Small"></ui5-busy-indicator>
```
Now use the new values instead:
```html
<ui5-busy-indicator size="S"></ui5-busy-indicator>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** The `status` property and its shadow part have been renamed. If you previously used them:
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
* **ui5-carousel:** The `pageIndicatorStyle` no longer exists. If you previously used it like:
```html
<ui5-carousel page-indicator-style="Numeric"></ui5-carousel>
```
Now you should use `pageIndicatorType` instead:
```html
<ui5-carousel page-indicator-type="Numeric"></ui5-carousel>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** Removed `UI5Element#render` method in favour of `UI5Element#renderer`. If you previously used "render"
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
* **ui5-carousel:** Remove  JavaScript template option from @ui5/create-webcomponents-package
Previously `npm init @ui5/webcomponents-package` used to create JS-based project, however now it will be TypeScript-based project.
If you previously used `npm init @ui5/webcomponents-package --enable-typescript` to create  TypeScript-based project, now it's by default, e.g `npm init @ui5/webcomponents-package` and `--enable-typescript` is removed.
* **ui5-carousel:** The `Left` and `Right` options option have been renamed. If you previously used them to set the placement or the alignment of the popover:
```html
<ui5-popover horizontal-align="Left" placement-type="Left"></ui5-popover>
```
Now use `Start` or `End` instead:
```html
<ui5-popover horizontal-align="Start" placement-type="Start"></ui5-popover>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461

* docs: deploy v2 preview
* **ui5-carousel:** Remove `soccor` icon. Use `soccer` instead.
* **ui5-carousel:** Remove `add-polygone` icon. Use `add-polygon` instead.
* **ui5-carousel:** The JSDoc plugin has been removed, and the generation of api.json has stopped. If you previously relied on the `ui5-package/dist/api.json file`, you can now use `ui5-package/dist/custom-elements.json`
* **ui5-carousel:** All Assets-static.js modules are removed. If you previously imported any Assets-static.js module from any package:
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
* **ui5-carousel:** The event `selected-dates-change ` is renamed to `selection-change`. In addition the event details
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
* **ui5-carousel:** The property `color`  is renamed to `value`. If you previously used the change event of the ColorPicker as follows:
```html
<ui5-color-picker color="red"></ui5-color-picker>
```
Now you have to use it like this:
```html
<ui5-color-picker value="red"></ui5-color-picker>
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** JavaScript projects may not function properly with the tools package.
* **ui5-carousel:** The `openPopover` and `showAt` methods are removed in favor of `open`  and `opener` properties. If you previously used the imperative API:
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
* **ui5-carousel:** The `ui5-bar` component is now in `main` library. If you previously imported  the `ui5-bar` from `fiori`:
```ts
import "@ui5/webcomponents-fiori/dist/Bar.js;
```
Now, import the `ui5-bar` from `main`:
```ts 
import "@ui5/webcomponents/dist/Bar.js";
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** If you have previously used:
```html
<ui5-tab id="nestedTab" slot="subTabs"></ui5-tab>
```
Now use:
```html
<ui5-tab id="nestedTab" slot="items"></ui5-tab>
```

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** If you have previously used: 
```html
<ui5-tabcontainer tabs-overflow-mode="StartAndEnd"></ui5-tabcontainer>
```
Now use:
```html
<ui5-tabcontainer overflow-mode="StartAndEnd"></ui5-tabcontainer>
```

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** If you previously imported `TabContainerBackgroundDesign`, use `BackgroundDesign` instead.

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** The showOverflow property is removed. If previously you have used: 
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
* **ui5-carousel:** The `placementType` property and the `PopoverPlacementType` enum have been renamed.
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
* **ui5-carousel:** The `size` property of the `ui5--illustrated-message` is renamed to `design`.
If you have previously used the `size` property:
```html
<ui5-illustrated-message size="Dialog">
```
Now use `design` instead:
```html
<ui5-illustrated-message design="Dialog">

```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* **ui5-carousel:** The `separator-style` property is renamed to  `separators` and the `BreadcrumbsSeparatorStyle` enum is renamed to `BreadcrumbsSeparator`.
If you have previously used the `separator-style` property:
```html
<ui5-breadcrumbs separator-style="Slash">
```
Now use  `separators`  instead:
```html
<ui5-breadcrumbs separators="Slash">
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* **ui5-carousel:** The `disabled` property of the `ui5-option` is removed.
If you have previously used the `disabled` property:
```html
<ui5-option disabled>Option</ui5-option>
```
it will no longer work for the component.

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887

* refactor(ui5-upload-collection): introduce items-per-page property

The items-per-page-s, items-per-page-m, items-per-page-l properties
are replaced by a single property items-per-page
with value in the following format "S1 M2 L3"

* refactor(ui5-carousel): replace items-per-page-s, items-per-page-m, items-per-page-l properties

Add XL size and refactor

* chore: tests added

* fix: xl test

* refactor(ui5-carousel): replace items-per-page-s, items-per-page-m, items-per-page-l properties

Address code review coments

* refactor(ui5-carousel): replace items-per-page-s, items-per-page-m, items-per-page-l properties

Address code review comments

* refactor(ui5-carousel): replace items-per-page-s, items-per-page-m, items-per-page-l properties

Updates documentation
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
* **ui5-badge:** The `design` property has new default value `Neutral`  instead of `Set3`.
If you have previously used ```html <ui5-badge></ui5-badge>``` without attributes, to have the same look and feel now you have to set the design property to “Set3”: ```html <ui5-badge design="Set3"></ui5-badge>```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461





# [2.0.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2024-04-18)


### Code Refactoring

* **ui5-multi-combobox:** rename property allowCustomValues to noValidation ([#8765](https://github.com/SAP/ui5-webcomponents/issues/8765)) ([bb27acb](https://github.com/SAP/ui5-webcomponents/commit/bb27acbc2f8321219d99c7732d8536a00ae38272))
* **ui5-textarea:** rename property growingMaxLines to growingMaxRows ([#8756](https://github.com/SAP/ui5-webcomponents/issues/8756)) ([3fd33ab](https://github.com/SAP/ui5-webcomponents/commit/3fd33aba0164e0a5c06bd44d057157a1dd54b522)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)


### Features

* **ui5-barcode-scanner-dialog:** add support for close and open events ([#8753](https://github.com/SAP/ui5-webcomponents/issues/8753)) ([1ae2142](https://github.com/SAP/ui5-webcomponents/commit/1ae2142aa6ba2c587126e49422724658686d2344)), closes [#8695](https://github.com/SAP/ui5-webcomponents/issues/8695)
* **ui5-date-*:** adapt date and time controls to timezone feature ([#8610](https://github.com/SAP/ui5-webcomponents/issues/8610)) ([1acae01](https://github.com/SAP/ui5-webcomponents/commit/1acae010eb81f4d50368587b66c8840bdf886d04)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-message-strip:** introduce custom colors ([#8757](https://github.com/SAP/ui5-webcomponents/issues/8757)) ([d30f424](https://github.com/SAP/ui5-webcomponents/commit/d30f4240df5922888854d027dfcff732b5316ccc))


### BREAKING CHANGES

* **ui5-multi-combobox:** The `allowCustomValues` property have been renamed to `noValidation`.
If you have previously used the `allowCustomValues` property
`<ui5-multi-combobox allow-custom-values></ui5-multi-combobox>`
Now use noValidation instead:
`<ui5-multi-combobox no-validation></ui5-multi-combobox>`

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-textarea:** The `growingMaxLines` property have been renamed to `growingMaxRows`.





# [2.0.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2024-04-11)


### Features

* **ui5-text:** introduce Text web component ([#8299](https://github.com/SAP/ui5-webcomponents/issues/8299)) ([91acaf5](https://github.com/SAP/ui5-webcomponents/commit/91acaf5edadc63b19172a6f3a882023c31779878)), closes [#6788](https://github.com/SAP/ui5-webcomponents/issues/6788)





# [2.0.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0...v2.0.0-rc.0) (2024-04-09)


### chore

* bring release-2.0 to main ([#8651](https://github.com/SAP/ui5-webcomponents/issues/8651)) ([69271c9](https://github.com/SAP/ui5-webcomponents/commit/69271c9468c7dd54f90710fc4613ae0a79f85cef)), closes [#8494](https://github.com/SAP/ui5-webcomponents/issues/8494) [#8496](https://github.com/SAP/ui5-webcomponents/issues/8496) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8497](https://github.com/SAP/ui5-webcomponents/issues/8497) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8504](https://github.com/SAP/ui5-webcomponents/issues/8504) [#8509](https://github.com/SAP/ui5-webcomponents/issues/8509) [#8507](https://github.com/SAP/ui5-webcomponents/issues/8507) [#8511](https://github.com/SAP/ui5-webcomponents/issues/8511) [#8501](https://github.com/SAP/ui5-webcomponents/issues/8501) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8503](https://github.com/SAP/ui5-webcomponents/issues/8503) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8506](https://github.com/SAP/ui5-webcomponents/issues/8506) [#8502](https://github.com/SAP/ui5-webcomponents/issues/8502) [#8524](https://github.com/SAP/ui5-webcomponents/issues/8524) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8525](https://github.com/SAP/ui5-webcomponents/issues/8525) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8518](https://github.com/SAP/ui5-webcomponents/issues/8518) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8526](https://github.com/SAP/ui5-webcomponents/issues/8526) [#8529](https://github.com/SAP/ui5-webcomponents/issues/8529) [#8528](https://github.com/SAP/ui5-webcomponents/issues/8528) [#8531](https://github.com/SAP/ui5-webcomponents/issues/8531) [#8532](https://github.com/SAP/ui5-webcomponents/issues/8532) [#8534](https://github.com/SAP/ui5-webcomponents/issues/8534) [#8163](https://github.com/SAP/ui5-webcomponents/issues/8163) [#8527](https://github.com/SAP/ui5-webcomponents/issues/8527) [#8538](https://github.com/SAP/ui5-webcomponents/issues/8538) [#8521](https://github.com/SAP/ui5-webcomponents/issues/8521) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8542](https://github.com/SAP/ui5-webcomponents/issues/8542) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8548](https://github.com/SAP/ui5-webcomponents/issues/8548) [#8555](https://github.com/SAP/ui5-webcomponents/issues/8555) [#8559](https://github.com/SAP/ui5-webcomponents/issues/8559) [#8565](https://github.com/SAP/ui5-webcomponents/issues/8565) [#8570](https://github.com/SAP/ui5-webcomponents/issues/8570) [#8558](https://github.com/SAP/ui5-webcomponents/issues/8558) [#8568](https://github.com/SAP/ui5-webcomponents/issues/8568) [#8596](https://github.com/SAP/ui5-webcomponents/issues/8596) [#8192](https://github.com/SAP/ui5-webcomponents/issues/8192) [#8606](https://github.com/SAP/ui5-webcomponents/issues/8606) [#8605](https://github.com/SAP/ui5-webcomponents/issues/8605) [#8600](https://github.com/SAP/ui5-webcomponents/issues/8600) [#8602](https://github.com/SAP/ui5-webcomponents/issues/8602) [#8593](https://github.com/SAP/ui5-webcomponents/issues/8593)


### Code Refactoring

* **ui5-list, ui5-tree, ui5-upload-collection:** rename mode to selectionMode ([#8657](https://github.com/SAP/ui5-webcomponents/issues/8657)) ([d53b3b2](https://github.com/SAP/ui5-webcomponents/commit/d53b3b2e231b6bf3aa5b317634d3f304240f9d76))
* **ui5-list:** renamed busy, busyDelay to loading, loadingDelay ([#8686](https://github.com/SAP/ui5-webcomponents/issues/8686)) ([38e4df4](https://github.com/SAP/ui5-webcomponents/commit/38e4df4d1dc37a483bbd06f03df8306fb88c3fe3)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#7887](https://github.com/SAP/ui5-webcomponents/issues/7887)
* **ui5-progress-indicator:** remove disabled property ([#8683](https://github.com/SAP/ui5-webcomponents/issues/8683)) ([5e5c40a](https://github.com/SAP/ui5-webcomponents/commit/5e5c40a51628a23d9ffa5cd7a850a9977710ec38))
* **ui5-tabcontainer:** remove fixed property ([#8676](https://github.com/SAP/ui5-webcomponents/issues/8676)) ([98052e1](https://github.com/SAP/ui5-webcomponents/commit/98052e1857845314cc41e1cfff80436bd1096436)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-upload-collection:** remove Delete selection mode ([#8607](https://github.com/SAP/ui5-webcomponents/issues/8607)) ([926ae75](https://github.com/SAP/ui5-webcomponents/commit/926ae75015fc4ca751dcbc5a36a5acceeedfffe3))


### BREAKING CHANGES

* **ui5-list:** The `busy` property of the `ui5-list` is renamed.
If you have previously used the `busy`, `busyDelay` properties:
```html
<ui5-list busy busy-delay="500"></ui5-list>
```
now you must use  `loading` and `loadingDelay` properties:
```html
<ui5-list loading loading-delay="500"></ui5-list>
```
* **ui5-progress-indicator:** The `disabled` property of the `ui5-progress-indicator` is removed.
If you have previously used the `disabled` property, it won't take effect:
```html
<ui5-progress-indicator disabled value="60"></ui5-progress-indicator>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
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


### Features

* **ui5-carousel:** add accessibleName and accessibleNameRef ([#8631](https://github.com/SAP/ui5-webcomponents/issues/8631)) ([0d0d765](https://github.com/SAP/ui5-webcomponents/commit/0d0d765b3025c71cc13cd1dcc6f066d079f74396))





# [1.24.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.3...v1.24.0-rc.4) (2024-04-04)

**Note:** Version bump only for package @ui5/webcomponents-website





# [1.24.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.2...v1.24.0-rc.3) (2024-03-28)

**Note:** Version bump only for package @ui5/webcomponents-website





# [1.24.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.1...v1.24.0-rc.2) (2024-03-21)


### Features

* **ui5-busy-indicator:** added property text-placement ([#8471](https://github.com/SAP/ui5-webcomponents/issues/8471)) ([a494473](https://github.com/SAP/ui5-webcomponents/commit/a49447373cddcb91233fcb3ddd7c89b02d435044))





# [1.24.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.0...v1.24.0-rc.1) (2024-03-15)

**Note:** Version bump only for package @ui5/webcomponents-website





# [1.24.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.23.1...v1.24.0-rc.0) (2024-03-14)


### Bug Fixes

* **ui5-avatar:** fix default size appearance and font-family ([#8415](https://github.com/SAP/ui5-webcomponents/issues/8415)) ([22826f0](https://github.com/SAP/ui5-webcomponents/commit/22826f05c11f8be6b4ce037d6488e78fec634f99))





## [1.23.1](https://github.com/SAP/ui5-webcomponents/compare/v1.23.1-rc.0...v1.23.1) (2024-03-08)

**Note:** Version bump only for package @ui5/webcomponents-website





## [1.23.1-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0...v1.23.1-rc.0) (2024-03-07)

**Note:** Version bump only for package @ui5/webcomponents-website





# [1.23.0](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.5...v1.23.0) (2024-03-06)

**Note:** Version bump only for package @ui5/webcomponents-website
