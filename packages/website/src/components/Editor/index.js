import React from 'react';
import { useRef, useEffect, useState, useId, useContext } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import playgroundSupport from "./playground-support.js";
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from "./index.module.css";
import { ThemeContext, ContentDensityContext, TextDirectionContext } from "@site/src/theme/Root";

if (ExecutionEnvironment.canUseDOM) {
  require('playground-elements');
}

const projectPool = [];

// get a project element from the pool or create a new one
const getProjectFromPool = () => {
  if (projectPool.length) {
    return projectPool.pop();
  } else {
    return document.createElement("playground-project");
  }
}

// return a project element to the pool for reuse
const returnProjectToPool = (project) => {
    projectPool.push(project);
}

export default function Editor({html, js, css, mainFile = "main.js" }) {
  const projectContainerRef = useRef(null);
  const projectRef = useRef(null);
  const previewRef = useRef(null);
  const tabBarRef = useRef(null);
  const fileEditorRef = useRef(null);

  const [firstRender, setFirstRender] = useState(true);
  // name is set on iframe so it can be passed back in resize message to identify which iframe is resized
  const iframeId = useId();
  const [editorVisible, setEditorVisible] = useState(false);
  const [btnText, setButtonText] = useState("Edit");
  const {siteConfig, siteMetadata} = useDocusaurusContext();
  const { theme, setTheme } = useContext(ThemeContext);
  const { contentDensity, setContentDensity } = useContext(ContentDensityContext);
  const { textDirection, setTextDirection } = useContext(TextDirectionContext);

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
    return new URL(baseUrl, origin).toString();
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

  const baseUrl = useBaseUrl("/");

  useEffect(() => {
    projectRef.current = getProjectFromPool();
    projectRef.current.config = {
      files: {
        "index.html": {
          content: addImportMap(fixAssetPaths(html)),
        },
        "playground-support.js": {
          content: playgroundSupport({theme, textDirection, contentDensity, iframeId}),
          hidden: true,
        },
        [mainFile]: {
          content: `/* playground-hide */
import "./playground-support.js";
/* playground-hide-end */
${fixAssetPaths(js)}`
        },
        "main.css": {
          content: css,
          hidden: !css,
        },
      },
      importMap: {
        "imports": {
          "@ui5/webcomponents/": `${getHostBaseUrl()}local-cdn/main/`,
          "@ui5/webcomponents-fiori/": `${getHostBaseUrl()}local-cdn/fiori/`,
          "@ui5/webcomponents-base/": `${getHostBaseUrl()}local-cdn/base/`,
          "@ui5/webcomponents-icons/": `${getHostBaseUrl()}local-cdn/icons/`,
          "@ui5/webcomponents-localization/": `${getHostBaseUrl()}local-cdn/localization/`,
          "@ui5/webcomponents-theming/": `${getHostBaseUrl()}local-cdn/theming/`
        }
      }
    }
    projectContainerRef.current.appendChild(projectRef.current)

    const messageHandler = async (event) => {
      if (event.data.height && event.data.iframeId === iframeId) {
        previewRef.current.iframe.style.height = `${event.data.height}px`;
      }
    }
    window.addEventListener("message", messageHandler);

    previewRef.current.project = projectRef.current;
    tabBarRef.current.project = projectRef.current;
    fileEditorRef.current.project = projectRef.current;

    tabBarRef.current.editor = fileEditorRef.current;

    return function () {
      // component cleanup
      window.removeEventListener("message", messageHandler);
      returnProjectToPool(projectRef.current);
    }
  }, []);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    // setting has changed but exising project config is there
    // update the playground-support.js only with the new settings so refresh works correctly
    const newConfig = JSON.parse(JSON.stringify(projectRef.current.config));
    newConfig.files["playground-support.js"].content = playgroundSupport({theme, textDirection, contentDensity, iframeId});
    projectRef.current.config = newConfig;
  }, [theme, contentDensity, textDirection]);

  return (
    <>
      <div ref={projectContainerRef}></div>
      <div style={{display: "flex", flexDirection: "column", border: "1px solid hsla(203, 50%, 30%, 0.15)", boxShadow: "var(--ifm-color-secondary) 0 0 3px 0", borderRadius: "0.5rem", overflow: "hidden" }}>
        <playground-preview class={ styles.previewResultHidden } style={{ height: "unset", minHeight: "7rem" }} ref={previewRef}></playground-preview>
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