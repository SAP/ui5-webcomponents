import React from 'react';

export default function PropsTable({ property }) {
    return <table style={{
            borderRadius: "0.5rem",
            boxShadow: "inset 0 0 0 1px var(--ifm-table-border-color)",
            borderStyle: "hidden",
        }}>
        <tbody>
            <tr>
                <td><b>Description</b></td>
                <td dangerouslySetInnerHTML={{ __html: property.description }}></td>
            </tr>
            <tr>
                <td><b>Type</b></td>
                <td>{property.type?.text}</td>
            </tr>
            <tr>
                <td><b>Default</b></td>
                <td>{property.default}</td>
            </tr>
            {property._ui5since && <tr>
                <td><b>Since</b></td>
                <td>{property._ui5since}</td>
            </tr>}
            {property.deprecated && <tr>
                <td><b>Deprecated</b></td>
                <td>{property.deprecated}</td>
            </tr>}
        </tbody>
    </table>

}