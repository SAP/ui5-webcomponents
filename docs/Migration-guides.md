# Migration guides

## Migrating from `1.0.0-rc.4` to `1.0.0-rc.5`

### New npm package: `@ui5/webcomponents-icons`

All individual icons were moved to a new npm package called `@ui5/webcomponents-icons`.

If you are using icons in your project:

1. Add the new package as a dependency to your project

	`npm i @ui5/webcomponents-icons --save`
	
	or
	
	`yarn add @ui5/webcomponents-icons`
	
	depending on your package manager.
	
2. Change the imports for the individual icons (if you were importing them one by one):

	Current code | Change to
	-----|----
	`@ui5/webcomponents/dist/icons/add.js` | `@ui5/webcomponents-icons/dist/icons/add.js`
	`@ui5/webcomponents/dist/icons/search.js` | `@ui5/webcomponents-icons/dist/icons/search.js`
	etc... | etc...

	*Note:* The `ui5-icon` web component is not affected by this change, it is still in the `@ui5/webcomponents` package. Only the icons themselves (the icon assets) have been moved.


### New npm package: `@ui5/webcomponents-fiori` 

The `ui5-shellbar` and `ui5-shellbar-item` web components were moved to a new npm package called `@ui5/webcomponents-fiori`.

If you are using `ui5-shellbar` in your project:

1. Add the new package as a dependency to your project

	`npm i @ui5/webcomponents-fiori --save`
	
	or
	
	`yarn add @ui5/webcomponents-fiori`
	
	depending on your package manager.
	
2. Change the imports:

	Current code | Change to
	-----|----
	`@ui5/webcomponents/dist/ShellBar.js` | `@ui5/webcomponents-fiori/dist/ShellBar.js`
	`@ui5/webcomponents/dist/ShellBarItem.js` | `@ui5/webcomponents-fiori/dist/ShellBarItem.js`

### `ui5-icon`

The `src` property was renamed to `name` and accepts icon name (such as `add`) instead of icon src (such as `sap-icon://add`).
Note: the `src` property will continue to work until the next release due to the impact of the change, but will produce a warning in the console.

Current code | Change to
-----|----
`<ui5-icon src="sap-icon://add">` | `<ui5-icon name="add">`

### `ui5-card`

The `avatar` property was removed.
Use the `avatar` slot instead - pass an icon(`<ui5-icon>`) or an image(`<img>`).
Example:

Current code | Change to
-----|----
`<ui5-card avatar="sap-icon://add"></ui5-card>` | `<ui5-card><ui5-icon name="add" slot="avatar"></ui5-icon></ui5-card>`
`<ui5-card avatar="http://url/to/my/image"></ui5-card>` | `<ui5-card><img src="http://url/to/my/image" slot="avatar"/></ui5-card>` 

### `ui5-shellbar`

In addition to the fact that `ui5-shellbar` was moved to `@ui5/webcomponents-fiori`, the `icon` slot was renamed to `startButton`.

The `ui5-shellbar` CoPilot is now a static SVG by default. In order to have the animated SVG again, you need to manually import the following feature:
```js
import "@ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js";
``` 


### `ui5-shellbar-item`

In addition to the fact that `ui5-shellbar-item` was moved to `@ui5/webcomponents-fiori`, the `src` property was renamed to `icon` and accepts icon name (such as `add`) instead of icon src (such as `sap-icon://add`)

Current code | Change to
-----|----
`<ui5-shellbar-item src="sap-icon://add">` | `<ui5-shellbar-item icon="add">`

