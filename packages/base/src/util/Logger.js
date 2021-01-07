class Logger {
	constructor(initialMsg = "") {
		this.clear();
		this.append(initialMsg);
	}

	clear() {
		this.output = "";
	}

	append(msg) {
		this.output = `${this.output}${msg}`;
		return this;
	}

	line(msg) {
		this.append(`\n${msg}`);
		return this;
	}

	para(msg) {
		this.append(`\n\n${msg}`);
		return this;
	}

	getOutput() {
		return this.output;
	}

	 console(method = "log") {
		console[method](this.output); // eslint-disable-line
		this.clear();
	}
}

export default Logger;
