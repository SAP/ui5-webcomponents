import ExpandableText from "../ExpandableText.js";
import type ListItemStandard from "../ListItemStandard.js";
import type { ExpandableTextTemplateParams } from "../types/ExpandableTextTemplateParams.js";

/**
 * Provides a template for rendering text with the ExpandableText component
 * when wrappingType is set to "Normal".
 *
 * @param {object} options - The configuration options for the expandable text
 * @returns {JSX.Element} The rendered ExpandableText component
 */
export default function ListItemStandardExpandableTextTemplate(
	this: ListItemStandard,
	options: ExpandableTextTemplateParams
): JSX.Element {
	const {
		className,
		text,
		maxCharacters,
		part
	} = options;

	return (
		<ExpandableText
			part={part}
			class={className}
			text={text}
			maxCharacters={maxCharacters}
		/>
	);
}
