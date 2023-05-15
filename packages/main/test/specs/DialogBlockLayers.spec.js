import { assert } from "chai";

describe("Block layers", () => {
	before(async () => {
		await browser.url(`test/pages/Dialog.html`);
	});

	it("test dialog overlay when dialog isn't open", async () => {
		const isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialog");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.ok(isBlockLayerHidden, "the block layer is hidden");
	});

	it("test dialog overlay when dialog is open", async () => {
		await browser.$("#dialogOverDialogBtn").click();

		const isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialogOverDialog1");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.notOk(isBlockLayerHidden, "the block layer is visible");

		await browser.keys("Escape");
	});

	it("test dialog over dialog", async () => {
		await browser.$("#dialogOverDialogBtn").click();
		await browser.$("#dialogOverDialog1Btn").click();

		let isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialogOverDialog1");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.ok(isBlockLayerHidden, "the block layer is hidden");

		isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialogOverDialog2");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.notOk(isBlockLayerHidden, "the block layer is visible");

		await browser.keys("Escape");

		isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialogOverDialog1");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.notOk(isBlockLayerHidden, "the block layer is visible");

		await browser.keys("Escape");

		isBlockLayerHidden = await browser.executeAsync(async (done) => {
			const dialog = document.getElementById("dialogOverDialog1");
			const staticAreaItemDomRef = await dialog.getStaticAreaItemDomRef();

			done(staticAreaItemDomRef.querySelector(".ui5-block-layer").hasAttribute("hidden"));
		});

		assert.ok(isBlockLayerHidden, "the block layer is hidden");
	});
});