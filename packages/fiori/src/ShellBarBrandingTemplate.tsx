import type ShellBarBranding from "./ShellBarBranding.js";

export default function ShellBarBrandingTemplate(this: ShellBarBranding) {
	return (
		<a
			part="root"
			class="ui5-shellbar-branding-root"
			href={this.parsedRef}
			target={this.target}
			role={this.accLogoRole}
			tabIndex={0}
			aria-label={this._logoAreaText}
		>

			<slot name="logo"></slot>

			{this.brandingTitle && (
				<h1 class="ui5-shellbar-title">
					<bdi>{this.brandingTitle}</bdi>
				</h1>
			)}
		</a>);
}
