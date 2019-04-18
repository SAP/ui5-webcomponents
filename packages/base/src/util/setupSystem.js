import { getSystem } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";

const setupSystem = node => {
	const system = getSystem();
	const sysTypes = Object.entries(system.SYSTEMTYPE).map(([_key, value]) => value);

	node.classList.remove(...sysTypes);
	sysTypes.forEach(sysType => {
		if (system[sysType]) {
			node.classList.add(`sap-${sysType}`);
		}
	});
};

export default setupSystem;
