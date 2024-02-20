import React from 'react';

export default function MethodsTable({ declaration }) {
    const methods = declaration.members?.filter(member => member.kind === "method") || [];

    if (!methods.length) {
        return "No methods available for this component."
    }

    // return methods.map(method => {
    //     return <>
    //         <h3>{method.name}</h3>
    //         <p>{method.description}</p>
    //         <table>
    //             <tr>
    //                 <td><b>Return type</b></td>
    //                 <td>{method.return?.type?.text || "-"}</td>
    //             </tr>
    //             <tr>
    //                 <td><b>Arguments</b></td>
    //                 <td>{method.parameters?.map(param => {
    //                     return <>
    //                         <code>{param.name}: {param.type?.text}</code><br />
    //                         <code>{param.name}: {param.type?.text}</code><br />
    //                         <code>{param.name}: {param.type?.text}</code>
    //                     </>
    //                 })}</td>
    //             </tr>
    //         </table>

    //         {/* <p>Type: {method.return?.type?.text}</p>
    //         <p><b>Arguments:</b>
    //             <ul>
    //                 {
    //                     method.parameters?.map(parameter => {
    //                         return <li>
    //                             <b>{parameter.name}:</b> {parameter.type?.text}
    //                             <p>{parameter.description}</p>
    //                         </li>
    //                     })
    //                 }
    //             </ul>
    //         </p> */}
    //     </>
    // })

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