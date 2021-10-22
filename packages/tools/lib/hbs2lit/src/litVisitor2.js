const Handlebars = require("handlebars/dist/handlebars.min.js");
const path = require("path");
const Visitor = Handlebars.Visitor;

// skip ifDefined for event handlers and boolean attrs
let skipIfDefined = false;

// when true => an HTML node value, when false => an attribute value
let isNodeValue = false;

// when true => the current attribute is "style"
let isStyleAttribute = false;

// matches event handlers @click= and boolean attrs ?disabled=
const dynamicAttributeRgx = /\s(\?|@)([a-zA-Z|-]+)="?\s*$/;

if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr){

		// If a regex pattern
		if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
			return this.replace(str, newStr);
		}

		// If a string
		return this.replace(new RegExp(str, 'g'), newStr);

	};
}

function HTMLLitVisitor(debug) {
	this.blockCounter = 0;
	this.keys = [];
	this.blocks = {};
	this.result = "";
	this.mainBlock = "";
	this.blockPath = "context";
	this.blockParameters = ["context", "tags", "suffix"];
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

	this.blocks[this.currentKey()] = "const " + this.currentKey() + " = (" + this.blockParameters.join(", ") + ") => ";

	if (this.keys.length > 1) { //it's a nested block
		this.blocks[this.prevKey()] += this.currentKey() + "(" + this.blockParameters.join(", ") + ")";
	} else {
		this.mainBlock = this.currentKey();
		this.paths.push(this.blockPath);
	}

	this.blocks[this.currentKey()] += "html`";
	Visitor.prototype.Program.call(this, program);
	this.blocks[this.currentKey()] += "`;";

	this.keys.pop(key);
};

HTMLLitVisitor.prototype.ContentStatement = function(content) {
	Visitor.prototype.ContentStatement.call(this, content);
	// let content = content.orgiinal; // attribute="__ attribute = "__  attribute ="__

	let contentStatement = content.original;
	skipIfDefined = !!dynamicAttributeRgx.exec(contentStatement);

	const closingIndex = contentStatement.lastIndexOf(">");
	const openingIndex = contentStatement.lastIndexOf("<");
	if (closingIndex !== -1 || openingIndex !== -1) { // Only change isNodeValue whenever < or > is found in the content statement
		isNodeValue = closingIndex > openingIndex;
	}

	isStyleAttribute = !isNodeValue && contentStatement.match(/style *= *["']? *$/);

	if (!isStyleAttribute && contentStatement.match(/style=/)) {
		console.log("WARNING: style hard-coded", contentStatement);
	}

	// Scope custom element tags
	contentStatement = contentStatement.replaceAll(/(<\/?\s*)([a-zA-Z0-9_]+-[a-zA-Z0-9_-]+)/g, "$1\${scopeTag(\"$2\", tags, suffix)}");

	this.blocks[this.currentKey()] += contentStatement;
};

HTMLLitVisitor.prototype.MustacheStatement = function(mustache) {
	Visitor.prototype.MustacheStatement.call(this, mustache);

	if (mustache.path.original === "@index") {
		this.blocks[this.currentKey()] += "${index}";
	} else {
		const path = normalizePath.call(this, mustache.path.original);
		const hasCalculatingClasses = path.includes("context.classes");

		let parsedCode = "";

		if (isNodeValue && !mustache.escaped) {
			parsedCode = `\${unsafeHTML(${path})}`;
		} else if (hasCalculatingClasses) {
			parsedCode = `\${classMap(${path})}`;
		} else if (isStyleAttribute) {
			parsedCode = `\${styleMap(${path})}`;
		} else if (skipIfDefined){
			parsedCode = `\${${path}}`;
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

	this.blocks[this.currentKey()] += "${ repeat(" + normalizePath.call(this, block.params[0].original) + ", (item, index) => item._id || index, (item, index) => ";
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
