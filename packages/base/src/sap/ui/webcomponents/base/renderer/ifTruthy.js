import { PropertyPart, AttributePart, directive } from "lit-html";

/*
	lit-html directive that removes and attribute if it has a falsy value
*/
export default directive(value => part => {
	if (!value && part instanceof AttributePart && !(part instanceof PropertyPart)) {
		if (value !== part.value) {
			const name = part.committer.name;
			part.committer.element.removeAttribute(name);
		}
	} else {
		part.setValue(value);
	}
});
