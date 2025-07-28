import ExpandableText from "../ExpandableText.js";
import type ListItemGroupHeader from "../ListItemGroupHeader.js";
import type { ExpandableTextTemplateParams } from "../types/ExpandableTextTemplateParams.js";

/**
 * Provides a template for rendering text with the ExpandableText component
 * for ListItemGroupHeader header when wrappingType is set to "Normal".
 *
 * @param {object} injectedProps - The configuration options for the expandable text
 * @returns {JSX.Element} The rendered ExpandableText component
 */
export default function ListItemGroupHeaderExpandableTextTemplate(
	this: ListItemGroupHeader,
	injectedProps: ExpandableTextTemplateParams
): JSX.Element {
	const {
		className,
		text,
		maxCharacters,
		part
	} = injectedProps;

	return (
		<ExpandableText
			part={part}
			class={className}
			text={text}
			maxCharacters={maxCharacters}
		/>
	);
}
