import type Tab from "./Tab.js";
import Icon from "./Icon.js";
import ListItemCustom from "./ListItemCustom.js";

export default function (this: Tab) {
	return (
		<ListItemCustom
			id={`${this._id}-li`}
			class={this.overflowClasses}
			style={this._forcedStyleInOverflow}
			type={this.overflowState}
			disabled={this.effectiveDisabled}
			selected={this.selected}
			movable={this.movable}
			ref={this.captureRef}
		>
			<div class="ui5-tab-overflow-itemContent-wrapper">
				<div class="ui5-tab-overflow-itemContent">
					{this.semanticIconName && (
						<Icon
							class={this.semanticIconClasses}
							name={this.semanticIconName}
						></Icon>
					)}
					{this.icon && (
						<Icon name={this.icon}></Icon>
					)}
					{this.text}
					{this.additionalText && (<>
						&nbsp;({this.additionalText})
					</>)}
					{this._designDescription && (
						<div id={`${this._id}-designDescription`} class="ui5-hidden-text">
							{this._designDescription}
						</div>
					)}
				</div>
			</div>
		</ListItemCustom>
	);
}
