import type Toast from "./Toast.js";

export default function ToastTemplate(this: Toast) {
	return <>
		this.open &&
		<div class="ui5-toast-root" role="alert" tabindex={this._tabindex}>
			<bdi><slot></slot></bdi>
		</div>
	</>;
}
