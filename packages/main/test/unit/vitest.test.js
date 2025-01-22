// vitest and jsdom and not supported for component development, use cypress instead
// this test is purely to make sure jsdom does not fail when used with web components
import { expect, test } from 'vitest'
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Dialog.js";

test('ui5-button should be a real web component instance', () => {
  const button = document.createElement("ui5-button");
  expect(button).toBeTruthy();
  expect(button.constructor.getMetadata().getTag()).toBe("ui5-button");

  const dialog = document.createElement("ui5-dialog");
  document.body.appendChild(dialog);
  dialog.open = true;
  expect(dialog).toBeTruthy();
})
