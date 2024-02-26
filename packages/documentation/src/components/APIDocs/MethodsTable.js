import React from 'react';

export default function MethodsTable({ declaration }) {
    const methods = declaration.members?.filter(member => member.kind === "method") || [];

    if (!methods.length) {
        return "No methods available for this component."
    }

    return methods.map((method, idx) => {
        return <>
            <h3>{method.name}</h3>
            <table>
                <tr key={"methods" + idx}>
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
            </table>
        </>
    })

    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Return type</th>
                <th>Description</th>
                <th>Arguments</th>
            </tr>
        </thead>
        <tbody>
            {
                methods.map((method, idx) => {
                    return <tr key={"methods" + idx}>
                        <td>{method.name}</td>
                        <td>{method.return?.type?.text || ""}</td>
                        <td dangerouslySetInnerHTML={{__html: method.description}}></td>
                        <td>{method.parameters?.map(parameter => parameter.name).join(" ") || ""}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
}