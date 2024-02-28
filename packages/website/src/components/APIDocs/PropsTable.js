import React from 'react';

export default function PropsTable({ property }) {
    return <div style={{ overflowX: "auto", maxWidth: "100%"}}>
        <table style={{
            display: "table",
            borderRadius: "0.5rem",
            boxShadow: "inset 0 0 0 1px var(--ifm-table-border-color)",
            borderStyle: "hidden",
        }}>
        <tbody>
            <tr>
                <td>Description</td>
                <td dangerouslySetInnerHTML={{ __html: property.description }}></td>
            </tr>
            <tr>
                <td>Type</td>
                <td>{property.type?.text}</td>
            </tr>
            <tr>
                <td>Default</td>
                <td>{property.default}</td>
            </tr>
            {property._ui5since && <tr>
                <td>Since</td>
                <td>{property._ui5since}</td>
            </tr>}
            {property.deprecated && <tr>
                <td>Deprecated</td>
                <td>{property.deprecated}</td>
            </tr>}
        </tbody>
    </table>
    </div>
}