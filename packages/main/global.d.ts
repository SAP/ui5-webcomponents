// eslint-disable-next-line
export {};

declare global {
	interface ElementInternals {
		states: Pick<Set<string>, "size" | "add" | "clear" | "delete" | "entries" | "forEach" | "has" | "keys" | "values">
	}
}
