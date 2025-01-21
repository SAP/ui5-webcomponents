import { expect, test } from 'vitest'
import "@ui5/webcomponents/dist/Button.js";

test('adds 1 + 2 to equal 3', () => {
  const button = document.createElement("ui5-button");
  console.log(button);
  expect(button).toBeTruthy();
})
