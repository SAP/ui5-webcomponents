import Button from "@ui5/webcomponents/dist/Button.js";
import Timeline from "./Timeline.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";

export default function TimelineTemplate(this: Timeline) {
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
						{ this.growsWithButton && moreRow.call(this)}
						{ this.growsOnScroll && endRow.call(this)}
					</ul>
				</div>

		</div>
	);
}

function moreRow(this: Timeline) {
	return (
		<li class="ui5-timeline-list-item ui5-timeline-list-growing">
			<div class="ui5-tli-icon-outer">
				<Button icon={this.growingButtonIcon}
					id={`${this._id}-growingButton`}
					class={{
						"ui5-table-growing-row-inner": true,
						"ui5-table-growing-row-inner--active": this._loadMoreActive
					}}
					tabindex={0}
					onClick={this._onLoadMoreClick}
					onKeyDown={this._onLoadMoreKeydown}
					onKeyUp={this._onLoadMoreKeyup}
				></Button>
			</div>
			{this.loading &&
				<BusyIndicator
					delay={this.loadingDelay}
					class="ui5-list-growing-button-busy-indicator"
					active>
				</BusyIndicator>
	}
		</li>
	)
}

function endRow(this: Timeline) {
	return (
		<div tabindex={-1} aria-hidden="true" class="ui5-time-line-end-marker">
			<span tabindex={-1} aria-hidden="true" class="ui5-time-line-end-marker"></span>
		</div>
	)
}