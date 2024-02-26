import React from 'react';

export default function MethodsTable({ method }) {
    return <table>
        <tbody>
            <tr>
                <td><b>Description</b></td>
                <td dangerouslySetInnerHTML={{ __html: method.description }}></td>
            </tr>
            <tr>
                <td><b>Return type</b></td>
                <td>{method.return?.type?.text}</td>
            </tr>
            {method.parameters && <tr>
                <td><b>Parameters</b></td>
                <td>{method.parameters?.map(parameter => {
                    return <><b>{parameter.name}</b>: {parameter.type?.text}
                        <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: parameter.description }}></p>
                        {parameter._ui5since && <>
                            Available since: {parameter._ui5since}
                            <br />
                        </>}
                        {parameter.deprecated && <>
                            Deprecated: {parameter.deprecated}
                            <br />
                        </>}
                    </>
                })}</td>
            </tr>}
            {method._ui5since && <tr>
                <td><b>Available since</b></td>
                <td>{method._ui5since}</td>
            </tr>}
            {method.deprecated && <tr>
                <td><b>Deprecated</b></td>
                <td>{method.deprecated}</td>
            </tr>}
        </tbody>
    </table>
}