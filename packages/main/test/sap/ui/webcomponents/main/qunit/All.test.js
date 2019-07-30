const URLs = require("./test.pages");

function checkQUnit(page, url) {
	page
		.waitForSelector("#qunit-banner.qunit-pass, #qunit-banner.qunit-fail")
		.then(() => {
			const bannerClassList = page.$eval("#qunit-banner", element => element.classList);
			return bannerClassList;
		})
		.then((bannerClassList) => {
			if (bannerClassList[0] !== "qunit-pass") {
				const result = page.evaluate(x => {
					return Promise.resolve(QUnitReport);
				}, 7);
				const failed = result.filter(detail => detail.result === false);
				
				const report = failed.map(({module, name, message, actual, expected}, idx) => {
					return `\n${idx+1}. ${module}: ${name}\n  ${message}\n    Expected: ${expected}\n    Actual: ${actual}\n`
				}).join("\n");
				fail("QUnit failures found: " + report + "\n" + url);
			}
		})
}

describe('All Components', () => {

	for (const testName of URLs) {
		it(`${testName} should pass all qunit tests`, async () => {
			let url = `http://localhost:8080/test/sap/ui/webcomponents/main/qunit/runner.html?testName=${testName}`;
			await page.goto(url);
			await checkQUnit(page, url);
		});
	}

});