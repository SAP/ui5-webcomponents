export {};

declare global {
	// icons are generated in src/generated-tracked, but imported from dist
	// this maping works only in vite at dev time and the typescript compiler
	// cannot do the type checking
	// all icons that import the default export have to be added here
	module "*accept.js" {
		const name: string;
		export default name;
	}

	module "*actor.js" {
		const name: string;
		export default name;
	}

	module "*3d.js" {
		const name: string;
		export default name;
	}
}
