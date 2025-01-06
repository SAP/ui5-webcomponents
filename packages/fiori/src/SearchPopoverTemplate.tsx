import Popover from "@ui5/webcomponents/dist/Popover.js";
import type Search from "./Search.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import List from "@ui5/webcomponents/dist/List.js";
import Title from "@ui5/webcomponents/dist/Title.js";

export default function SearchPopoverTemplate(this: Search) {
	return (
		<Popover
			hideArrow={true}
			preventFocusRestore={true}
			preventInitialFocus={true}
			placement="Bottom"
			horizontalAlign="Start"
			open={this._open}
			opener={this}
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
										<Title size="H6">{this.headerText}</Title>
										<Text class="ui5-search-popover-subheader"><i>{this.subheaderText}</i></Text>
									</header>)
								}

								<main>
									<List class="ui5-search-list" onLoadMore={this._handleMore} separators="None" growingButtonText={this.moreButtonText} growing={this._effectiveGrowing} onKeyDown={this._onItemKeydown}>
										<slot></slot>
									</List>
								</main>
							</>
						)
				)}
		</Popover>
	);
}
