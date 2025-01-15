import type NotificationListItem from "./NotificationListItem.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import iconHighPriority from "@ui5/webcomponents-icons/dist/high-priority.js";
import iconDecline from "@ui5/webcomponents-icons/dist/decline.js";
import iconOverflow from "@ui5/webcomponents-icons/dist/overflow.js";

export default function NotificationListItemTemplate(this: NotificationListItem) {
	return (
		<li
			class={this.itemClasses}
			onFocusIn={this._onfocusin}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			onClick={this._onclick}
			tabindex={this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined}
			aria-labelledby={this.ariaLabelledBy}
			aria-level={this._ariaLevel}
		>
			{this.loading && (
				<span
					id={`${this._id}-loading`}
					class="ui5-hidden-text"
				>
					{this.loadingText}
				</span>
			)}
			<BusyIndicator
				id={`${this._id}-busyIndicator`}
				delay={this.loadingDelay}
				active={this.loading}
				inert={this.loading}
				class="ui5-nli-loading">
				<div class="ui5-nli-content-wrapper">
					<div
						class={{
							"ui5-nli-content": true,
							"ui5-nli-content-with-importance": this.hasImportance,
						}}>
						{this.hasImportance && (
							<Tag
								id={`${this._id}-importance`}
								class="ui5-nli-importance"
								design="Set2"
								colorScheme="2"
								wrappingType="None"
							>
								<Icon
									name={iconHighPriority}
									slot="icon"
								/>
								{this.importanceText}
							</Tag>
						)}
						<div class="ui5-nli-title-text-wrapper">
							{this.hasState && (
								<Icon
									class="ui5-state-icon"
									name={this.statusIconName}
									showTooltip={true}
									accessibleName={this.stateText}
									design={this.statusIconDesign}
								/>
							)}
							<div
								id={`${this._id}-title-text`}
								class="ui5-nli-title-text"
								part="title-text"
							>
								<span class="ui5-hidden-text">{this.stateText}</span>
								{this.titleText}
							</div>
						</div>
						<span
							id={`${this._id}-read`}
							class="ui5-hidden-text"
						>
							{this.readText}
						</span>
						{this.hasDesc && (
							<div
								id={`${this._id}-description`}
								class="ui5-nli-description"
							>
								<slot></slot>
							</div>
						)}
						<div class="ui5-nli-footer">
							<div
								id={`${this._id}-footnotes`}
								class="ui5-nli-footnotes"
							>
								{
									this.footerItems.map(item => {
										return (
											<>
												<slot name={item.slotName}></slot>
												{item.showDivider && <div class="ui5-nli-footer-divider" aria-hidden="true">·</div>}
											</>
										);
									})
								}
							</div>
							<Link
								class="ui5-nli-footer-showMore"
								hidden={this.hideShowMore}
								onClick={this._onShowMoreClick}
								wrappingType="None"
								href="#" // --without href ENTER does not trigger click
								accessibleName={this.moreLinkAccessibleName}
								accessibleRole="Button"
								accessibilityAttributes={this.moreLinkAccessibilityAttributes}
							>
								{this.showMoreText}
							</Link>
						</div>
					</div>
					<div class="ui5-nli-actions">
						{this.showMenu && (
							<Button
								icon={iconOverflow}
								design="Transparent"
								onClick={this._onBtnMenuClick}
								class="ui5-nli-menu-btn"
								tooltip={this.menuBtnAccessibleName}
								accessibilityAttributes={this.menuButtonAccessibilityAttributes}
							/>
						)}
						{this.showClose && (
							<Button
								icon={iconDecline}
								class="ui5-nli-close-btn"
								design="Transparent"
								onClick={this._onBtnCloseClick}
								tooltip={this.closeBtnAccessibleName}
								accessibleName={this.closeBtnAccessibleName}
							/>
						)}
					</div>
					<div
						class="ui5-nli-avatar"
						aria-hidden="true"
					>
						<slot name="avatar"></slot>
					</div>
					<slot name="menu"></slot>
				</div>
			</BusyIndicator>
		</li>
	);
}
