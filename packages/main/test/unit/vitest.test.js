// vitest and jsdom and not supported for component development, use cypress instead
// this test is purely to make sure jsdom does not fail when used with web components
import { expect, test } from 'vitest'
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Dialog.js";
import testAssets from "@ui5/webcomponents/dist/bundle.esm.js";

test('ui5-button should be a real web component instance', () => {
  const button = document.createElement("ui5-button");
  document.body.appendChild(button);
  expect(button).toBeTruthy();
  expect(button.constructor.getMetadata().getTag()).toBe("ui5-button");

});
test('ui5-dialog can be opened (popover works)', () => {
  const dialog = document.createElement("ui5-dialog");
  document.body.appendChild(dialog);
  dialog.open = true;
  expect(dialog).toBeTruthy();
});

test('all registered tags from `main` should be created and appended in document ', () => {
  testAssets.getAllRegisteredTags().forEach(tag => {
    const el = document.createElement(tag);
    document.body.appendChild(el);
    expect(el).toBeTruthy();
  })
})
