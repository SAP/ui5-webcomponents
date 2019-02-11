class RadioButtonGroup {
	static hasGroup(groupName) {
		return this.groups.has(groupName);
	}

	static getGroup(groupName) {
		return this.groups.get(groupName);
	}

	static removeGroup(groupName) {
		return this.groups.delete(groupName);
	}

	static addToGroup(control, groupName) {
		if (this.hasGroup(groupName)) {
			this.getGroup(groupName).push(control);
		} else {
			this.createGroup(control, groupName);
		}
	}

	static removeFromGroup(control, groupName) {
		if (!this.hasGroup(groupName)) {
			return;
		}

		const group = this.getGroup(groupName);

		// Remove the control from the given group
		group.forEach((_control, idx, arr) => {
			if (control._id === _control._id) {
				return arr.splice(idx, 1);
			}
		});

		// Remove the group if it is empty
		if (!group.length) {
			this.removeGroup(groupName);
		}
	}

	static createGroup(control, groupName) {
		if (!this.hasGroup(groupName)) {
			this.groups.set(groupName, [control]);
		}
	}

	static selectNextItem(item, groupName) {
		const group = this.getGroup(groupName),
			groupLength = group.length,
			currentItemPosition = group.indexOf(item);

		if (groupLength <= 1) {
			return;
		}

		const nextItemToSelect = this._nextSelectable(currentItemPosition, group);

		// de-select all the rest
		group.forEach(radio => {
			if (radio._id !== nextItemToSelect._id) {
				radio.selected = false;
				radio.fireEvent("select", { selected: radio.selected });
			}
		});

		// select the next item
		this._selectItem(nextItemToSelect);
	}

	static selectPreviousItem(item, groupName) {
		const group = this.getGroup(groupName),
			groupLength = group.length,
			currentItemPosition = group.indexOf(item);

		if (groupLength <= 1) {
			return;
		}

		const previousItemToSelect = this._previousSelectable(currentItemPosition, group);

		// de-select all the rest
		group.forEach(radio => {
			if (radio._id !== previousItemToSelect._id) {
				radio.selected = false;
				radio.fireEvent("select", { selected: radio.selected });
			}
		});

		// select the next item
		this._selectItem(previousItemToSelect);
	}

	static selectItem(item, groupName) {
		const group = this.getGroup(groupName);

		// de-select all the rest
		group.forEach(radio => {
			if (radio._id !== item._id) {
				radio.selected = false;
				radio.fireEvent("select", { selected: radio.selected });
			}
		});

		this._selectItem(item);
	}

	static get groups() {
		if (!this._groups) {
			this._groups = new Map();
		}
		return this._groups;
	}

	static _selectItem(item) {
		item.focus();
		item.selected = true;
		item.fireEvent("select", { selected: item.selected });
	}

	static _nextSelectable(pos, group) {
		const groupLength = group.length;
		let nextItemToSelect = null;

		if (pos === groupLength - 1) {
			if (!group[0].disabled) {
				nextItemToSelect = group[0];
			} else {
				return this._nextSelectable(0, group);
			}
		} else if (!group[++pos].disabled) {
			nextItemToSelect = group[pos];
		} else {
			return this._nextSelectable(pos, group);
		}

		return nextItemToSelect;
	}

	static _previousSelectable(pos, group) {
		const groupLength = group.length;
		let previousSelectable = null;

		if (pos === 0) {
			if (!group[groupLength - 1].disabled) {
				previousSelectable = group[groupLength - 1];
			} else {
				return this._previousSelectable(groupLength - 1, group);
			}
		} else if (!group[--pos].disabled) {
			previousSelectable = group[pos];
		} else {
			return this._previousSelectable(pos, group);
		}

		return previousSelectable;
	}
}

export default RadioButtonGroup;
