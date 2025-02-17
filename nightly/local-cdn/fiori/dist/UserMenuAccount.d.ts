import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
declare class UserMenuAccount extends UI5Element {
    /**
     * Defines the avatar image url of the user.
     *
     * @default ""
     * @public
     */
    avatarSrc?: string;
    /**
     * Defines the avatar initials of the user.
     *
     * @default undefined
     * @public
     */
    avatarInitials?: string;
    /**
     * Defines the title text of the user.
     *
     * @default ""
     * @public
     */
    titleText: string;
    /**
     * Defines additional text of the user.
     *
     * @default ""
     * @public
     */
    subtitleText: string;
    /**
     * Defines description of the user.
     *
     * @default ""
     * @public
     */
    description: string;
    /**
     * Defines if the user is selected.
     *
     * @default false
     * @public
     */
    selected: boolean;
    get _initials(): string;
}
export default UserMenuAccount;
