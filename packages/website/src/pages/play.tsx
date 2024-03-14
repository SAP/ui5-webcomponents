import Editor from "../components/Editor";
import Layout from '@theme/Layout';

const html = `<!-- playground-fold -->
<!DOCTYPE html>
<head>
</head>

<body style="background-color: var(--sapBackgroundColor)">
  <!-- playground-fold-end -->

  <my-element>
    <h1>UI5 Web Components</h1>
  </my-element>
  <!-- playground-fold -->
  <script type="module" src="main.js"></script>
</body>

<!-- playground-fold-end -->
`

const ts = `
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender, { html } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

@customElement({
  tag: "my-element",
  renderer: litRender,
})
export class MyElement extends UI5Element {
  @property({ type: Integer, defaultValue: 0})
  count!: number;

  render() {
    return html \`
      <slot></slot>
      <div class="card">
        <button @click=\${this._onClick} part="button">
          Count is \${this.count}
        </button>
      </div>\`
  }

  _onClick() {
    this.count += 2;
  }
}

MyElement.define();
`;
export default function () {
  return (
    <>
      <Layout>

        <Editor
          html={html}
          js={ts}
          css={''}
          mainFile={"main.ts"}
          canShare={true}
          mainFileSelected={true}
          standalone={true}
        />
      </Layout>
    </>
  )
}