import Function from "./types/Function";

class State {
	constructor(control) {
		this._control = control;
		this._data = Object.assign({}, this.constructor._defaultState);
		this._data._id = control._id;
	}

	static generateAccessors(MetadataClass) {
		const proto = this.prototype;

		State.generateDefaultState(MetadataClass);

		const controlProperties = MetadataClass.getProperties();

		Object.defineProperty(proto, "_id", {
			get() {
				return this._data._id;
			},

			set() {
				throw new Error("_id should not be set by the control developer");
			},
		});

		for (const [prop, propData] of Object.entries(controlProperties)) { // eslint-disable-line
			Object.defineProperty(proto, prop, {
				get() {
					if (typeof this._data[prop] !== "undefined") {
						return this._data[prop];
					}
					if (propData.type === "boolean") {
						return false;
					} else if (propData.multiple) { // eslint-disable-line
						return [];
					} else {
						return propData.defaultValue;
					}
				},
				set(value) {
					let isDifferent = false;
					value = MetadataClass.constructor.validatePropertyValue(value, propData);

					const oldState = this._data[prop];

					if (propData.deepEqual) {
						isDifferent = JSON.stringify(oldState) !== JSON.stringify(value);
					} else {
						isDifferent = oldState !== value;
					}

					if (isDifferent) {
						this._data[prop] = value;
						if (propData.nonVisual || propData.type === Function) {
							return;
						}
						this._control._invalidate(prop, value);
						this._control._propertyChange(prop, value);
					}
				},
			});
		}

		const slots = MetadataClass.getSlots();
		for (const [slot, slotData] of Object.entries(slots)) { // eslint-disable-line
			Object.defineProperty(proto, slot, {
				get() {
					if (typeof this._data[slot] !== "undefined") {
						return this._data[slot];
					}
					if (slotData.multiple) {
						return [];
					}
					return null;
				},
				set(value) {
					value = MetadataClass.constructor.validateSlotValue(value, slotData);
					if (this._data[slot] === value) {
						return;
					}

					const oldState = this._data[slot];

					if (Array.isArray(oldState)) {
						// If old state of the control is array and if the items in the array
						// are ui5 web components than detach the child property updated listener
						oldState.forEach(el => {
							if (el && el._attachChildPropertyUpdated) {
								this._control._detachChildPropertyUpdated(el);
							}
						});
					} else if (oldState && oldState._attachChildPropertyUpdated) {
						// If old state is a ui5 web component than detach the child property updated listener
						this._control._detachChildPropertyUpdated(oldState);
					}

					if (oldState !== value) {
						this._data[slot] = value;

						if (Array.isArray(value)) {
							// If new state of the control is array and if the items in the array
							// are ui5 web components than attach the child property updated listener
							value.forEach(el => {
								if (el && el._attachChildPropertyUpdated) {
									this._control._attachChildPropertyUpdated(el, slotData);
								}
							});
						} else if (value && value._attachChildPropertyUpdated) {
							// If new state is a ui5 web component than detach the child property updated listener
							this._control._attachChildPropertyUpdated(value, slotData);
						}

						this._control._invalidate(slot, value);
					}
				},
			});
		}

		Object.defineProperty(proto, "_nodeText", {
			get() {
				return this._data._nodeText;
			},
			set(value) {
				this._data._nodeText = value;
				this._control._invalidate("_nodeText", value);
			},
		});
	}

	static generateDefaultState(MetadataClass) {
		const defaultState = {};

		// Initialize properties
		const props = MetadataClass.getProperties();
		for (const propName in props) { // eslint-disable-line
			if (props[propName].type === "boolean") {
				defaultState[propName] = false;
			} else if (props[propName].multiple) {
				defaultState[propName] = [];
			} else if (props[propName].type === Object) {
				defaultState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : {};
			} else {
				defaultState[propName] = props[propName].defaultValue;
			}
		}

		// Initialize slots
		const slots = MetadataClass.getSlots();
		for (const slotName in slots) { // eslint-disable-line
			if (slots[slotName].multiple) {
				defaultState[slotName] = [];
			} else {
				defaultState[slotName] = null;
			}
		}

		this._defaultState = defaultState;
	}
}

export default State;
