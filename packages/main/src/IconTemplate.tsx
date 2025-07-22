import type Icon from "./Icon.js";

type LegacySVGTemplate = {
	strings: string[],
	values?: Array<string | LegacySVGTemplate>
}

export default function IconTemplate(this: Icon) {
	return (
		<svg
			class="ui5-icon-root"
			part="root"
			tabindex={this._tabIndex}
			dir={this._dir}
			viewBox={this.viewBox}
			role={this.effectiveAccessibleRole}
			focusable="false"
			preserveAspectRatio="xMidYMid meet"
			aria-label={this.effectiveAccessibleName}
			aria-hidden={this.effectiveAriaHidden}
			xmlns="http://www.w3.org/2000/svg"
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
		>
			{ this.hasIconTooltip &&
                <title id={`${this._id}-tooltip`} > {this.effectiveAccessibleName} </title>
			}

			<g role="presentation">
				{this.customSvg && svgTemplate.call(this, this.customSvg)}

				{this.pathData.map(path => (
					<path d={path}></path>
				))}
			</g>
		</svg>
	);
}

function svgTemplate(this: Icon, template: object | LegacySVGTemplate) {
	if ((template as LegacySVGTemplate).strings) {
		return <g dangerouslySetInnerHTML={{ __html: renderLegacySVGTemplate(this.customSvg as LegacySVGTemplate) ?? "" }}></g>;
	}
	return template;
}

// Renders legacy (lit) SVG template
function renderLegacySVGTemplate(customTemplate: LegacySVGTemplate): string {
	const { strings, values } = customTemplate;

	return strings.map((str: string, i: number) => {
		const value = values && values[i];
		
		if (typeof value === "string") {
			return str + value;
		}
	
		if (typeof value === "object" && value?.strings) {
			return str + renderLegacySVGTemplate(value);
		}

		return str;
	}).join("");
}
