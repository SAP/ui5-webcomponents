import React from 'react';
import { useRef, useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import playgroundSupport from "./playground-support.js";
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from "./index.module.css";
import { useTheme, useTextDirection, useContentDensity } from "@site/src/components/Settings"

let playgroundSupportContent = playgroundSupport("/");

if (ExecutionEnvironment.canUseDOM) {
  require('playground-elements');

  const storedTheme = localStorage.getItem("ui5-theme");
  if (storedTheme) {
    playgroundSupportContent = `setTheme("${storedTheme}");
    ${playgroundSupport("/")}`
  }
}

export default function Editor({html, js, css }) {
  const projectRef = useRef(null);
  const previewRef = useRef(null);
  const tabBarRef = useRef(null);
  const fileEditorRef = useRef(null);

  // name is set on iframe so it can be passed back in resize message to identify which iframe is resized
  const [iframeName, setIframeName] = useState(`${performance.now()}`)
  const [editorVisible, setEditorVisible] = useState(false);
  const [btnText, setButtonText] = useState("Edit");
  const {siteConfig, siteMetadata} = useDocusaurusContext();
  // this is only reading the initial stored state, updates go through postMessage
  const [theme] = useTheme();
  const [textDirection] = useTextDirection();
  const [contentDensity] = useContentDensity();

  function addImportMap(html) {
    return html.replace("<head>", `
<head>
    <script type="importmap">
      {
        "imports": {
          "@ui5/webcomponents/": "${getHostBaseUrl()}local-cdn/main/",
          "@ui5/webcomponents-base/": "${getHostBaseUrl()}local-cdn/base/",
          "@ui5/webcomponents-icons/": "${getHostBaseUrl()}local-cdn/icons/",
          "@ui5/webcomponents-localization/": "${getHostBaseUrl()}local-cdn/localization/",
          "@ui5/webcomponents-theming/": "${getHostBaseUrl()}local-cdn/theming/",
          "lit-html": "${getHostBaseUrl()}local-cdn/lit-html/lit-html.js",
          "lit-html/": "${getHostBaseUrl()}local-cdn/lit-html/"
        }
      }
    </script>
`)
  }

  function getHostBaseUrl() {
    let origin = siteConfig.url;
    if (process.env.NODE_ENV === 'development') {
      origin = location.origin;
    }
    return new URL(useBaseUrl("/"), origin).toString();
  }
  // samples should use the pattern "../assets/..." for their assets
  // and it will be converted to the aboslute url of the documentation site
  // and served from /static
  function fixAssetPaths(html) {
    let origin = siteConfig.url;
    if (process.env.NODE_ENV === 'development') {
      origin = location.origin;
    }
    return html.replaceAll("../assets/", getHostBaseUrl())
  }

  function toggleEditor() {
    setEditorVisible(!editorVisible);
    setButtonText(editorVisible ? "Edit" : "Hide code");
  }

  useEffect(() => {
    window.addEventListener("message", async (event) => {
      if (event.data.height && event.data.name === iframeName) {
        previewRef.current.iframe.style.height = `${event.data.height}px`;
      }
    });
    previewRef.current.project = projectRef.current;
    tabBarRef.current.project = projectRef.current;
    fileEditorRef.current.project = projectRef.current;

    tabBarRef.current.editor = fileEditorRef.current;

    // the name attribute on the iframe is accessible from the content as window.name
    customElements.whenDefined("playground-preview").then(function () {
      // iframe property available after element is defined
      previewRef.current.iframe.name = iframeName;
    })

    return function () {
      console.log("cleanup");
    }
  }, []);

  return (
    <>
      <playground-project ref={projectRef} id="btn-project" resizable>
          <script type="sample/importmap">
            {`{
              "imports": {
                "@ui5/webcomponents/": "${getHostBaseUrl()}local-cdn/main/",
                "@ui5/webcomponents-base/": "${getHostBaseUrl()}local-cdn/base/",
                "@ui5/webcomponents-icons/": "${getHostBaseUrl()}local-cdn/icons/",
                "@ui5/webcomponents-localization/": "${getHostBaseUrl()}local-cdn/localization/",
                "@ui5/webcomponents-theming/": "${getHostBaseUrl()}local-cdn/theming/"
              }
            }`}
          </script>
          <script type="sample/html" filename="index.html" hidden={!html || undefined}>
              {addImportMap(fixAssetPaths(html))}
          </script>

          <script type="sample/js" hidden filename="playground-support.js">
            {playgroundSupport({theme, textDirection, contentDensity})}
            {/* {playgroundSupport(new URL(useBaseUrl("/")).toString())} */}
          </script>
          <script type="sample/js" filename="main.js"  hidden={!js || undefined}>
            {`/* playground-hide */
import "./playground-support.js";
/* playground-hide-end */
${fixAssetPaths(js)}`}
          </script>
          <script type="sample/css" filename="main.css" hidden={!css || undefined}>
            {css}
          </script>
      </playground-project>

      <div style={{display: "flex", flexDirection: "column", border: "1px solid hsla(203, 50%, 30%, 0.15)", boxShadow: "var(--ifm-color-secondary) 0 1px 3px 0"}}>
        <playground-preview class={styles.previewResultHidden} style={{height: "unset"}} ref={previewRef}></playground-preview>
          <div style={{display: editorVisible ? "block" : "none"}}>
            <playground-tab-bar editable-file-system ref={tabBarRef}></playground-tab-bar>
            <playground-file-editor line-numbers ref={fileEditorRef}></playground-file-editor>
          </div>
          <button
            className={"button " + (editorVisible ? "button--secondary" : "button--primary")}
            style={{ borderEndEndRadius: 0, borderTopRightRadius:0, padding: "0.125rem 0.75rem", margin: "0", alignSelf: "end", fontSize: "0.625rem" }}
            onClick={ toggleEditor }
          >
            {btnText}
          </button>
      </div>
    </>
  );
}