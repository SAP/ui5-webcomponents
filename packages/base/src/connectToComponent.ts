import type UI5Element from "./UI5Element.js";

const connections = new Map<string, HTMLElement>();

type ConnectOptions = {
	host: UI5Element;
	propName: string;
	onConnect?: (friend: HTMLElement) => void;
	onDisconnect?: (friend: HTMLElement) => void;
}

const connectToComponent = (options: ConnectOptions): HTMLElement | undefined => {
	const host = options.host;
	const propName = options.propName;
	const friend = host[propName as keyof typeof host] as HTMLElement | string | undefined;

	let connectedTo: HTMLElement | null;
	if (friend === undefined) {
		connectedTo = null;
	} else if (friend instanceof HTMLElement) {
		connectedTo = friend;
	} else {
		connectedTo = (host.getRootNode() as Document).getElementById(friend);
	}

	const key = `${host._id}-${propName}`;
	const prevConnectedTo = connections.get(key);

	// Not connected - return undefined
	if (!connectedTo) {
		if (prevConnectedTo) { // but first disconnect, if needed
			options.onDisconnect && options.onDisconnect(prevConnectedTo);
			connections.delete(key);
		}
		return;
	}

	// Connected - either for the first time, or to something else
	if (prevConnectedTo !== connectedTo) {
		if (prevConnectedTo) {
			options.onDisconnect && options.onDisconnect(prevConnectedTo);
			connections.delete(key);
		}
		options.onConnect && options.onConnect(connectedTo);
		connections.set(key, connectedTo);
	}

	return connections.get(key);
};

export default connectToComponent;
