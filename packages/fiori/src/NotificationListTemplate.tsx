import type NotificationList from "./NotificationList.js";
import NotificationListInternal from "./NotificationListInternal.js";

export default function NotificationListTemplate(this: NotificationList) {
	return (
		<NotificationListInternal
			accessibleName={this._accessibleName}
			noDataText={this.noDataText}
			onItemClick={this._onItemClick}
			onItemClose={this._onItemClose}
			onItemToggle={this._onItemToggle}
			onLoadMore={this._onLoadMore}
		>
			<slot></slot>
		</NotificationListInternal>
	);
}
