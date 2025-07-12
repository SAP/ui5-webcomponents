import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { AriaRole } from "@ui5/webcomponents-base/dist/types.js";
import ListItemBase from "./ListItemBase.js";
import ListItemAccessibleRole from "./types/ListItemAccessibleRole.js";
/**
 * @class
 * The `ui5-li-group-header` is a special list item, used only to separate other list items into logical groups.
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @constructor
 * @extends ListItemBase
 * @private
 */
declare class ListItemGroupHeader extends ListItemBase {
    eventDetails: ListItemBase["eventDetails"];
    /**
     * Defines the text alternative of the component.
     *
     * **Note:** If not provided a default text alternative will be set, if present.
     * @default undefined
     * @public
     */
    accessibleName?: string;
    accessibleRole: `${ListItemAccessibleRole}`;
    subItems: Array<HTMLElement>;
    static i18nBundle: I18nBundle;
    get effectiveAccRole(): AriaRole;
    get groupItem(): boolean;
    get _pressable(): boolean;
    get groupHeaderText(): string;
    get ariaLabelText(): string;
    get hasSubItems(): boolean;
}
export default ListItemGroupHeader;
