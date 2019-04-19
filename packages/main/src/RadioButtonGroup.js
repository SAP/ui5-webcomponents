class RadioButtonGroup {
	static hasGroup(groupName) {
		return this.groups.has(groupName);
	}

	static getGroup(groupName) {
		return this.groups.get(groupName);
	}

	static removeGroup(groupName) {
		this.selectedRadios.delete(groupName);
		return this.groups.delete(groupName);
	}

	static addToGroup(radioBtn, groupName) {
		if (this.hasGroup(groupName)) {
			this._enforceSingleSelection(groupName, radioBtn);
			this.getGroup(groupName).push(radioBtn);
		} else {
			this.createGroup(radioBtn, groupName);
		}
	}

	static removeFromGroup(radioBtn, groupName) {
		if (!this.hasGroup(groupName)) {
			return;
		}

		const group = this.getGroup(groupName);
		const selectedRadio = this.selectedRadios.get(group);
	
		// Remove the radioBtn from the given group
		group.forEach((_radioBtn, idx, arr) => {
			if (radioBtn._id === _radioBtn._id) {
				return arr.splice(idx, 1);
			}
		});

		if (selectedRadio === radioBtn) {
			this.selectedRadios.set(group, null);
		}

		// Remove the group if it is empty
		if (!group.length) {
			this.removeGroup(groupName);
		}
	}

	static createGroup(radioBtn, groupName) {
		if (radioBtn.selected) {
			this.selectedRadios.set(groupName, radioBtn);
		}

		this.groups.set(groupName, [radioBtn]);
	}

	static selectNextItem(item, groupName) {
		const group = this.getGroup(groupName),
			groupLength = group.length,
			currentItemPosition = group.indexOf(item);

		if (groupLength <= 1) {
			return;
		}

		const nextItemToSelect = this._nextSelectable(currentItemPosition, group);

		this.updateSelectionInGroup(nextItemToSelect, groupName);
	}

	static selectPreviousItem(item, groupName) {
		const group = this.getGroup(groupName),
			groupLength = group.length,
			currentItemPosition = group.indexOf(item);

		if (groupLength <= 1) {
			return;
		}

		const previousItemToSelect = this._previousSelectable(currentItemPosition, group);

		this.updateSelectionInGroup(previousItemToSelect, groupName);
	}

	static selectItem(item, groupName) {
		this.updateSelectionInGroup(item, groupName);
	}

	static updateSelectionInGroup(radioBtnToSelect, groupName) {
		const group = this.getGroup(groupName);
		const selectedRadio = this.selectedRadios.get(groupName);

		this._deselectRadio(selectedRadio);
		this._selectRadio(radioBtnToSelect);
		this.selectedRadios.set(groupName, radioBtnToSelect);
		console.log(groupName + "dasdada" + this.selectedRadios.entries());
	}

	static get groups() {
		if (!this._groups) {
			this._groups = new Map();
		}
		return this._groups;
	}

	static get selectedRadios() {
		if (!this._selectedRadios) {
			this._selectedRadios = new Map();
		}
		return this._selectedRadios;
	}

	static _deselectRadio(radioBtn) {
		radioBtn.selected = false;
		// radioBtn.fireEvent("select"); to be discussed
	}

	static _selectRadio(radioBtn) {
		radioBtn.focus();
		radioBtn.selected = true;
		radioBtn._selected = true;
		radioBtn.fireEvent("select");
	}

	static _nextSelectable(pos, group) {
		const groupLength = group.length;
		let nextRadioToSelect = null;

		if (pos === groupLength - 1) {
			if (!group[0].disabled) {
				nextRadioToSelect = group[0];
			} else {
				return this._nextSelectable(0, group);
			}
		} else if (!group[++pos].disabled) {
			nextRadioToSelect = group[pos];
		} else {
			return this._nextSelectable(pos, group);
		}

		return nextRadioToSelect;
	}

	static _previousSelectable(pos, group) {
		const groupLength = group.length;
		let previousRadioToSelect = null;

		if (pos === 0) {
			if (!group[groupLength - 1].disabled) {
				previousRadioToSelect = group[groupLength - 1];
			} else {
				return this._previousSelectable(groupLength - 1, group);
			}
		} else if (!group[--pos].disabled) {
			previousRadioToSelect = group[pos];
		} else {
			return this._previousSelectable(pos, group);
		}

		return previousRadioToSelect;
	}

	static _enforceSingleSelection(group, radioBtn) {
		if (!radioBtn.selected) {
			return;
		}

		const selectedRadio = this.selectedRadios.get(group);

		if (!selectedRadio) {
			return;
		}

		this._deselectRadio(selectedRadio);
		this.selectedRadios.set(group, radioBtn);
	}
}

export default RadioButtonGroup;
