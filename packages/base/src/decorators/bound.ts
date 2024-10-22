export default function bound(target: any, key: string | symbol, descriptor: any): any {
	if (!(typeof target[key] === "function")) {
		throw new Error(`@bound decorator can only be applied to methods, received ${String(key)}: ${typeof target[key]}`);
	}

	let fn = descriptor.value;
	return {
		configurable: true,
		get(): any {
			if (!(this instanceof target.constructor)) {
				return fn;
			}

			let boundFn: any;
			Object.defineProperty(this, key, {
				get(): any {
					if (boundFn) {
						return boundFn;
					}
					boundFn = fn.bind(this);
					return boundFn;
				},
				set(value: any): void {
					// setting a value on the instance means they overwrite the default behaviour
					boundFn = value;
				},
			});
		},
		set(value: any): void {
			fn = value;
		},
	};
}
