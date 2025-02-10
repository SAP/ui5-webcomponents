import { isInstanceOfTable } from "../../src/TableUtils.js";
import Table from "../../src/Table.js";
import TableRow from "../../src/TableRow.js";

describe("#isInstanceOfTable", () => {
	it("object is Table", () => {
		const obj = new Table();
		cy.wrap({ isInstanceOfTable })
			.invoke("isInstanceOfTable", obj)
			.should("be.true");
	});

	it("object is not Table", () => {
		const obj = new TableRow();
		cy.wrap({ isInstanceOfTable })
			.invoke("isInstanceOfTable", obj)
			.should("be.false");
	});

	it("object is undefined", () => {
		const obj = undefined;
		cy.wrap({ isInstanceOfTable })
			.invoke("isInstanceOfTable", obj)
			.should("be.false");
	});
});
