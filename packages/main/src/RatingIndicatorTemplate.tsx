import type RatingIndicator from "./RatingIndicator.js";
import type { Star } from "./RatingIndicator.js";
import Icon from "./Icon.js";
import favorite from "@ui5/webcomponents-icons/dist/favorite.js";
import unfavorite from "@ui5/webcomponents-icons/dist/unfavorite.js";

export default function RatingIndicatorTemplate(this: RatingIndicator) {
	return (
		<div
			class="ui5-rating-indicator-root"
			role="slider"
			aria-roledescription={this._ariaRoleDescription}
			aria-valuemin={0}
			aria-valuenow={this.value}
			aria-valuemax={this.max}
			aria-valuetext={`${this.value} of ${this.max}`}
			aria-orientation="horizontal"
			aria-disabled={this._ariaDisabled}
			aria-readonly={this.ariaReadonly}
			aria-description={this._ariaDescription}
			tabindex={this.effectiveTabIndex}
			onFocusIn={this._onfocusin}
			onFocusOut={this._onfocusout}
			onClick={this._onclick}
			onKeyDown={this._onkeydown}
			title={this.ratingTooltip}
			aria-label={this._ariaLabel}
		>
			<ul class="ui5-rating-indicator-list" aria-hidden="true">
				{ this._stars.map(star => starLi.call(this, star))}
			</ul>
		</div>
	);
}

function starLi(this: RatingIndicator, star: Star) {
	if (star.selected) {
		return (
			<li data-ui5-value={star.index} class="ui5-rating-indicator-item ui5-rating-indicator-item-sel">
				<Icon data-ui5-value={star.index} name={favorite} />
			</li>
		);
	} if (star.halfStar) {
		return (
			<li class="ui5-rating-indicator-item ui5-rating-indicator-item-half">
				<Icon data-ui5-value={star.index} name={halfStarIconName.call(this)} />
				<div class="ui5-rating-indicator-half-icon-wrapper">
					<Icon data-ui5-value={star.index} name={favorite} class="ui5-rating-indicator-half-icon" />
				</div>
			</li>
		);
	} if (this.readonly) {
		return (
			<li class="ui5-rating-indicator-item ui5-rating-indicator-item-unsel">
				<Icon data-ui5-value={star.index} name={favorite} />
			</li>
		);
	} if (this.disabled) {
		return (
			<li class="ui5-rating-indicator-item ui5-rating-indicator-item-unsel">
				<Icon data-ui5-value={star.index} name={favorite} />
			</li>
		);
	}
	return (
		<li data-ui5-value={star.index} class="ui5-rating-indicator-item ui5-rating-indicator-item-unsel">
			<Icon data-ui5-value={star.index} name={unfavorite}/>
		</li>
	);
}

function halfStarIconName(this: RatingIndicator) {
	return this.disabled || this.readonly ? favorite : unfavorite;
}
