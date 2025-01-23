import type UserMenu from "./UserMenu.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import Panel from "@ui5/webcomponents/dist/Panel.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import edit from "@ui5/webcomponents-icons/dist/edit.js";
import personPlaceholder from "@ui5/webcomponents-icons/dist/person-placeholder.js";
import userSettings from "@ui5/webcomponents-icons/dist/user-settings.js";
import log from "@ui5/webcomponents-icons/dist/log.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import addEmployee from "@ui5/webcomponents-icons/dist/add-employee.js";

export default function UserMenuTemplate(this: UserMenu) {
	return (
		<ResponsivePopover
			id="user-menu-rp"
			class="ui5-pm-rp"
			tabIndex={-1}
			placement="Bottom"
			verticalAlign="Bottom"
			horizontalAlign="End"
			preventInitialFocus={true}
			accessibleName={this.accessibleNameText}
			open={this.open}
			opener={this.opener}
			onClose={this._handlePopoverAfterClose}
			onOpen={this._handlePopoverAfterOpen}
		>
			{this._isPhone ?
				<>
					<Bar class="ui5-pm-phone-header" slot="header">
						{this._manageAccountVisibleInHeader &&
							<Button icon={userSettings} onClick={this._handleManageAccountClick} slot="startContent"></Button>
						}

						{this._titleMovedToHeader &&
							<Title
								level="H1"
								wrappingType="None"
							>
								{this._selectedAccount.titleText}
							</Title>
						}

						<Button
							icon={decline}
							design="Transparent"
							accessibleName={this._closeDialogAriaLabel}
							onClick={this._closeUserMenu}
							slot="endContent"
						>
						</Button>
					</Bar>
					<div class="ui5-pm-header">
						{headerContent.call(this)}
					</div>
				</>
				:
				<div class="ui5-pm-header" slot="header">
					{headerContent.call(this)}
				</div>
			}

			{this.showOtherAccounts &&
					<Panel collapsed={true} class="ui5-pm-other-accounts">
						<div slot="header" class="ui5-user-menu-account-header">
							<Title slot="header" level="H4">{this._otherAccountsButtonText} ({this._otherAccounts.length})</Title>
							{this.showAddAccount &&
								<Button slot="header" class="ui5-pm-add-account-btn" design="Transparent" icon={addEmployee} onClick={this._handleAddAccountClick} tooltip={this._addAccountTooltip}/>
							}
						</div>
						{this._otherAccounts.length > 0 &&
							<List onItemClick={this._handleAccountSwitch}>
								{this._otherAccounts.map(account =>
									<ListItemCustom
										ref={this.captureRef.bind(account)}
									>
										<div class="ui5-pm-other-accounts-content">
											<Avatar slot="image" size="S" initials={account._initials} fallbackIcon={personPlaceholder}>
												{account.avatarSrc &&
													<img src={account.avatarSrc}/>
												}
											</Avatar>
											<div>
												{account.titleText &&
												<Title>{account.titleText}</Title>
												}
												{account.subtitleText &&
												<Label>{account.subtitleText}</Label>
												}
												{account.description &&
												<Label>{account.description}</Label>
												}
											</div>
										</div>
									</ListItemCustom>
								)}
							</List>
						}
					</Panel>
			}

			{this.menuItems.length > 0 &&
					<List
						class="ui5-user-menu-list"
						selectionMode="None"
						separators="None"
						accessibleRole="Menu"
						onItemClick={this._handleMenuItemClick}
						onui5-close-menu={this._handleMenuItemClose}
					>
						<slot></slot>
					</List>
			}

			<div slot="footer" class="ui5-pm-footer">
				<Button class="ui5-pm-sign-out-btn" design="Transparent" icon={log} onClick={this._handleSignOutClick}>{this._signOutButtonText}</Button>
			</div>
		</ResponsivePopover>
	);
}

function headerContent(this: UserMenu) {
	return (<>
		{this._selectedAccount &&
			<div class="ui5-pm-selected-account">
				<Avatar size="L" onClick={this._handleAvatarClick} initials={this._selectedAccount._initials} fallbackIcon={personPlaceholder} class="ui5-pm--selected-account-avatar">
					{this._selectedAccount.avatarSrc &&
						<img src={this._selectedAccount.avatarSrc}/>
					}
					{this.showEditButton &&
					<Tag slot="badge" wrappingType="None" design="Set1" colorScheme="5" title={this._editAvatarTooltip}>
						<Icon slot="icon" name={edit}></Icon>
					</Tag>
					}
				</Avatar>
				{this._selectedAccount.titleText &&
					<Title id="selected-account-title" class="ui5-pm-selected-account-title">{this._selectedAccount.titleText}</Title>
				}

				{this._selectedAccount.subtitleText &&
					<Text class="ui5-pm-selected-account-subtitleText">{this._selectedAccount.subtitleText}</Text>
				}
				{this._selectedAccount.description &&
					<Text class="ui5-pm-selected-account-description">{this._selectedAccount.description}</Text>
				}

				{this.showManageAccount &&
					<Button id="selected-account-manage-btn" icon={userSettings} class="ui5-pm-manage-account-btn" onClick={this._handleManageAccountClick}>{this._manageAccountButtonText}</Button>
				}
			</div>
		}
	</>);
}
