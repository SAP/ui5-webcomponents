import Icon from "@ui5/webcomponents/dist/Icon.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import type ShellBar from "./ShellBar.js";
import ShellBarPopoverTemplate from "./ShellBarPopoverTemplate.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";

export default function ShellBarTemplate(this: ShellBar) {
	return (
		<>
			<header
				class={this.classes.wrapper}
				aria-label={this._shellbarText}
				onKeyDown={this._onKeyDown}
				part="root">
				<div class="ui5-shellbar-overflow-container ui5-shellbar-overflow-container-left">
					{this.startButton.length > 0 && <slot name="startButton"></slot>}

					{this.hasMenuItems && (
						<>
							{!this.showLogoInMenuButton && this.hasLogo && singleLogo.call(this)}
							{this.showTitleInMenuButton && <h1 class="ui5-hidden-text">{this.primaryTitle}</h1>}
							{this.showMenuButton && (
								<>
									<button
										class={{
											"ui5-shellbar-menu-button": true,
											...this.classes.button,
										}}
										onClick={this._headerPress}
										aria-haspopup="menu"
										aria-expanded={this._menuPopoverExpanded}
										data-ui5-stable="menu"
										tabIndex={0}>
										{this.showLogoInMenuButton && (
											<span class="ui5-shellbar-logo" aria-label={this._logoText} title={this._logoText}>
												<slot name="logo"></slot>
											</span>
										)}
										{this.showTitleInMenuButton && (
											<div class="ui5-shellbar-menu-button-title">{this.primaryTitle}</div>
										)}
										<Icon class="ui5-shellbar-menu-button-arrow" name={slimArrowDown} />
									</button>
									{this.secondaryTitle && !this.isSBreakPoint && (
										<div style={{ display: "block" }} class="ui5-shellbar-secondary-title" data-ui5-stable="secondary-title">
											{this.secondaryTitle}
										</div>
									)}
								</>
							)}
						</>
					)}

					{!this.hasMenuItems && (
						<>
							{this.isSBreakPoint && this.hasLogo && singleLogo.call(this)}
							{!this.isSBreakPoint && (
								<>
									{combinedLogo.call(this)}
									{this.secondaryTitle && this.primaryTitle && (
										<h2 class="ui5-shellbar-secondary-title" data-ui5-stable="secondary-title">
											{this.secondaryTitle}
										</h2>
									)}
								</>
							)}
						</>
					)}
				</div>
				{this.hasMidContent && (
					<div class="ui5-shellbar-overflow-container ui5-shellbar-mid-content">
						<slot name="midContent"></slot>
					</div>
				)}
				<div class="ui5-shellbar-overflow-container ui5-shellbar-overflow-container-right">
					{this.hasAdditionalContext && (
						<>
							<div style={this.styles.additionalContext.start.separator} class="ui5-shellbar-separator ui5-shellbar-separator-start"></div>
							<div class="ui5-shellbar-overflow-container-additional-content" aria-label={this._additionalContextText} role={this._additionalContextRole}>
								{this.startContent.map(item => (
									<div key={item._individualSlot} id={item._individualSlot} class="ui5-shellbar-additional-content-item">
										<slot name={item._individualSlot}></slot>
									</div>
								))}
								<div class="ui5-shellbar-spacer"></div>
								{this.endContent.map(item => (
									<div key={item._individualSlot} id={item._individualSlot} class="ui5-shellbar-additional-content-item">
										<slot name={item._individualSlot}></slot>
									</div>
								))}
							</div>
							<div style={this.styles.additionalContext.end.separator} class="ui5-shellbar-separator ui5-shellbar-separator-end"></div>
						</>
					)}
					{!this.hasAdditionalContext && <div class="ui5-shellbar-spacer"></div>}
					<div class="ui5-shellbar-overflow-container-right-child" role={this._rightChildRole}>
						{this.hasSearchField && (
							<>
								{this._showFullWidthSearch && (
									<div class="ui5-shellbar-search-full-width-wrapper" style={this.styles.searchField}>
										<div class="ui5-shellbar-search-full-field">
											<slot name="searchField"></slot>
										</div>
										<Button
											onClick={this._handleCancelButtonPress}
											class="ui5-shellbar-button ui5-shellbar-cancel-button"
											data-ui5-stable="cancel-search">
											{this._cancelBtnText}
										</Button>
									</div>
								)}
								<div class="ui5-shellbar-search-field" style={this.styles.searchField}>
									{!this._showFullWidthSearch && <slot name="searchField"></slot>}
								</div>
								<Button
									id={`${this._id}-item-1`}
									class={{
										"ui5-shellbar-button": true,
										"ui5-shellbar-search-button": true,
										"ui5-shellbar-search-item-for-arrow-nav": true,
										...this.classes.search,
									}}
									icon="sap-icon://search"
									data-ui5-text="Search"
									data-ui5-notifications-count={this.notificationsCount}
									data-ui5-stable="toggle-search"
									onClick={this._handleSearchIconPress}
									tooltip={this._searchBtnOpen}
									aria-label={this._searchBtnOpen}
									aria-expanded={this._searchFieldExpanded}
									accessibilityAttributes={this.accInfo.search.accessibilityAttributes}
								/>
							</>
						)}
						{this.hasAssistant && (
							<div id="assistant" class={this.classes.assistant}>
								<slot name="assistant"></slot>
							</div>
						)}
						{this.showNotifications && (
							<Button
								id={`${this._id}-item-2`}
								class={{
									"ui5-shellbar-button": true,
									"ui5-shellbar-bell-button": true,
									"ui5-shellbar-items-for-arrow-nav": true,
									...this.classes.notification,
								}}
								icon="sap-icon://bell"
								data-ui5-text="Notifications"
								data-ui5-notifications-count={this.notificationsCount}
								onClick={this._handleNotificationsPress}
								tooltip={this._notificationsText}
								accessibilityAttributes={this.accInfo.notifications.accessibilityAttributes}
								data-ui5-stable="notifications"
							/>
						)}
						{this.customItemsInfo.map(item => (
							<Button
								key={item.id}
								id={item.id}
								class={`${item.classes} ui5-shellbar-items-for-arrow-nav`}
								icon={item.icon}
								tooltip={item.tooltip}
								data-count={item.count}
								data-ui5-notifications-count={this.notificationsCount}
								data-ui5-external-action-item-id={item.refItemid}
								data-ui5-stable={item.stableDomRef}
								onClick={item.press}
							/>
						))}
						<Button
							id={`${this._id}-item-5`}
							class={{
								"ui5-shellbar-no-overflow-button": true, // always visible
								"ui5-shellbar-button": true,
								"ui5-shellbar-overflow-button": true,
								...this.classes.overflow,
							}}
							icon="sap-icon://overflow"
							data-count={this._overflowNotifications}
							onClick={this._handleOverflowPress}
							tooltip={this._overflowText}
							accessibilityAttributes={this.accInfo.overflow.accessibilityAttributes}
							data-ui5-stable="overflow"
						/>
						{this.hasProfile && profileButton.call(this)}
						{this.showProductSwitch && (
							<Button
								id={`${this._id}-item-4`}
								class={`ui5-shellbar-no-overflow-button ui5-shellbar-button ui5-shellbar-button-product-switch ui5-shellbar-items-for-arrow-nav`}
								icon="sap-icon://grid"
								data-ui5-text="Product Switch"
								onClick={this._handleProductSwitchPress}
								tooltip={this._productsText}
								aria-label={this._productSwitchBtnText}
								aria-haspopup="dialog"
								aria-expanded={this.accInfo.products.accessibilityAttributes.expanded}
								accessibilityAttributes={this.accInfo.products.accessibilityAttributes}
								data-ui5-stable="product-switch"
							/>
						)}
					</div>
				</div>
			</header>
			{ShellBarPopoverTemplate.call(this)}
		</>
	);
}

