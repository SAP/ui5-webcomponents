import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender, { html } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

const styles = `
    button {
        padding: 1rem;
        border-radius: 1rem;
    }
`;

@customElement({
    tag: "my-element",
    styles,
    renderer: litRender,
})
export class MyElement extends UI5Element {
    @property({ type: Number })
    count = 0;

    render() {
        return html `
            <slot></slot>
            <div class="card">
                <button @click=${this._onClick} part="button">
                Count is ${this.count}
                </button>
            </div>`
    }

    _onClick() {
        this.count += 2;
    }
}

MyElement.define();