export default `<ui5-dynamic-page-header slot="headerArea">
<div
    style="
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    "
>
    <div
        style="
            display: flex;
            flex-direction: row;
            align-items: center;
        "
    >
        <ui5-avatar
            id="avatar"
            icon="laptop"
            color-scheme="Accent5"
            size="XL"
            style="margin: 0 1rem; min-width: 7rem"
        >
        </ui5-avatar>
        <div>
            <div class="productInfo">
                <ui5-title level="H5">Product:</ui5-title>
                <ui5-title level="H5" id="lblName"></ui5-title>
            </div>
            <br />
            <div class="productInfo">
                <ui5-title level="H5">Description:</ui5-title>
                <ui5-title level="H5" id="lblDesc"></ui5-title>
            </div>
            <br />
            <div class="productInfo">
                <ui5-title level="H5">Supplier:</ui5-title>
                <ui5-title level="H5" id="lblSupplier"
                    ><b>Titanium</b></ui5-title>
            </div>
        </div>
    </div>
    <div class="productInfo" style="align-self: start">
        <ui5-title level="H5">Progress:</ui5-title>
        <ui5-progress-indicator
            id="progress"
            accessible-name="Hello World"
            value="40"
            style="width: 9rem"
        ></ui5-rating-indicator>
    </div>
    <span></span>
</div>
</ui5-dynamic-page-header>`;
