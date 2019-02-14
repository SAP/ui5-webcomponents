import Device from "@ui5/webcomponents-core/dist/sap/ui/Device";

const setupSystem = (node) => {
	const sysTypes = Object.entries(Device.system.SYSTEMTYPE).map(([_key, value]) => value);

	node.classList.remove(...sysTypes);
	sysTypes.forEach(sysType => {
		if (Device.system[sysType]) {
			node.classList.add("sap-" + sysType);
		}
	});
};

export default setupSystem;
