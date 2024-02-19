import React from 'react';
import { useRef, useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import playgroundSupport from "./playground-support.js";

if (ExecutionEnvironment.canUseDOM) {
  require('playground-elements');
}

let lightTheme = true;

function setTheme(theme) {
  [...document.querySelectorAll("playground-ide")].forEach(ide => {
    ide.shadowRoot.querySelector("playground-preview").iframe.contentWindow.postMessage({theme}, "*");
  });

  [...document.querySelectorAll("playground-preview")].forEach(preview => {
    preview.iframe.contentWindow.postMessage({theme}, "*");
  })
}

function toggleTheme () {
  lightTheme = !lightTheme;
  setTheme(lightTheme ? "sap_horizon" : "sap_horizon_dark");
};

export default function Editor({html, js}) {
  const projectRef = useRef(null);
  const previewRef = useRef(null);
  const tabBarRef = useRef(null);
  const fileEditorRef = useRef(null);

  // name is set on iframe so it can be passed back in resize message to identify which iframe is resized
  const [iframeName, setIframeName] = useState(`${Date.now()}`)
  const [editorVisible, setEditorVisible] = useState(true);
  const [iframeHeight, setIframeHeight] = useState("150px");

  function toggleEditor() {
    setEditorVisible(!editorVisible);
  }

  useEffect(() => {
    window.addEventListener("message", async (event) => {
      console.log("equal names", event.data.name === iframeName)
      if (event.data.height && event.data.name === iframeName) {
        previewRef.current.iframe.style.height = `${event.data.height}px`;
      }
    });
    previewRef.current.project = projectRef.current;
    tabBarRef.current.project = projectRef.current;
    fileEditorRef.current.project = projectRef.current;

    tabBarRef.current.editor = fileEditorRef.current;

    // the name attribute on the iframe is accessible from the content as window.name
    previewRef.current.iframe.name = iframeName;
  }, []);

  return (
    // <BrowserOnly fallback={<div>Enable Javascript to see the example!</div>}>
    //      {
    //          () =>
            <>
              <button onClick={toggleTheme}>toggle theme</button>
              <button onClick={toggleEditor}>toggle editor</button>
              <playground-project ref={projectRef} id="btn-project" resizable>
                  <script type="sample/html" filename="index.html">
                      {html}
                  </script>

                  <script type="sample/js" hidden filename="playground-support.js">
                    {playgroundSupport}
                  </script>
                  <script type="sample/js" filename="main.js">
                    {`/* playground-hide */
import "./playground-support.js";
/* playground-hide-end */
${js}`}
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