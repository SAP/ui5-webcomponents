import type NavigationLayout from "./NavigationLayout.js";

export default function NavigationLayoutTemplate(this: NavigationLayout) {
	return (
		<div class="ui5-nl-root">
			<header class="ui5-nl-header">
				<slot name="header"></slot>
			</header>
			<section class="ui5-nl-section">
				<aside class="ui5-nl-aside">
					<slot name="sideContent"></slot>
				</aside>
				<div class="ui5-nl-content">
					<slot></slot>
				</div>
			</section>
		</div>
	);
}
