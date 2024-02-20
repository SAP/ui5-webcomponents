import React from 'react';
import { useRef, useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import playgroundSupport from "./playground-support.js";
import useBaseUrl from '@docusaurus/useBaseUrl';

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
  const [iframeName, setIframeName] = useState(`${Date.now()}`)
  const [editorVisible, setEditorVisible] = useState(true);
  const [iframeHeight, setIframeHeight] = useState("150px");

  // samples should use the pattern "../assets/..." for their assets
  // and it will be converted to the aboslute url of the documentation site
  // and served from /static
  function fixAssetPaths(html) {
    return html.replaceAll("../assets/", `${new URL(useBaseUrl("/"), location.origin).toString()}`)
  }
  function toggleEditor() {
    setEditorVisible(!editorVisible);
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
  }, []);

  return (
    // <BrowserOnly fallback={<div>Enable Javascript to see the example!</div>}>
    //      {
    //          () =>
            <>
              <button onClick={toggleEditor}>toggle editor</button>
              <playground-project ref={projectRef} id="btn-project" resizable>
                  <script type="sample/html" filename="index.html" hidden={!html || undefined}>
                      {fixAssetPaths(html)}
                  </script>

                  <script type="sample/js" hidden filename="playground-support.js">
                    {playgroundSupport(new URL(useBaseUrl("/"), location.origin).toString())}
                  </script>
                  <script type="sample/js" filename="main.js"  hidden={!js || undefined}>
                    {`/* playground-hide */
import "./playground-support.js";
/* playground-hide-end */
${js}`}
                  </script>
                  <script type="sample/css" filename="main.css" hidden={!css || undefined}>
                    {css}
                  </script>
              </playground-project>
              <playground-preview style={{height: "unset"}} ref={previewRef}></playground-preview>
                <div style={{display: editorVisible ? "block" : "none"}}>
                  <playground-tab-bar editable-file-system ref={tabBarRef}></playground-tab-bar>
                  <playground-file-editor line-numbers ref={fileEditorRef}></playground-file-editor>
                </div>
            </>
    //      }
    //  </BrowserOnly>
  );
}