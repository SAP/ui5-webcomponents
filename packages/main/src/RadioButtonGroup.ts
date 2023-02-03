import type RadioButton from "./RadioButton.js";

class RadioButtonGroup {
	static _groups: Map<string, Array<RadioButton>>;
	static _checkedRadios: Map<string, RadioButton | null>;

	static hasGroup(groupName: string) {
		return this.groups.has(groupName);
	}

	static getGroup(groupName: string) {
		return this.groups.get(groupName);
	}

	static getCheckedRadioFromGroup(groupName: string) {
		return this.checkedRadios.get(groupName);
	}

	static removeGroup(groupName: string) {
		this.checkedRadios.delete(groupName);
		return this.groups.delete(groupName);
	}

	static addToGroup(radioBtn: RadioButton, groupName: string) {
		if (this.hasGroup(groupName)) {
			this.enforceSingleSelection(radioBtn, groupName);
			if (this.getGroup(groupName)) {
				this.getGroup(groupName)!.push(radioBtn);
			}
		} else {
			this.createGroup(radioBtn, groupName);
		}

		this.updateTabOrder(groupName);
	}

	static removeFromGroup(radioBtn: RadioButton, groupName: string) {
		const group = this.getGroup(groupName);

		if (!group) {
			return;
		}

		const checkedRadio = this.getCheckedRadioFromGroup(groupName);

		// Remove the radio button from the given group
		group.forEach((_radioBtn, idx, arr) => {
			if (radioBtn._id === _radioBtn._id) {
				return arr.splice(idx, 1);
			}
		});

		if (checkedRadio === radioBtn) {
			this.checkedRadios.set(groupName, null);
		}

		// Remove the group if it is empty
		if (!group.length) {
			this.removeGroup(groupName);
		}

		this.updateTabOrder(groupName);
	}

	static createGroup(radioBtn: RadioButton, groupName: string) {
		if (radioBtn.checked) {
			this.checkedRadios.set(groupName, radioBtn);
		}

		this.groups.set(groupName, [radioBtn]);
	}

	static selectNextItem(item: RadioButton, groupName: string) {
		const group = this.getGroup(groupName);
		if (!group) {
			return;
		}

		const groupLength = group.length,
			currentItemPosition = group.indexOf(item);

		if (groupLength <= 1) {
			return;
		}

		const nextItemToSelect = this._nextSelectable(currentItemPosition, group);
		if (!nextItemToSelect) {
			return;
		}

		this.updateSelectionInGroup(nextItemToSelect, groupName);
	}

	static updateTabOrder(groupName: string) {
		const group = this.getGroup(groupName);

		if (!group) {
			return;
		}

		const hasCheckedRadio = group.some(radioBtn => radioBtn.checked);

		group.filter(radioBtn => !radioBtn.disabled).forEach((radioBtn, idx) => {
			if (hasCheckedRadio) {
				radioBtn._tabIndex = radioBtn.checked ? "0" : "-1";
			} else {
				radioBtn._tabIndex = idx === 0 ? "0" : "-1";
			}
		});
	}

	static selectPreviousItem(item: RadioButton, groupName: string) {
		const group = this.getGroup(groupName);

		if (!group) {
			return;
		}

		const groupLength = group.length,
			currentItemPosition = group.indexOf(item);

		if (groupLength <= 1) {
			return;
		}

		const previousItemToSelect = this._previousSelectable(currentItemPosition, group);
		if (!previousItemToSelect) {
			return;
		}

		this.updateSelectionInGroup(previousItemToSelect, groupName);
	}

	static selectItem(item: RadioButton, groupName: string) {
		this.updateSelectionInGroup(item, groupName);
		this.updateTabOrder(groupName);
	}

	static updateSelectionInGroup(radioBtnToSelect: RadioButton, groupName: string) {
		const checkedRadio = this.getCheckedRadioFromGroup(groupName);

		if (checkedRadio) {
			this._deselectRadio(checkedRadio);
		}

		this._selectRadio(radioBtnToSelect);
		this.checkedRadios.set(groupName, radioBtnToSelect);
	}

	static _deselectRadio(radioBtn: RadioButton) {
		if (radioBtn) {
			radioBtn.checked = false;
		}
	}

	static _selectRadio(radioBtn: RadioButton) {
		if (radioBtn) {
			radioBtn.focus({ focusVisible: true } as FocusOptions);
			radioBtn.checked = true;
			radioBtn._checked = true;
			radioBtn.fireEvent("change");
		}
	}

	static _nextSelectable(pos: number, group: RadioButton[]): RadioButton | null {
		if (!group) {
			return null;
		}

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

	static _previousSelectable(pos: number, group: RadioButton[]): RadioButton | null {
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

	static enforceSingleSelection(radioBtn: RadioButton, groupName: string) {
		const checkedRadio = this.getCheckedRadioFromGroup(groupName);

		if (radioBtn.checked) {
			if (!checkedRadio) {
				this.checkedRadios.set(groupName, radioBtn);
			} else if (radioBtn !== checkedRadio) {
				this._deselectRadio(checkedRadio);
				this.checkedRadios.set(groupName, radioBtn);
			}
		} else if (radioBtn === checkedRadio) {
			this.checkedRadios.set(groupName, null);
		}

		this.updateTabOrder(groupName);
	}

	static get groups() {
		if (!this._groups) {
			this._groups = new Map();
		}
		return this._groups;
	}

	static get checkedRadios() {
		if (!this._checkedRadios) {
			this._checkedRadios = new Map();
		}
		return this._checkedRadios;
	}
}

export default RadioButtonGroup;
