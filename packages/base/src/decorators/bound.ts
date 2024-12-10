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

			// if the property is already defined on the instance, then this call is a super call
			if (Object.hasOwnProperty.call(this, key)) {
				return fn;
			}

			let boundFn = fn.bind(this);

			Object.defineProperty(this, key, {
				configurable: true,
				get(): any {
					return boundFn;
				},
				set(value: any): void {
					// setting a value on the instance means they overwrite the default behaviour
					boundFn = value;
				},
			});
			return boundFn;
		},
		set(value: any): void {
			fn = value;
		},
	};
}
