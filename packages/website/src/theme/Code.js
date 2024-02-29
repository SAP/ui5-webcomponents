import React from 'react';

export default function MDXCode({ children, ...props }) {
    if (!children) {
        return;
    }
    const isFormattedCode = children.match(/\t|@newLineCode@/);
    if (!!isFormattedCode) {
        children = children.replaceAll(/@newLineCode@/g, "\n")

        return  <pre><code {...props} children={children}></code></pre>
    }
    return <code {...props} children={children}></code>;
}