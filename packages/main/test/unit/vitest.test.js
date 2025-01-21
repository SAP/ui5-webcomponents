import { expect, test } from 'vitest'
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Dialog.js";

test('ui5-button should be a real web component instance', () => {
  const button = document.createElement("ui5-button");
  expect(button).toBeTruthy();
  expect(button.constructor.getMetadata().getTag()).toBe("ui5-button");
})
