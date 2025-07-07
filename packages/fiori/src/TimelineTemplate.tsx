import Button from "@ui5/webcomponents/dist/Button.js";
import type Timeline from "./Timeline.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";

export default function TimelineTemplate(this: Timeline) {
	const hasGroupItems = this.items.some(item => item.isGroupItem);

	// Determine roles based on content structure
	const listRole: "list" | "tree" = hasGroupItems ? "tree" : "list";
	const itemRole: "listitem" | "treeitem" = hasGroupItems ? "treeitem" : "listitem";

	return (
		<div class="ui5-timeline-root"
			role="region"
			aria-label="Timeline"
			onFocusIn={this._onfocusin}
			onKeyDown={this._onkeydown}
		>
			<BusyIndicator
				id={`${this._id}-busyIndicator`}
				delay={this.loadingDelay}
				active={this.showBusyIndicatorOverlay}
				class="ui5-timeline-busy-indicator"
			>
				<div class="ui5-timeline-scroll-container">

					<div class="ui5-timeline-list"
						role={listRole}
						aria-live="polite"
						aria-label={this.ariaLabel}
					>
						{this.items.map(item =>
							<div class="ui5-timeline-list-item">
								<slot name={item._individualSlot}></slot>
							</div>
						)}
						{ this.growsWithButton && moreRow.call(this) }
						{ this.growsOnScroll && endRow.call(this) }
					</div>
				</div>
			</BusyIndicator>
		</div>
	);
}

function moreRow(this: Timeline) {
	return (
		<li class="ui5-timeline-list-item ui5-timeline-list-growing">
			<div class="ui5-tli-icon-outer">
				<Button icon={this.growingButtonIcon}
					id={"ui5-timeline-growing-btn"}
					class={{
						"ui5-timeline-growing-row-inner": true,
						"ui5-timeline-growing-row-inner--active": this._loadMoreActive
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
					class="ui5-timeline-growing-button-busy-indicator"
					active>
				</BusyIndicator>
			}
		</li>
	);
}

function endRow(this: Timeline) {
	return (
		<div tabindex={-1} aria-hidden="true" class="ui5-timeline-end-marker">
			<span tabindex={-1} aria-hidden="true" class="ui5-timeline-end-marker"></span>
		</div>
	);
}
