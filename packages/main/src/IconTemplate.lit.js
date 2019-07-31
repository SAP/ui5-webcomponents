import ifDefined from "@ui5/webcomponents-base/dist/renderer/ifDefined.js";
import { html, svg } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

const mainBlock = context => {
	return html`<svg
		class="ui5-icon-root"	
		dir="${ifDefined(context.dir)}"	
		viewBox="0 0 512 512"	
		role="img"	
		preserveAspectRatio="xMidYMid meet"	
		xmlns="http://www.w3.org/2000/svg"
	>    
		${svgBlock(context)};
	</svg>`;
};

const svgBlock = context => {
	return svg`
		${context.title ? svgBlockTitle(context) : undefined}
		<g role="presentation" aria-hidden="true">
			<path transform="translate(0, 512) scale(1, -1)" 
				d=${ifDefined(context.d)} 
			/>
		</g>
	`;
};

const svgBlockTitle = context => {
	return svg`<title>${ifDefined(context.title)}</title>`;
};

export default mainBlock;
