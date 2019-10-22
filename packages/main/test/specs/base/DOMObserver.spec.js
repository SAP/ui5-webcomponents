const assert = require("chai").assert;

describe("DOMObserver", () => {
	browser.url("http://localhost:8080/test-resources/pages/base/DOMObserver.html");

	it("insertion order still fires DOMObserver", () => {

        // prepare the table
        browser.execute( () => {
            const table = document.createElement("ui5-table");
            const col1 = document.createElement("ui5-table-column");
            col1.slot = "columns";
            col1.appendChild(document.createTextNode("Column 1"));
            table.appendChild(col1);
            document.body.appendChild(table);
        });

        // execute
        browser.execute(() => {
            const table = document.querySelector("ui5-table");
            const row1 = document.createElement("ui5-table-row");
            // adding a row calls its connectedCallback, but there are async steps so the cell bellow should always trigger its mutationObserver
            table.appendChild(row1);

            // add the cell synchronously after the row's connectedCallback
            const cell1 = document.createElement("ui5-table-cell");
            cell1.appendChild(document.createTextNode("Cell 1"));
            row1.appendChild(cell1);
        })

        // assert
        const slots = browser.$("ui5-table-row").shadow$$("slot");
        // the cell should have triggered the DOM mutation observer and a slot should be rendered in the row
        assert.equal(slots.length, 1, "expected 1 slot in the ui5-table-row shadow DOM");
	});
});
