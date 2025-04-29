import type Carousel from "./Carousel.js";
import Button from "./Button.js";
import slimArrowLeft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

export default function CarouselTemplate(this: Carousel) {
	return (
		<section
			class={{
				"ui5-carousel-root": true,
				[`ui5-carousel-background-${this._backgroundDesign}`]: true,
			}}
			tabindex={0}
			role="list"
			aria-label={this.ariaLabelTxt}
			aria-roledescription={this._roleDescription}
			aria-activedescendant={this.ariaActiveDescendant}
			onFocusIn={this._onfocusin}
			onKeyDown={this._onkeydown}
			onMouseOut={this._onmouseout}
			onMouseOver={this._onmouseover}
		>
			<div class={this.classes.viewport} part="content">
				<div class={this.classes.content} style={{ transform: `translateX(${this._isRTL ? "" : "-"}${this._selectedIndex * (this._itemWidth || 0)}px` }}>
					{this.items.map(itemInfo =>
						<div
							id={itemInfo.id}
							class={{
								"ui5-carousel-item": true,
								"ui5-carousel-item--hidden": !itemInfo.selected,
							}}
							style={{ width: `${this._itemWidth || 0}px` }}
							part="item"
							role="listitem"
							aria-posinset={itemInfo.posinset}
							aria-setsize={itemInfo.setsize}
							aria-selected = {itemInfo.selected}
						>
							<slot name={itemInfo.item._individualSlot} tabindex={itemInfo.tabIndex}></slot>
						</div>
					)}
				</div>
				{this.showArrows.content &&
					<div class="ui5-carousel-navigation-arrows">
						{arrowBack.call(this)}
						{arrowForward.call(this)}
					</div>
				}
			</div>

			{this.renderNavigation &&
				<div class={this.classes.navigation}>
					{this.showArrows.navigation && arrowBack.call(this)}

					<div class="ui5-carousel-navigation">
						{ !this.hidePageIndicator && navIndicator.call(this) }
					</div>

					{this.showArrows.navigation && arrowForward.call(this)}
				</div>
			}
		</section>
	);
}

function arrowBack(this: Carousel) {
	return <Button
		icon={slimArrowLeft}
		tabindex={-1}
		tooltip={this.previousPageText}
		class={{
			"ui5-carousel-navigation-button": true,
			"ui5-carousel-navigation-button--hidden": !this.hasPrev
		}}
		data-ui5-arrow-back
		onClick={this._navButtonClick}
	/>;
}

function arrowForward(this: Carousel) {
	return <Button
		icon={slimArrowRight}
		tabindex={-1}
		tooltip={this.nextPageText}
		class={{
			"ui5-carousel-navigation-button": true,
			"ui5-carousel-navigation-button--hidden": !this.hasNext
		}}
		data-ui5-arrow-forward
		onClick={this._navButtonClick}
	/>;
}

function navIndicator(this: Carousel) {
	return this.isPageTypeDots ? this.dots.map(dot =>
		<div
			role="img"
			aria-label={dot.ariaLabel}
			class={{
				"ui5-carousel-navigation-dot": true,
				"ui5-carousel-navigation-dot--active": dot.active
			}}
		></div>)
		:
		<div
			dir="auto"
			class="ui5-carousel-navigation-text"
		>{this.selectedIndexToShow}&nbsp;{this.ofText}&nbsp;{this.pagesCount}</div>;
}
