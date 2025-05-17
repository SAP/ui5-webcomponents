import Search from "./Search.js";
/**
 * @class
 * Search field for the ShellBar component.
 * @constructor
 * @extends Search
 * @public
 * @since 2.10.0
 * @experimental
 */
declare class ShellBarSearch extends Search {
    _handleSearchIconPress(): void;
    _onFocusOutSearch(e: FocusEvent): void;
    _handleInput(e: InputEvent): void;
    get _effectiveIconTooltip(): string;
    get nativeInput(): HTMLInputElement | null | undefined;
    onBeforeRendering(): void;
}
export default ShellBarSearch;
