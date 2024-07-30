import Editor from "../components/Editor";
import Layout from '@theme/Layout';


const html = `<!-- playground-fold -->
<!DOCTYPE html>
<head>
</head>

<body style="background-color: var(--sapBackgroundColor); color: var(--sapTextColor);">
  <!-- playground-fold-end -->

  <my-element></my-element>
  <my-element name="UI5 Web Components"></my-element>
  <!-- playground-fold -->
  <script type="module" src="main.js"></script>
</body>

<!-- playground-fold-end -->
`;


const ts = `import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender, { html } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";

@customElement({
  tag: "my-element",
  renderer: litRender,
})
export class MyElement extends UI5Element {
  @property()
  name?: string;

  render() {
    return html \`
      <div>
          Hello, \${this.name || "World"}!
      </div>\`
  }

  static styles = \`div {
      padding: 1rem;
      color: #334eff;
  }\`;
}

MyElement.define();
`

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