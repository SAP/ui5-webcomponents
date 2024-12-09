import { isInstanceOfTable } from "../../src/TableUtils.js";
import Table from "../../src/Table.js";
import TableRow from "../../src/TableRow.js";

describe("#isInstanceOfTable", () => {
	it("object is Table", () => {
		const obj = new Table();
		// eslint-disable-next-line no-unused-expressions
		expect(isInstanceOfTable(obj)).to.be.true;
	});

	it("object is not Table", () => {
		const obj = new TableRow();
		// eslint-disable-next-line no-unused-expressions
		expect(isInstanceOfTable(obj)).to.be.false;
	});

	it("object is undefined", () => {
		const obj = undefined;
		// eslint-disable-next-line no-unused-expressions
		expect(isInstanceOfTable(obj)).to.be.false;
	});
});
