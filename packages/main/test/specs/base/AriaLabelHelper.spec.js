import { assert } from "chai";

describe('AriaLabelHelper', () => {
  before(async () => {
    await browser.url(`test/pages/base/AriaLabelHelper.html`);
  });

  const getMessageAriaLabelAsExpected = (actual, expected) => {
    return `aria-label ${actual} is as expected ${expected}.`;
  };

  const testInputAriaLabelMatchesLabels = async (inputId, labelIds) => {
    const input = await browser.$(`#${inputId}`);
    const innerInput = await input.shadow$('input');
    const actualAriaLabel = await innerInput.getAttribute('aria-label');

    const promises = labelIds.map(async (labelId) => {
      const label = await browser.$(`#${labelId}`);
      return await label.getText();
    });
    const texts = await Promise.all(promises);
    const expectedAriaLabel = texts.join(' ');

    assert.equal(
      actualAriaLabel,
      expectedAriaLabel,
      getMessageAriaLabelAsExpected(actualAriaLabel, expectedAriaLabel)
    );
  };

  const testInputAriaLabelMatchesAccessibleName = async (inputId) => {
    const input = await browser.$(`#${inputId}`);
    const innerInput = await input.shadow$('input');
    const accessibleNameValue = await input.getAttribute('accessible-name');
    const actualAriaLabel = await innerInput.getAttribute('aria-label');
    assert.equal(
      actualAriaLabel,
      accessibleNameValue,
      getMessageAriaLabelAsExpected(actualAriaLabel, accessibleNameValue)
    );
  };

  const testInputAriaLabelIsUndefined = async (inputId) => {
    const input = await browser.$(`#${inputId}`);
    const innerInput = await input.shadow$('input');
    const actualAriaLabel = await innerInput.getAttribute('aria-label');
    assert.strictEqual(
      actualAriaLabel,
      null,
      `Aria Label is null. attr=${actualAriaLabel}`
    );
  };

  it('Label-for tests', async () => {
    const btn = await browser.$('#btnChange');
    await testInputAriaLabelMatchesLabels('myInput', ['lblDesc1', 'lblDesc2', 'lblDesc3', 'lblDesc4']);
    await btn.click();
    await testInputAriaLabelMatchesLabels('myInput', ['lblDesc1', 'lblDesc4']);
  });

  it('Input accessibleNameRef Tests', async () => {
    const btnChangeDesc1 = await browser.$('#btnChange2'); //Change Desc lblEnterName1
    const btnChangeDesc2 = await browser.$('#btnChange22'); //Change Desc lblEnterName2
    const btnSwap = await browser.$('#btnChange3'); // Swap Accessible Name Ref 1 and 2
    const btnRemove = await browser.$('#btnChange35'); // Remove lblEnterName3 from accessible-name-ref

    await testInputAriaLabelMatchesLabels('inputEnterName', ['lblEnterName1', 'lblEnterName3']);
    await btnChangeDesc1.click();
    await testInputAriaLabelMatchesLabels('inputEnterName', ['lblEnterName1', 'lblEnterName3']);
    await btnSwap.click();
    await btnChangeDesc2.click();
    await testInputAriaLabelMatchesLabels('inputEnterName', ['lblEnterName2', 'lblEnterName3']);
    await btnRemove.click();
    await testInputAriaLabelMatchesLabels('inputEnterName', ['lblEnterName2']);
  });

  it('Input accessibleName and accessibleNameRef Tests', async () => {
    const toggleAccessibleName = await browser.$('#btnChange4'); // Toggle AccessibleName Value
    const addRemoveAccessibleName = await browser.$('#btnChange5'); // Add/Remove AccessibleName Attribute
    const addRemoveAccessibleNameRef = await browser.$('#btnChange6'); // Add/Remove Accessible Name Ref
    const removeLabelForAttr = await browser.$('#btnChange65'); // Removes the for-attribute for the associated label

    await testInputAriaLabelMatchesAccessibleName('inputEnterDesc');
    await toggleAccessibleName.click(); // toggle the accessible-name
    await testInputAriaLabelMatchesAccessibleName('inputEnterDesc');
    await addRemoveAccessibleName.click(); // remove accessible name
    await testInputAriaLabelMatchesLabels('inputEnterDesc', ['lblEnterDesc1']);
    await addRemoveAccessibleNameRef.click(); // add accessible-name-ref
    await testInputAriaLabelMatchesLabels('inputEnterDesc', ['lblEnterDesc3']);
    await addRemoveAccessibleName.click(); // add accessible-name
    await testInputAriaLabelMatchesLabels('inputEnterDesc', ['lblEnterDesc3']);
    await addRemoveAccessibleNameRef.click(); // remove accessible-name-ref
    await testInputAriaLabelMatchesAccessibleName('inputEnterDesc');
    await addRemoveAccessibleName.click(); // remove accessible-name
    await testInputAriaLabelMatchesLabels('inputEnterDesc', ['lblEnterDesc1']);
    await removeLabelForAttr.click(); // remove label-for from DOM
    await testInputAriaLabelIsUndefined('inputEnterDesc');
  });

  it('Three inputs with same label accessibleNameRef Tests', async () => {
    const addRemoveForAttribute = await browser.$('#btnChange71'); // Add/Remove For Attribute On Label
    const removeAccessibleNameRef2 = await browser.$('#btnChange72'); // Remove AccessibleNameRef Attribute For Input 2
    const removeAccessibleNameRef3 = await browser.$('#btnChange73'); // Remove AccessibleNameRef Attribute For Input 3
    const btnChangeDesc = await browser.$('#btnChange74'); // Change Description

    await testInputAriaLabelMatchesLabels('testInput1', ['lblTestDesc']);
    await testInputAriaLabelMatchesLabels('testInput2', ['lblTestDesc']);
    await testInputAriaLabelMatchesLabels('testInput3', ['lblTestDesc']);

    await btnChangeDesc.click();
    await testInputAriaLabelMatchesLabels('testInput1', ['lblTestDesc']);
    await testInputAriaLabelMatchesLabels('testInput2', ['lblTestDesc']);
    await testInputAriaLabelMatchesLabels('testInput3', ['lblTestDesc']);

    await addRemoveForAttribute.click();
    await testInputAriaLabelIsUndefined('testInput1');
    await testInputAriaLabelMatchesLabels('testInput2', ['lblTestDesc']);
    await testInputAriaLabelMatchesLabels('testInput3', ['lblTestDesc']);

    await removeAccessibleNameRef2.click();
    await testInputAriaLabelIsUndefined('testInput1');
    await testInputAriaLabelMatchesAccessibleName('testInput2');
    await testInputAriaLabelMatchesLabels('testInput3', ['lblTestDesc']);

    await removeAccessibleNameRef3.click();
    await testInputAriaLabelIsUndefined('testInput1');
    await testInputAriaLabelMatchesAccessibleName('testInput2');
    await testInputAriaLabelIsUndefined('testInput3');
  });

  it('Tests generic html elements with for attribute', async () => {
    const btnChange8 = await browser.$('#btnChange8');
    await testInputAriaLabelMatchesLabels('myInput2', ['elId1', 'elId2', 'elId3', 'elId4', 'elId5']);
    await btnChange8.click();
    await testInputAriaLabelMatchesLabels('myInput2', ['elId1', 'elId4']);
  });
});
