/**
 * Different types of IllustrationMessageSize.
 * @public
 * @since 1.5.0
 */
var IllustrationMessageSize;
(function (IllustrationMessageSize) {
    /**
     * Automatically decides the <code>Illustration</code> size (<code>Base</code>, <code>Dot</code>, <code>Spot</code>,
     * <code>Dialog</code>, or <code>Scene</code>) depending on the <code>IllustratedMessage</code> container width.
     *
     * **Note:** `Auto` is the only option where the illustration size is changed according to
     * the available container width. If any other `IllustratedMessageSize` is chosen, it remains
     * until changed by the app developer.
     * @public
     */
    IllustrationMessageSize["Auto"] = "Auto";
    /**
     * Base `Illustration` size (XS breakpoint). Suitable for cards (two columns).
     *
     * **Note:** When `Base` is in use, no illustration is displayed.
     * @public
     */
    IllustrationMessageSize["Base"] = "Base";
    /**
     * Dot <code>Illustration</code> size (XS breakpoint). Suitable for table rows.
     * @public
     */
    IllustrationMessageSize["Dot"] = "Dot";
    /**
     * Spot <code>Illustration</code> size (S breakpoint). Suitable for cards (four columns).
     * @public
     */
    IllustrationMessageSize["Spot"] = "Spot";
    /**
     * Dialog `Illustration` size (M breakpoint). Suitable for dialogs.
     * @public
     */
    IllustrationMessageSize["Dialog"] = "Dialog";
    /**
     * Scene `Illustration` size (L breakpoint). Suitable for a `Page` or a table.
     * @public
     */
    IllustrationMessageSize["Scene"] = "Scene";
})(IllustrationMessageSize || (IllustrationMessageSize = {}));
export default IllustrationMessageSize;
//# sourceMappingURL=IllustrationMessageSize.js.map