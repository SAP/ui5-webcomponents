import type SideNavigationItemBase from "./SideNavigationItemBase.js";

// const sideNavItemAttributes = {
// 	sClass: "ui5-sn-item ui5-sn-item-level2",
// 	onKeyDown: this._onkeydown,
// 	onKeyUp: this._onkeyup,
// 	onClick: this._onclick,
// 	onFocusIn: this._onfocusin,
// 	tabIndex: this.effectiveTabIndex,
// 	ariaCurrent: this._ariaCurrent,
// 	ariaSelected: this._ariaSelected,
// 	title: this._tooltip,
// 	ariaDisabled: this.effectiveDisabled,
// 	href: this._href,
// 	target: this._target,
// 	ariaHaspopup: this._ariaHasPopup
// };

export default function SideNavigationItemBaseTemplate(this: SideNavigationItemBase, tag?: string, itemContent?: () => void, injectedProps? : any) {
	const EffectiveTag = tag || "div";

	return (
		<EffectiveTag id={this._id}
					  class={`${injectedProps?.sClass} ${this._classes}`}
					  role={injectedProps?.role}
					  data-sap-focus-ref
					  onKeyDown={injectedProps?.onKeyDown}
					  onKeyUp={injectedProps?.onKeyUp}
					  onClick={injectedProps?.onClick}
					  onFocusIn={injectedProps?.onFocusIn}
					  onFocusOut={injectedProps?.onFocusOut}
					  onMouseEnter={injectedProps?.onMouseEnter}
					  onMouseLeave={injectedProps?.onMouseLeave}
					  tabIndex={injectedProps?.tabIndex}
					  aria-haspopup={injectedProps?.ariaHasPopup}
					  aria-checked={injectedProps?.ariaChecked}
					  aria-owns={injectedProps?.ariaOwns}
					  title={injectedProps?.title}
					  aria-label={injectedProps?.ariaLabel}
					  aria-expanded={injectedProps?.ariaExpanded}
					  aria-current={injectedProps?.ariaCurrent}
					  aria-selected={injectedProps?.ariaSelected}
					  href={injectedProps?.href}
					  target={injectedProps?.target}
					  aria-disabled={injectedProps?.ariaDisabled}
		>
			{ itemContent?.call(this) }
		</EffectiveTag>
	);
}
