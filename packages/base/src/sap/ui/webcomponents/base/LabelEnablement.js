const getElementToLabel = id => /* ControlRenderer.byId(id) || */ document.getElementById(id);

class LabelEnablement {
	static labelElement(labelFor) {
		const elementToLabel = getElementToLabel(labelFor);

		if (elementToLabel) {
			elementToLabel.focus();
		}
	}

	static getLabelableElementId(labelFor) {
		const elementToLabel = getElementToLabel(labelFor);

		if (elementToLabel) {
			return (elementToLabel.getLabelableElementId && elementToLabel.getLabelableElementId()) || labelFor;
		}

		return labelFor;
	}
}


export default LabelEnablement;