function profileButton(this: ShellBar) {
	return (
		<Button
			data-profile-btn
			id={`${this._id}-item-3`}
			onClick={this._handleProfilePress}
			tooltip={this._profileText}
			class="ui5-shellbar-button ui5-shellbar-image-button ui5-shellbar-no-overflow-button ui5-shellbar-items-for-arrow-nav"
			aria-label={this.imageBtnText}
			aria-haspopup="dialog"
			accessibilityAttributes={this.accInfo.profile.accessibilityAttributes}
			data-ui5-stable="profile"
		>
			<slot name="profile"></slot>
		</Button>
	);
}

function singleLogo(this: ShellBar) {
	return (
		<span
			role={this.accLogoRole}
			class="ui5-shellbar-logo"
			aria-label={this._logoText}
			title={this._logoText}
			onClick={this._logoPress}
			onKeyDown={this._logoKeydown}
			onKeyUp={this._logoKeyup}
			tabIndex={0}
			data-ui5-stable="logo">
			<slot name="logo"></slot>
		</span>
	);
}

function combinedLogo(this: ShellBar) {
	return (
		<div
			role={this.accLogoRole}
			class="ui5-shellbar-logo-area"
			onClick={this._logoPress}
			tabIndex={0}
			onKeyDown={this._logoKeydown}
			onKeyUp={this._logoKeyup}
			aria-label={this._logoAreaText}>
			{this.hasLogo && (
				<span
					class="ui5-shellbar-logo"
					title={this._logoText}
					onClick={this._logoPress}
					onKeyDown={this._logoKeydown}
					onKeyUp={this._logoKeyup}
					data-ui5-stable="logo">
					<slot name="logo"></slot>
				</span>
			)}
			<div class="ui5-shellbar-headings">
				{this.primaryTitle && (
					<h1 class="ui5-shellbar-title">
						<bdi>{this.primaryTitle}</bdi>
					</h1>
				)}
			</div>
		</div>
	);
}
