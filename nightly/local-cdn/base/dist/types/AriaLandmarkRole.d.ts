/**
 * Defines the ARIA accessible landmark roles.
 */
declare enum AriaLandmarkRole {
    /**
     * No explicit role is applicable.
     *
     * The interpretation of this value depends on the  element which defines a property with this type.
     * Normally this value means that no accessible landmark should be written.
     *
     * @public
     */
    None = "None",
    /**
     * The ARIA role <code>banner</code>.
     *
     * A banner usually appears at the top of the page and typically spans the full width.
     *
     * @public
     */
    Banner = "Banner",
    /**
     * The ARIA role <code>main</code>.
     *
     * The main content of a page.
     *
     * @public
     */
    Main = "Main",
    /**
     * The ARIA role <code>region</code>.
     *
     * A section of a page, that is important enough to be included in a page summary or table of contents.
     *
     * @public
     */
    Region = "Region",
    /**
     * The ARIA role <code>navigation</code>.
     *
     * A region that contains a collection of items and objects that, as a whole, combine to create a navigation facility.
     *
     * @public
     */
    Navigation = "Navigation",
    /**
     * The ARIA role <code>search</code>.
     *
     * A region that contains a collection of items and objects that, as a whole, combine to create a search facility.
     *
     * @public
     */
    Search = "Search",
    /**
     * The ARIA role <code>complementary</code>.
     *
     * A section of the page, designed to be complementary to the main content at a similar level in the DOM hierarchy.
     *
     * @public
     */
    Complementary = "Complementary",
    /**
     * The ARIA role <code>form</code>.
     *
     * A region that contains a collection of items and objects that, as a whole, combine to create a form.
     *
     * @public
     */
    Form = "Form",
    /**
     * The ARIA role <code>contentinfo</code>.
     *
     * A region that contains information about the content on the page.
     *
     * @public
     */
    ContentInfo = "ContentInfo"
}
export default AriaLandmarkRole;
