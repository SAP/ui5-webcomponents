/**
 * Different types of IllustrationMessageSize.
 * @public
 * @since 1.5.0
 */
declare enum IllustrationMessageSize {
    /**
     * Automatically decides the <code>Illustration</code> size (<code>Base</code>, <code>Dot</code>, <code>Spot</code>,
     * <code>Dialog</code>, or <code>Scene</code>) depending on the <code>IllustratedMessage</code> container width.
     *
     * **Note:** `Auto` is the only option where the illustration size is changed according to
     * the available container width. If any other `IllustratedMessageSize` is chosen, it remains
     * until changed by the app developer.
     * @public
     */
    Auto = "Auto",
    /**
     * Base `Illustration` size (XS breakpoint). Suitable for cards (two columns).
     *
     * **Note:** When `Base` is in use, no illustration is displayed.
     * @public
     */
    Base = "Base",
    /**
     * Dot <code>Illustration</code> size (XS breakpoint). Suitable for table rows.
     * @public
     */
    Dot = "Dot",
    /**
     * Spot <code>Illustration</code> size (S breakpoint). Suitable for cards (four columns).
     * @public
     */
    Spot = "Spot",
    /**
     * Dialog `Illustration` size (M breakpoint). Suitable for dialogs.
     * @public
     */
    Dialog = "Dialog",
    /**
     * Scene `Illustration` size (L breakpoint). Suitable for a `Page` or a table.
     * @public
     */
    Scene = "Scene"
}
export default IllustrationMessageSize;
