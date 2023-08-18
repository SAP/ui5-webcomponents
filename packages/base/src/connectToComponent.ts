import type UI5Element from "./UI5Element.js";

const connections = new Map<HTMLElement, HTMLElement>();

type ConnectOptions = {
	component: UI5Element;
	to: HTMLElement | string | undefined;
	onConnect?: (connectedTo: HTMLElement) => void;
	onDisconnect?: (connectedTo: HTMLElement) => void;
}

const connectToComponent = (options: ConnectOptions): HTMLElement | undefined => {
	const component = options.component;
	const to = options.to;

	let connectedTo: HTMLElement | null;
	if (to === undefined) {
		connectedTo = null;
	} else if (to instanceof HTMLElement) {
		connectedTo = to;
	} else {
		connectedTo = (component.getRootNode() as Document).getElementById(to);
	}

	const prevConnectedTo = connections.get(component);

	// Not connected - return undefined
	if (!connectedTo) {
		if (prevConnectedTo) { // but first disconnect, if needed
			options.onDisconnect && options.onDisconnect(prevConnectedTo);
			connections.delete(component);
		}
		return;
	}

	// Connected - either for the first time, or to something else
	if (prevConnectedTo !== connectedTo) {
		if (prevConnectedTo) {
			options.onDisconnect && options.onDisconnect(prevConnectedTo);
			connections.delete(component);
		}
		options.onConnect && options.onConnect(connectedTo);
		connections.set(component, connectedTo);
	}

	return connections.get(component);
};

export default connectToComponent;
