import { assert } from "chai";

const isMacOS = process.platform === 'darwin';
const keyCtrlToPress = isMacOS ? 'Command' : 'Control';

describe("Value update", () => {
	before(async () => {
		await browser.url(`test/pages/TextArea.html`);
	});

	it("Should select all exceeded characters on paste", async () => {
		const textarea = await browser.$("#ta-exceeded-text");
		const textareaInner = await browser.$("#ta-exceeded-text").shadow$("textarea");

		// act
		await textareaInner.click();
		await browser.keys([keyCtrlToPress, "a"]);
		await browser.keys([keyCtrlToPress, "x"]);
		await browser.keys([keyCtrlToPress, "v"]);

		const selectionLength = await browser.execute(() =>{
			const textarea = document.getElementById("ta-exceeded-text").shadowRoot.querySelector("textarea");
			return textarea.selectionEnd - textarea.selectionStart;
		});

		const counter = await browser.$("#ta-exceeded-text").shadow$(".ui5-textarea-exceeded-text");
		const count = parseInt(await counter.getText());

		assert.strictEqual(count, selectionLength, "14 symbols should exceed");

		await browser.pause(10000);
	});
});
