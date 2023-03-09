# Wrapping Up

In the previous chapters we covered **bundling** UI5 Web Components, using **components**, **icons**, additional **assets** and optional **features**.

*This section illustrates how all these concepts combine*.

## Applying the Learnings in the `vite` App 

If you created the test app, described in [Getting Started](./01.%20Getting%20Started.md), you can enhance it as follows:

 1) In the "Getting Started" section you installed the `@ui5/webcomponents` package.

  Now, let's do the same for `@ui5/webcomponents-icons`:

```bash
npm install @ui5/webcomponents-icons
```

 2) Change the `main.js` file as follows:

   ```js
   import "@ui5/webcomponents/dist/Assets.js"; // Assets for the main package
   import "@ui5/webcomponents-icons/dist/Assets.js"; // Assets for the icons package
  
   import "@ui5/webcomponents/dist/Button.js"; // ui5-button
   import "@ui5/webcomponents/dist/ColorPalette.js"; // ui5-color-palette
   import "@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"; // the "more colors" feature
   import "@ui5/webcomponents-icons/dist/add.js"; // the "add" icon, used inside the button
   ```

  You now import assets, components, features and icons.

 3) Change the `index.html` file as follows:

   ```html
   <html>
       <body>
           <script type="module" src="/main.js"></script>
           <ui5-button icon="add">Button with icon</ui5-button>
           <ui5-color-palette show-more-colors>
                <ui5-color-palette-item value="red"></ui5-color-palette-item>
                <ui5-color-palette-item value="green"></ui5-color-palette-item>
                <ui5-color-palette-item value="blue"></ui5-color-palette-item>
           </ui5-color-palette>
       </body>
   </html>
   ```

   to use `ui5-button` with the `add` icon imported in `main.js` and the `ui5-color-palette` component with the `show-more-colors` feature.

 4) Run the project.

  If `vite` is running, it will just refresh your browser, otherwise run the project again.  

  ```bash
  npm run dev
  ```
  
  Go to your browser and observe the changes.

 5) Test the assets.

  Try running the test page with the following URL parameters: `sap-ui-theme=sap_belize_hcb&sap-ui-language=de`

  [http://localhost:3000/?sap-ui-theme=sap_belize_hcb&sap-ui-language=de](http://localhost:3000/?sap-ui-theme=sap_belize_hcb&sap-ui-language=de)
  
  You should be able to see the page with an accessibility theme, and in German language.
  
