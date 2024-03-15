import React from 'react';
import { useRef, useEffect, useState, useId, useContext } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import playgroundSupport from "./playground-support.js";
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from "./index.module.css";
import { ThemeContext, ContentDensityContext, TextDirectionContext } from "@site/src/theme/Root";
import {encodeToBase64, decodeFromBase64} from "./share.js";
import clsx from "clsx";
import ShareIcon from "../../../local-cdn/local-cdn/icons/dist/v5/share-2.svg";
import { Splitter } from 'react-splitter-light';
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

export default function Editor({html, js, css, mainFile = "main.js", canShare = false, standalone = false, mainFileSelected = false }) {
  const projectContainerRef = useRef(null);
  const projectRef = useRef(null);
  const previewRef = useRef(null);
  const tabBarRef = useRef(null);
  const fileEditorRef = useRef(null);

  const [firstRender, setFirstRender] = useState(true);
  // name is set on iframe so it can be passed back in resize message to identify which iframe is resized
  const iframeId = useId();
  const [editorVisible, setEditorVisible] = useState(false);
  const {siteConfig, siteMetadata} = useDocusaurusContext();
  const { theme, setTheme } = useContext(ThemeContext);
  const { contentDensity, setContentDensity } = useContext(ContentDensityContext);
  const { textDirection, setTextDirection } = useContext(TextDirectionContext);
  const [copied, setCopied] = useState(false);

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
          "lit-html/": "${getHostBaseUrl()}local-cdn/lit-html/",
          "@zxing/library/umd/": "${getHostBaseUrl()}local-cdn/zxing/umd/",
          "@zxing/library/esm5/": "${getHostBaseUrl()}local-cdn/zxing/esm5/"
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
  }

  function share() {
    const files = {};

    // convert file format
    projectRef.current.files.forEach(f => {
      files[f.name] = {
        content: f.content
      };
    });

    // remove import map from index.html
    const htmlContent = files["index.html"].content;
    const startIdx = htmlContent.indexOf(`<script type="importmap">`);
    const endIdx = htmlContent.indexOf(`</script>`) + `</script>`.length;
    files["index.html"].content = htmlContent.substring(0, startIdx) + htmlContent.substring(endIdx)

    // remove playground support
    delete files["playground-support.js"];

    // encode and put in url
    const hash = encodeToBase64(JSON.stringify(files));
    navigator.clipboard.writeText(new URL(`#${hash}`, window.location.href).href);
    setCopied(true);
  }

  const baseUrl = useBaseUrl("/");

  useEffect(() => {
    projectRef.current = getProjectFromPool();
    let newConfig = {
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
${fixAssetPaths(js)}`,
          selected: mainFileSelected,
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
    if (newConfig.files["main.css"].hidden) {
      delete newConfig.files["main.css"];
    }

    if ((location.pathname.endsWith("/play") || location.pathname.endsWith("/play/")) && location.hash) {
      try {
        const sharedConfig = JSON.parse(decodeFromBase64(location.hash.replace("#", "")));
        sharedConfig["index.html"].content = addImportMap(fixAssetPaths(sharedConfig["index.html"].content));
        newConfig.files = {...newConfig.files, ...sharedConfig};
      } catch (e) {
        console.log(e);
      }
    }
    projectRef.current.config = newConfig;
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

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 5000)
    }
  }, [copied]);

  function optionalSplitter(editor, preview) {
    return (
      <>
        { standalone
          ?
            <div style={{width: "100%"}}>
              <Splitter>
                {preview}
                {editor}
              </Splitter>
            </div>
          :
            <div>
              {editor}
              {preview}
            </div>
        }
      </>
    )
  }

  function preview() {
    return (
      <>
        <playground-preview class={clsx(styles.previewResultHidden, {
            [styles['preview-standalone']]: standalone,
            [styles['preview-sample']]: !standalone,
          })}
          style={{ height: "unset", minHeight: "7rem" }} ref={previewRef}
        ></playground-preview>
      </>
    )
  }

  function editor() {
    return (
      <>
        <div
          className={clsx({
            [styles['editor-standalone']]: standalone,
            [styles['editor-sample']]: !standalone,
          })}
          style={{display: editorVisible | standalone ? "block" : "none"}}>
          <playground-tab-bar editable-file-system ref={tabBarRef}></playground-tab-bar>
          <playground-file-editor line-numbers ref={fileEditorRef}></playground-file-editor>
        </div>
      </>
    )
  }

  return (
    <>
      <div ref={projectContainerRef}></div>

      {canShare
        ?
          <>
            <div className={`${styles.editor__toolbar}`}>
              <button
                className={`button button--secondary ${styles.previewResult__share}`}
                onClick={ share }
              >
               <ShareIcon style={{height: "1rem", width: "1rem", marginInlineEnd: "0.5rem" }}/>
                Share
              </button>
              { copied
                ? <div style={ {position: "absolute"} }>
                    <span className={styles["copy-status"]}>&#x2714; Link copied</span>
                  </div>
                : <></>
              }
            </div>
          </>
        :
          <></>
      }

      <div
        className={clsx({
          [styles['container-standalone']]: standalone,
          [styles['container-sample']]: !standalone,
        })}
        style={{ border: "1px solid hsla(203, 50%, 30%, 0.15)", boxShadow: "var(--ifm-color-secondary) 0 0 3px 0", borderRadius: "0.5rem", overflow: "hidden" }}
      >
        {optionalSplitter(preview(), editor())}
        <div className={ `${styles.previewResult__actions}  ${(canShare ? styles.previewResult__hasShare : "")} `}>
        { standalone
          ?
            <></>
          :
            <button
              className={`button ${(editorVisible ? "button--secondary" : "button--primary")} ${styles.previewResult__toggleCodeEditor} ${(canShare ? styles.previewResult__hasShare : "")}` }
              onClick={ toggleEditor }
            >
              {editorVisible ? "Hide code" : "Edit"}
            </button>
        }
        </div>

      </div>
    </>
  );
}