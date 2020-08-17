function Visitor() {
	this.parents = [];
	this.paths = [];
}

Visitor.prototype = {
	constructor: Visitor,
	mutating: true,

	// Visits a given value. If mutating, will replace the value if necessary.
	acceptKey: function(node, name) {
		this.paths.push(name);
		let value = this.accept(node[name]);
		if (this.mutating) {
			// Hacky sanity check: This may have a few false positives for type for the helper
			// methods but will generally do the right thing without a lot of overhead.
			if (value && !Visitor.prototype[value.type]) {
				throw new Error("Unexpected node type \"" + value.type + "\" found when accepting " + name + " on " + node.type);
			}
			node[name] = value;
		}
		this.paths.pop();
	},

	// Performs an accept operation with added sanity check to ensure
	// required keys are not removed.
	acceptRequired: function(node, name) {
		this.acceptKey(node, name);

		if (!node[name]) {
			throw new Error(node.type + " requires " + name);
		}
	},

	// Traverses a given array. If mutating, empty respnses will be removed
	// for child elements.
	acceptArray: function(array) {
		for (let i = 0, l = array.length; i < l; i++) {
			this.acceptKey(array, i);

			if (!array[i]) {
				array.splice(i, 1);
				i--;
				l--;
			}
		}
	},

	accept: function(object) {
		if (!object) {
			return;
		}

		/* istanbul ignore next: Sanity code */
		if (!this[object.type]) {
			throw new Error("Unknown type: " + object.type, object);
		}

		if (this.current) {
			this.parents.unshift(this.current);
		}
		this.current = object;

		let ret = this[object.type](object);

		this.current = this.parents.shift();

		if (!this.mutating || ret) {
			return ret;
		} else if (ret !== false) {
			return object;
		}
	},

	Program: function(program) {
		this.paths.push("body");
		this.acceptArray(program.body);
		this.paths.pop();
	},

	MustacheStatement: visitSubExpression,
	Decorator: visitSubExpression,

	BlockStatement: visitBlock,
	DecoratorBlock: visitBlock,

	PartialStatement: visitPartial,
	PartialBlockStatement: function(partial) {
		visitPartial.call(this, partial);

		this.acceptKey(partial, "program");
	},

	ContentStatement: function(/* content */) {},
	CommentStatement: function(/* comment */) {},

	SubExpression: visitSubExpression,

	PathExpression: function(/* path */) {},

	StringLiteral: function(/* string */) {},
	NumberLiteral: function(/* number */) {},
	BooleanLiteral: function(/* bool */) {},
	UndefinedLiteral: function(/* literal */) {},
	NullLiteral: function(/* literal */) {},

	Hash: function(hash) {
		this.paths.push("pairs");
		this.acceptArray(hash.pairs);
		this.paths.pop();
	},
	HashPair: function(pair) {
		this.acceptRequired(pair, "value");
	}
};

function visitSubExpression(mustache) {
	this.acceptRequired(mustache, "path");
	this.paths.push("params");
	this.acceptArray(mustache.params);
	this.paths.pop();
	this.acceptKey(mustache, "hash");
}
function visitBlock(block) {
	visitSubExpression.call(this, block);

	this.acceptKey(block, "program");
	this.acceptKey(block, "inverse");
}
function visitPartial(partial) {
	this.acceptRequired(partial, "name");
	this.paths.push("params");
	this.acceptArray(partial.params);
	this.paths.pop();
	this.acceptKey(partial, "hash");
}

////////////

function PartialsVisitor() {
	this.partialDefinitions = {};
	this.partials = [];
}

PartialsVisitor.prototype = new Visitor();

PartialsVisitor.prototype.PartialStatement = function(node) {
	this.partials.push({
		nodes: this.paths.slice(0),
		name: node.name.original
	});
	Visitor.prototype.PartialStatement.call(this, node);
};

PartialsVisitor.prototype.DecoratorBlock = function(node) {
	if (node.path.original === "ui5.inline" || node.path.original === "inline") {
		let name = node.params[0].original;
		this.partialDefinitions[name] = Object.assign({}, node);
	}

	Visitor.prototype.DecoratorBlock.call(this, node);

	return false;
};

PartialsVisitor.prototype.collect = function(node) {
	return Visitor.prototype.accept(node);
};

PartialsVisitor.prototype.modify = function(node) {
	for (let i = this.partials.length - 1; i >= 0; i--) {
		let partial = this.partials[i];
		let parentNode = node;

		//find the parent node - it's always inside the body of some Program node
		while (partial.nodes.length > 1) {
			parentNode = parentNode[partial.nodes.shift()];
		}

		let nodeName = partial.nodes.shift();
		if (Array.isArray(parentNode) && typeof (nodeName) === "number") {
			parentNode.splice(nodeName, 1, ...this.partialDefinitions[partial.name].program.body);
		}
	}
};

module.exports = PartialsVisitor;