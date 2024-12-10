import type Calendar from "./Calendar.js";
import Icon from "./Icon.js";

import slimArowLeft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import slimArowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

export default function CalendarTemplate(this: Calendar) {
	return (
		<div class="ui5-calheader-root">
			<div
				data-ui5-cal-header-btn-prev
				class={{
					"ui5-calheader-arrowbtn": true,
					"ui5-calheader-arrowbtn-disabled": this._previousButtonDisabled,
				}}
				role="button"
				onMouseDown={this.onPrevButtonClick}
				title={this.headerPreviousButtonText}
			>
				<Icon class="ui5-calheader-arrowicon" name={slimArowLeft}/>
			</div>

			<div class="ui5-calheader-midcontainer">
				<div
					data-ui5-cal-header-btn-month
					class="ui5-calheader-arrowbtn ui5-calheader-middlebtn"
					hidden={this._isHeaderMonthButtonHidden}
					tabindex={0}
					role="button"
					aria-label={this.accInfo.ariaLabelMonthButton}
					onClick={this.onHeaderShowMonthPress}
					onKeyDown={this.onMonthButtonKeyDown}
					onKeyUp={this.onMonthButtonKeyUp}
				>
					<span>{this._headerMonthButtonText}</span>
					{this.hasSecondaryCalendarType &&
						<span class="ui5-calheader-btn-sectext">{this.secondMonthButtonText}</span>
					}
				</div>

				<div
					data-ui5-cal-header-btn-year
					class="ui5-calheader-arrowbtn ui5-calheader-middlebtn"
					hidden={this._isHeaderYearButtonHidden}
					tabindex={0}
					role="button"
					onClick={this.onHeaderShowYearPress}
					onKeyDown={this.onYearButtonKeyDown}
					onKeyUp={this.onYearButtonKeyUp}
				>
					<span>{this._headerYearButtonText}</span>
					{this.hasSecondaryCalendarType &&
						<span class="ui5-calheader-btn-sectext">{this._headerYearButtonTextSecType}</span>
					}
				</div>
			</div>

			<div
				data-ui5-cal-header-btn-next
				class={{
					"ui5-calheader-arrowbtn": true,
					"ui5-calheader-arrowbtn-disabled": this._nextButtonDisabled,
				}}
				role="button"
				onMouseDown={this.onNextButtonClick}
				title={this.headerNextButtonText}
			>
				<Icon class="ui5-calheader-arrowicon" name={slimArowRight}/>
			</div>
		</div>);
}
