import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import type Search from "./Search.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import List from "@ui5/webcomponents/dist/List.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import ListSeparator from "@ui5/webcomponents/dist/types/ListSeparator.js";
import TitleLevel from "@ui5/webcomponents/dist/types/TitleLevel.js";
import PopoverHorizontalAlign from "@ui5/webcomponents/dist/types/PopoverHorizontalAlign.js";
import PopoverPlacement from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";

export default function SearchPopoverTemplate(this: Search) {
	return (
		<ResponsivePopover
			hideArrow={true}
			preventFocusRestore={true}
			preventInitialFocus={true}
			placement={PopoverPlacement.Bottom}
			horizontalAlign={PopoverHorizontalAlign.Start}
			open={this.open}
			opener={this}
			onOpen={this._handleOpen}
			onClose={this._handleClose}
			class="ui5-search-popover"
		>

			{this._showIllustration ?
				<slot name="illustration"></slot>
				: (
					this._showLoading ?
						<BusyIndicator class="ui5-search-popover-loading-bi" active></BusyIndicator>
						: (
							<>
								{this._showHeader &&
									(<header slot="header" class="ui5-search-popover-header">
										<Title size={TitleLevel.H6}>{this.headerText}</Title>
										<Text class="ui5-search-popover-subheader"><i>{this.subheaderText}</i></Text>
									</header>)
								}

								<main>
									<List
										class="ui5-search-list"
										separators={ListSeparator.None}
										onKeyDown={this._onItemKeydown}
										onItemClick={this._onItemClick}>
										<slot></slot>
									</List>
								</main>

								{this._showFooter &&
									<Button
										slot="footer"
										design={ButtonDesign.Transparent}
										class="ui5-search-footer-button"
										onKeyDown={this._onFooterButtonKeyDown}
										onClick={this._onFooterButtonClick}>
										{this.popupActionText}
									</Button>
								}
							</>
						)
				)}
		</ResponsivePopover>
	);
}
