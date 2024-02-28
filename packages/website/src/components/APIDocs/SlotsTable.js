import React from 'react';

export default function SlotsTable({ slot }) {
    return <table style={{
            display: "table",
            borderRadius: "0.5rem",
            boxShadow: "inset 0 0 0 1px var(--ifm-table-border-color)",
            borderStyle: "hidden",
        }}>
        <tbody>
            <tr>
                <td>Description</td>
                <td dangerouslySetInnerHTML={{ __html: slot.description }}></td>
            </tr>
            <tr>
                <td>Type</td>
                <td>{slot._ui5type?.text}</td>
            </tr>
            {slot._ui5since && <tr>
                <td>Since</td>
                <td>{slot._ui5since}</td>
            </tr>}
            {slot.deprecated && <tr>
                <td>Deprecated</td>
                <td>{slot.deprecated}</td>
            </tr>}
        </tbody>
    </table>
}