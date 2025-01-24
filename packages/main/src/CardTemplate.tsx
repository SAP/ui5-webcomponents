import type Card from "./Card.js";
import BusyIndicator from "./BusyIndicator.js";

export default function CardTemplate(this: Card) {
	return (
		<div
			part="root"
			role="region"
			class={{
				"ui5-card-root": true,
				"ui5-card--interactive": this._hasHeader && this.header[0].interactive,
				"ui5-card--nocontent": !this.content.length,
			}}
			aria-label={this._getAriaLabel}
		>
			<BusyIndicator
				id={`${this._id}-busyIndicator`}
				delay={this.loadingDelay}
				active={this.loading}
				class="ui5-card-busy-indicator"
			>
				<div class="ui5-card-inner">
					{this._hasHeader &&
						<div class="ui5-card-header-root">
							<slot name="header"></slot>
						</div>
					}
					<div role="group" aria-label={this._ariaCardContentLabel} part="content">
						<slot></slot>
					</div>
				</div>
			</BusyIndicator>
		</div>
	);
}
