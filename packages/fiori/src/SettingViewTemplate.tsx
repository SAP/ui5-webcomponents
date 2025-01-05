import type SettingView from "./SettingView.js";

export default function SettingViewTemplate(this: SettingView) {
	return (
		<div class="ui5-setting-view-container">
			<div class="ui5-setting-view">
				<slot></slot>
			</div>
		</div>
	);
}
