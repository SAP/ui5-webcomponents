import type DynamicPageHeader from "./DynamicPageHeader.js";

export default function(this: DynamicPageHeader) {
    return (
        <div class="ui5-dynamic-page-header-root">
            <slot></slot>
        </div>
    );
}
