class RadioButtonGroup {
	static hasGroup(groupName) {
		return this.groups.has(groupName);
	}

	static getGroup(groupName) {
		return this.groups.get(groupName);
	}

	static getSelectedRadioFromGroup(groupName) {
		return this.selectedRadios.get(groupName);
	}

	static removeGroup(groupName) {
		this.selectedRadios.delete(groupName);
		return this.groups.delete(groupName);
	}

	static addToGroup(radioBtn, groupName) {
		if (this.hasGroup(groupName)) {
			this.enforceSingleSelection(radioBtn, groupName);
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
		const selectedRadio = this.getSelectedRadioFromGroup(groupName);

		// Remove the radio button from the given group
		group.forEach((_radioBtn, idx, arr) => {
			if (radioBtn._id === _radioBtn._id) {
				return arr.splice(idx, 1);
			}
		});

		if (selectedRadio === radioBtn) {
			this.selectedRadios.set(groupName, null);
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
		const selectedRadio = this.getSelectedRadioFromGroup(groupName);

		this._deselectRadio(selectedRadio);
		this._selectRadio(radioBtnToSelect);
		this.selectedRadios.set(groupName, radioBtnToSelect);
	}

	static _deselectRadio(radioBtn) {
		if (radioBtn) {
			radioBtn.selected = false;
		}
	}

	static _selectRadio(radioBtn) {
		if (radioBtn) {
			radioBtn.focus();
			radioBtn.selected = true;
			radioBtn._selected = true;
			radioBtn.fireEvent("select");
		}
	}

	static _nextSelectable(pos, group) {
		const groupLength = group.length;
		let nextRadioToSelect = null;

		if (pos === groupLength - 1) {
			if (group[0].disabled || group[0].readonly) {
				return this._nextSelectable(1, group);
			}
			nextRadioToSelect = group[0];
		} else if (group[pos + 1].disabled || group[pos + 1].readonly) {
			return this._nextSelectable(pos + 1, group);
		} else {
			nextRadioToSelect = group[pos + 1];
		}

		return nextRadioToSelect;
	}

	static _previousSelectable(pos, group) {
		const groupLength = group.length;
		let previousRadioToSelect = null;
		if (pos === 0) {
			if (group[groupLength - 1].disabled || group[groupLength - 1].readonly) {
				return this._previousSelectable(groupLength - 1, group);
			}
			previousRadioToSelect = group[groupLength - 1];
		} else if (group[pos - 1].disabled || group[pos - 1].readonly) {
			return this._previousSelectable(pos - 1, group);
		} else {
			previousRadioToSelect = group[pos - 1];
		}

		return previousRadioToSelect;
	}

	static enforceSingleSelection(radioBtn, groupName) {
		const selectedRadio = this.getSelectedRadioFromGroup(groupName);

		if (radioBtn.selected) {
			if (!selectedRadio) {
				this.selectedRadios.set(groupName, radioBtn);
			} else if (radioBtn !== selectedRadio) {
				this._deselectRadio(selectedRadio);
				this.selectedRadios.set(groupName, radioBtn);
			}
		} else if (radioBtn === selectedRadio) {
			this.selectedRadios.set(groupName, null);
		}
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
}

export default RadioButtonGroup;
