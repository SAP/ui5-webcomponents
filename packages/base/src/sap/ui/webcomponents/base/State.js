import Function from './types/Function';

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
			get: function () {
				return this._data._id;
			},

			set: function () {
				throw new Error("_id should not be set by the control developer");
			}
		});

		for (const [prop, propData] of Object.entries(controlProperties)) {
			Object.defineProperty(proto, prop, {
				get: function () {
					if (typeof this._data[prop] !== 'undefined') {
						return this._data[prop];
					}
					if (propData.type === 'boolean') {
						return false;
					} else if (propData.multiple) {
						return [];
					} else {
						return propData.defaultValue;
					}
				},
				set: function (value) {
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
				}
			});
		}

		const slots = MetadataClass.getSlots();
		for (const [slot, slotData] of Object.entries(slots)) {
			Object.defineProperty(proto, slot, {
				get: function () {
					if (typeof this._data[slot] !== 'undefined') {
						return this._data[slot];
					}
					if (slotData.multiple) {
						return [];
					}
					return null;
				},
				set: function (value) {
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
								this._control._detachChildPropertyUpdated(el)
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
									this._control._attachChildPropertyUpdated(el, slotData)
								}
							});
						} else if (value && value._attachChildPropertyUpdated) {
							// If new state is a ui5 web component than detach the child property updated listener
							this._control._attachChildPropertyUpdated(value, slotData);
						}

						this._control._invalidate(slot, value);
					}
				}
			});
		}

		Object.defineProperty(proto, "_nodeText", {
			get: function () {
				return this._data["_nodeText"];
			},
			set: function (value) {
				this._data["_nodeText"] = value;
				this._control._invalidate("_nodeText", value);
			}
		});
	}

	static generateDefaultState(MetadataClass) {

		let defaultState = {};

		// Initialize properties
		let props = MetadataClass.getProperties();
		for (const propName in props) {
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
		let slots = MetadataClass.getSlots();
		for (const slotName in slots) {
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
