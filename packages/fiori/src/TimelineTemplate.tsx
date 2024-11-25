import type Timeline from "./Timeline.js";

export default function (this: Timeline) {
	return (
		<div class="ui5-timeline-root"
			onFocusIn={this._onfocusin}
			onKeyDown={this._onkeydown}>

			<div class="ui5-timeline-scroll-container">
				<ul class="ui5-timeline-list" aria-live="polite" aria-label={this.ariaLabel}>
					{this.items.map(item =>
						<li class="ui5-timeline-list-item">
							<slot name={item._individualSlot}></slot>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};
