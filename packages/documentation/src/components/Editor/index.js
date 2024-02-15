import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  require('playground-elements');
}

export default function Editor({html, js}) {
  return (
    <BrowserOnly fallback={<div>Enable Javascript to see the example!</div>}>
        {
            () =>
            <playground-ide editable-file-system line-numbers resizable>
                <script type="sample/html" filename="index.html">
                    {html}
                </script>

                <script type="sample/js" filename="main.js">
                    {js}
                </script>
            </playground-ide>
        }
    </BrowserOnly>
  );
}