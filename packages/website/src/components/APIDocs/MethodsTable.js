import React from 'react';

export default function MethodsTable({ method }) {
    return <table style={{
            display: "table",
            borderRadius: "0.5rem",
            boxShadow: "inset 0 0 0 1px var(--ifm-table-border-color)",
            borderStyle: "hidden",
        }}>
        <tbody>
            <tr>
                <td>Description</td>
                <td dangerouslySetInnerHTML={{ __html: method.description }}></td>
            </tr>
            <tr>
                <td>Return type</td>
                <td>{method.return?.type?.text}</td>
            </tr>
            {method.parameters && <tr>
                <td>Parameters</td>
                <td>{method.parameters?.map((parameter, idx) => {
                    return <div key={idx}>{parameter.name}: {parameter.type?.text}
                        <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: parameter.description }}></p>
                        {parameter._ui5since && <>
                            Since: {parameter._ui5since}
                            <br />
                        </>}
                        {parameter.deprecated && <>
                            Deprecated: {parameter.deprecated}
                            <br />
                        </>}
                    </div>
                })}</td>
            </tr>}
            {method._ui5since && <tr>
                <td>Since</td>
                <td>{method._ui5since}</td>
            </tr>}
            {method.deprecated && <tr>
                <td>Deprecated</td>
                <td>{method.deprecated}</td>
            </tr>}
        </tbody>
    </table>
}