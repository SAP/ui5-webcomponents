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

  const [editorVisible, setEditorVisible] = useState(true);
  const [iframeHeight, setIframeHeight] = useState("150px");

  function toggleEditor() {
    setEditorVisible(!editorVisible);
  }

  useEffect(() => {
    window.addEventListener("message", async (event) => {
      console.log(event);
      console.log(event.source.parent)
      console.log(previewRef.current.contentWindow)
      console.log(event.source == previewRef.current.contentWindow)
      // console.log(previewRef.current);
      if (event.data.height) {
        // console.log(event.data.height);
        previewRef.current.iframe.style.height = `${event.data.height}px`;
      }
    });
    // console.log(projectRef.current)
    previewRef.current.project = projectRef.current;
    tabBarRef.current.project = projectRef.current;
    fileEditorRef.current.project = projectRef.current;

    tabBarRef.current.editor = fileEditorRef.current;
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