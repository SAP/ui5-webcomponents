import ifDefined from "@ui5/webcomponents-base/dist/renderer/ifDefined.js";
import { svg } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const mainBlock = context => {
	return svg`<svg
		class="ui5-icon-root"
		dir="${ifDefined(context.dir)}"
		viewBox="0 0 512 512"
		role="img"
		focusable="false"
		preserveAspectRatio="xMidYMid meet"
		aria-label="${ifDefined(context.accessibleNameText)}"
		xmlns="http://www.w3.org/2000/svg"
	>
		${context.hasIconTooltip
		? svg`<title id="${context._id}-tooltip">${context.accessibleNameText}</title>`
		: undefined}
		<g role="presentation">
			<path transform="translate(0, 512) scale(1, -1)"
				d=${ifDefined(context.pathData)}
			/>
		</g>
	</svg>`;
};

export default mainBlock;
