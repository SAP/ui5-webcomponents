const reserve = require("portreserver");
const colors = require("colors/safe");
const fs = require("fs");

reserve(8080, 2, (main, fiori) => {
	fs.writeFileSync("packages/main/.port", `${main}`);
	console.log(colors.blue(`Reserved port ${colors.bold(main)} for the ${colors.bold("main")} package`));

	fs.writeFileSync("packages/fiori/.port", `${fiori}`);
	console.log(colors.yellow(`Reserved port ${colors.bold(fiori)} for the ${colors.bold("fiori")} package`));
});
