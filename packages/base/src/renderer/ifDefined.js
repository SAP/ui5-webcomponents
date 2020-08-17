import {
	AttributePart,
	directive,
	noChange,
} from "lit-html/lit-html.js";

/*
	lit-html directive that removes and attribute if it is undefined
*/
export default directive(value => part => {
	if ((value === undefined) && part instanceof AttributePart) {
		if (value !== part.value) {
			const name = part.committer.name;
			part.committer.element.removeAttribute(name);
		}
	} else if (part.committer && part.committer.element && part.committer.element.getAttribute(part.committer.name) === value) {
		part.setValue(noChange);
	} else {
		part.setValue(value);
	}
});
