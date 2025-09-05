import { expect, test } from 'vitest'
import "@ui5/webcomponents/dist/SegmentedButton.js";

test('SegmentedButton should have correct ARIA attributes for Single mode', async () => {
  const segmentedButton = document.createElement("ui5-segmented-button");
  segmentedButton.innerHTML = `
    <ui5-segmented-button-item>Option 1</ui5-segmented-button-item>
    <ui5-segmented-button-item>Option 2</ui5-segmented-button-item>
  `;
  document.body.appendChild(segmentedButton);
  
  // Ensure it's in Single mode (default)
  expect(segmentedButton.selectionMode).toBe("Single");
  
  // Wait for rendering
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const listbox = segmentedButton.shadowRoot.querySelector('ul[role="listbox"]');
  expect(listbox).toBeTruthy();
  expect(listbox.getAttribute('aria-multiselectable')).toBe('false');
  expect(listbox.getAttribute('aria-orientation')).toBe('horizontal');
});

test('SegmentedButton should have correct ARIA attributes for Multiple mode', async () => {
  const segmentedButton = document.createElement("ui5-segmented-button");
  segmentedButton.selectionMode = "Multiple";
  segmentedButton.innerHTML = `
    <ui5-segmented-button-item>Option A</ui5-segmented-button-item>
    <ui5-segmented-button-item>Option B</ui5-segmented-button-item>
  `;
  document.body.appendChild(segmentedButton);
  
  // Ensure it's in Multiple mode
  expect(segmentedButton.selectionMode).toBe("Multiple");
  
  // Wait for rendering
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const listbox = segmentedButton.shadowRoot.querySelector('ul[role="listbox"]');
  expect(listbox).toBeTruthy();
  expect(listbox.getAttribute('aria-multiselectable')).toBe('true');
  expect(listbox.getAttribute('aria-orientation')).toBe('horizontal');
});

test('SegmentedButton ARIA attributes should change when selectionMode changes', async () => {
  const segmentedButton = document.createElement("ui5-segmented-button");
  segmentedButton.innerHTML = `
    <ui5-segmented-button-item>Option X</ui5-segmented-button-item>
    <ui5-segmented-button-item>Option Y</ui5-segmented-button-item>
  `;
  document.body.appendChild(segmentedButton);
  
  // Start with Single mode (default)
  expect(segmentedButton.selectionMode).toBe("Single");
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let listbox = segmentedButton.shadowRoot.querySelector('ul[role="listbox"]');
  expect(listbox.getAttribute('aria-multiselectable')).toBe('false');
  expect(listbox.getAttribute('aria-orientation')).toBe('horizontal');
  
  // Change to Multiple mode
  segmentedButton.selectionMode = "Multiple";
  await new Promise(resolve => setTimeout(resolve, 100));
  
  listbox = segmentedButton.shadowRoot.querySelector('ul[role="listbox"]');
  expect(listbox.getAttribute('aria-multiselectable')).toBe('true');
  expect(listbox.getAttribute('aria-orientation')).toBe('horizontal');
});