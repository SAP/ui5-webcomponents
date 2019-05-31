const Handlebars = require("handlebars/dist/handlebars.min.js");
const path = require("path");
const Visitor = Handlebars.Visitor;

function HTMLLitVisitor(debug) {
	this.blockCounter = 0;
	this.keys = [];
	this.blocks = {};
	this.result = "";
	this.mainBlock = "";
	this.blockPath = "context";
	this.blockParameters = ["context"];
	this.paths = []; //contains all normalized relative paths
	this.debug = debug;
	if (this.debug) {
		this.blockByNumber = [];
	}
}

HTMLLitVisitor.prototype = new Visitor();

HTMLLitVisitor.prototype.Program = function(program) {
	let key = `block${this.blockCounter++}`;

	this.keys.push(key);
	this.debug && this.blockByNumber.push(key);

	this.blocks[this.currentKey()] = "const " + this.currentKey() + " = (" + this.blockParameters.join(", ") + ") => { return ";

	if (this.keys.length > 1) { //it's a nested block
		this.blocks[this.prevKey()] += this.currentKey() + "(" + this.blockParameters.join(", ") + ")";
	} else {
		this.mainBlock = this.currentKey();
		this.paths.push(this.blockPath);
	}

	this.blocks[this.currentKey()] += "html`";
	Visitor.prototype.Program.call(this, program);
	this.blocks[this.currentKey()] += "`; };";

	this.keys.pop(key);
};

HTMLLitVisitor.prototype.ContentStatement = function(content) {
	Visitor.prototype.ContentStatement.call(this, content);
	// let content = content.orgiinal; // attribute="__ attribute = "__  attribute ="__

	this.blocks[this.currentKey()] += content.original;

};

HTMLLitVisitor.prototype.MustacheStatement = function(mustache) {
	Visitor.prototype.MustacheStatement.call(this, mustache);

	if (mustache.path.original === "@index") {
		this.blocks[this.currentKey()] += "${index}";
	} else {
		const path = normalizePath.call(this, mustache.path.original);
		const hasCalculatingClasses = path.includes("context.classes");
		const hasStylesCalculation = path.includes("context.styles");
		
		let parsedCode = "";

		if (hasCalculatingClasses) {
			parsedCode = `\${ifDefined(classMap(${path}))}`;
		} else if (hasStylesCalculation) {
			parsedCode = `\${ifDefined(styleMap(${path}))}`;
		} else {
			parsedCode = `\${ifDefined(${path})}`;
		}

		this.blocks[this.currentKey()] += parsedCode;
	}
};

HTMLLitVisitor.prototype.BlockStatement = function(block) {
	if (block.path.original === "if") {
		visitIfBlock.call(this, block);
	} else if (block.path.original === "unless") {
		visitUnlessBlock.call(this, block);
	} else if (block.path.original === "each") {
		visitEachBlock.call(this, block);
	}
};

HTMLLitVisitor.prototype.currentKey = function() {
	return this.keys[this.keys.length - 1];
};

HTMLLitVisitor.prototype.prevKey = function() {
	return this.keys[this.keys.length - 2];
};

function visitSubExpression(mustache) {
	this.acceptRequired(mustache, "path");
	this.acceptArray(mustache.params);
	this.acceptKey(mustache, "hash");
}

function visitIfBlock(block) {
	visitSubExpression.call(this, block);

	let params = normalizePath.call(this, block.params[0].original);
	this.blocks[this.currentKey()] += "${ " + params + " ? ";
	this.acceptKey(block, "program");
	this.blocks[this.currentKey()] += " : ";
	if (block.inverse) {
		this.acceptKey(block, "inverse");
	} else {
		this.blocks[this.currentKey()] += "undefined";
	}
	this.blocks[this.currentKey()] += " }";
}

function visitUnlessBlock(block) {
	visitSubExpression.call(this, block);

	let params = normalizePath.call(this, block.params[0].original);
	this.blocks[this.currentKey()] += "${ !" + params + " ? ";
	this.acceptKey(block, "program");
	this.blocks[this.currentKey()] += " : undefined }";
}

function visitEachBlock(block) {
	var bParamAdded = false;
	visitSubExpression.call(this, block);

	this.blocks[this.currentKey()] += "${ repeat(" + normalizePath.call(this, block.params[0].original) + ", undefined, (item, index) => ";
	this.paths.push(normalizePath.call(this, block.params[0].original));
	this.blockPath = "item";

	if (this.blockParameters.indexOf("item") === -1) {
		bParamAdded = true;
		this.blockParameters.unshift("index");
		this.blockParameters.unshift("item");
	}
	this.acceptKey(block, "program");
	if (bParamAdded) {
		this.blockParameters.shift("item");
		this.blockParameters.shift("index");
	}
	this.blockPath = "context";

	this.blocks[this.currentKey()] += ") }";
}

function normalizePath(sPath) {
	let result = replaceAll(replaceAll(replaceAll(sPath, ".this", ""), "this.", ""), "this", "");

	//read carefully - https://github.com/wycats/handlebars.js/issues/1028
	//kpdecker commented on May 20, 2015
	if (result.indexOf("../") === 0) {
		let absolutePath = replaceAll(this.paths[this.paths.length - 1], ".", "/") + "/" + result;
		result = replaceAll(path.normalize(absolutePath), path.sep, ".");
	} else {
		result = result ? replaceAll(this.blockPath + "/" + result, "/", ".") : this.blockPath;
	}
	return result;
}

function replaceAll(str, find, repl) {
	let sResult = str;
	while (sResult.indexOf(find) !== -1) {
		sResult = sResult.replace(find, repl);
	}
	return sResult;
}

module.exports = HTMLLitVisitor;
