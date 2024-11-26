import type DynamicSideContent from "./DynamicSideContent.js";
import clsx from "clsx";

export default function (this: DynamicSideContent) {
	return (
		<div
			class="ui5-dsc-root"
			style={this.styles.root}
		>
			{this._isSideContentFirst ?
				<>
					{ sideContent.call(this) }
					{ mainContent.call(this) }
				</>
			:
				<>
					{ mainContent.call(this) }
					{ sideContent.call(this) }
				</>
			}
		</div>
	);
};

function mainContent(this: DynamicSideContent) {
	return (
		<div
			class={clsx(this.classes.main)}
			style={this.styles.main}
		>
			<slot></slot>
	</div>
	)
};

function sideContent(this: DynamicSideContent) {
	return (
		<aside
			role="complementary"
			aria-label={this.accInfo.label}
			class={clsx(this.classes.side)}
			style={this.styles.side}
		>
			<slot name="sideContent"></slot>
		</aside>
	)
};
