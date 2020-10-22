import Runtime from "./Runtime.js";

class RuntimeRegistry {
	constructor() {
		this.registry = [];
	}

	registerRuntime(VersionInfo) {
		const nextIndex = this.registry.length;
		this.registry.push(new Runtime(VersionInfo, nextIndex));
		return nextIndex;
	}

	getRuntime(index) {
		return this.registry[index];
	}

	getAllRuntimes() {
		return this.registry;
	}
}

export default RuntimeRegistry;
