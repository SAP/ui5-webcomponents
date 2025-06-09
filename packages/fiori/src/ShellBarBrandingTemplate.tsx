import type ShellBarBranding from "./ShellBarBranding.js";

export default function ShellBarBrandingTemplate(this: ShellBarBranding) {
	return (
	  <a
			class="ui5-shellbar-branding-root"
			href={this.parsedRef}
			target={this.target}
			role={this.accBrandingRole}
			tabIndex={0}
			aria-label={this._logoAreaText}
			onClick={this._logoPress}
			onKeyDown={this._logoKeydown}
			onKeyUp={this._logoKeyup}
	  >
			<span class="ui5-shellbar-logo" aria-label={this._logoText} title={this._logoText}>
				<slot name="logo"></slot>
			</span>

			{!this.isSBreakPoint && this.brandingTitle && (
				<h1 class="ui5-shellbar-title">
					<bdi>{this.brandingTitle}</bdi>
				</h1>
			)}
	  </a>
	);
}
