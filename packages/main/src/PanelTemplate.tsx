import clsx from "clsx"
import type Panel from "./Panel.js"
import Button from "./Button.js";
import Icon from "./Icon.js";

export default ({
	accRole,
	effectiveAccessibleName,
	fixedPanelAriaLabelledbyReference,
	hasHeaderOrHeaderText,
	headerTabIndex,
	headingWrapperRole,
	headingWrapperAriaLevel,
	_headerClick,
	_headerKeyDown,
	_headerKeyUp,
	_toggleButtonClick,
	accInfo,
	_hasHeader,
	_id,
	headerText,
	fixed,
	toggleButtonTitle,
	stickyHeader,
	shouldNotAnimate,
	_contentExpanded,
}: Panel) => {
	return (<>
		<div
			class="ui5-panel-root"
			role={accRole}
			aria-label={effectiveAccessibleName}
			aria-labelledby={fixedPanelAriaLabelledbyReference}
		>
			{ hasHeaderOrHeaderText &&
				// header: either header or h1 with header text
				<div
					class={clsx({
						"ui5-panel-heading-wrapper": true,
						"ui5-panel-heading-wrapper-sticky": stickyHeader,
					})}
					role={headingWrapperRole}
					aria-level={headingWrapperAriaLevel}
				>
					<div
						onClick={_headerClick}
						onKeyDown={_headerKeyDown}
						onKeyUp={_headerKeyUp}
						class="ui5-panel-header"
						tabindex={headerTabIndex}
						role={accInfo.role}
						aria-expanded={accInfo.ariaExpanded}
						aria-controls={accInfo.ariaControls}
						aria-labelledby={accInfo.ariaLabelledby}
						part="header"
					>
						{ !fixed &&
							<div class="ui5-panel-header-button-root">
								{ _hasHeader ?
									<Button
										design="Transparent"
										class="ui5-panel-header-button ui5-panel-header-button-with-icon"
										onClick={_toggleButtonClick}
										accessibilityAttributes={accInfo.button.accessibilityAttributes}
										tooltip={accInfo.button.title}
										accessible-name={accInfo.button.ariaLabelButton}
									>
										<div class="ui5-panel-header-icon-wrapper">
											<Icon
												class={clsx({
													"ui5-panel-header-icon": true,
													"ui5-panel-header-button-animated": !shouldNotAnimate,
												})}
												name="slim-arrow-right"
											>
											</Icon>
										</div>
									</Button>
								: // else
									<Icon
										class={clsx(
											"ui5-panel-header-button ui5-panel-header-icon",
											!shouldNotAnimate && "ui5-panel-header-button-animated",
										)}
										name="slim-arrow-right"
										show-tooltip
										accessible-name={toggleButtonTitle}
									></Icon>
								}
							</div>
						}

						{ _hasHeader ?
							<slot name="header"></slot>
						: // else
							<div
								id={ `${_id}-header-title` }
								class="ui5-panel-header-title"
							>
								{ headerText }
							</div>
						}
					</div>
				</div>
			}

			{/* content area */}
			<div
				class="ui5-panel-content"
				id={ `${_id}-content` }
				tabindex={ -1 }
				style={{
					display: _contentExpanded ? "block" : "none",
				}}
				part="content"
			>
				<slot></slot>
			</div>
		</div>
	</>);
};
