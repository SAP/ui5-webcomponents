import type SideNavigationItemBase from "./SideNavigationItemBase.js";

export default function SideNavigationItemBaseTemplate(this: SideNavigationItemBase, tag?: string, itemContent?: () => void, injectedProps? : any) {
	const EffectiveTag = tag || "div";

	return (
		<EffectiveTag id={this._id}
					  data-sap-focus-ref
					  class={`${injectedProps?.classes} ${this._classes}`}
					  role={injectedProps?.role}
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
