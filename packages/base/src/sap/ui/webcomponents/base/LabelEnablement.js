const getElementToLabel = (id) => /*ControlRenderer.byId(id) ||*/ document.getElementById(id);

class LabelEnablement {

	static labelElement(labelFor) {
		let elementToLabel = getElementToLabel(labelFor);

		if (elementToLabel) {
			elementToLabel.focus();
		}
	}

	static getLabelableElementId(labelFor) {
		let elementToLabel = getElementToLabel(labelFor);

		if (elementToLabel) {
			return (elementToLabel.getLabelableElementId && elementToLabel.getLabelableElementId()) || labelFor;
		}

		return labelFor;
	}
}


export default LabelEnablement;