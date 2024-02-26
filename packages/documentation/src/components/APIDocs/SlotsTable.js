import React from 'react';

export default function SlotsTable({ slot }) {
    return <table>
        <tbody>
            <tr>
                <td><b>Description</b></td>
                <td dangerouslySetInnerHTML={{ __html: slot.description }}></td>
            </tr>
            <tr>
                <td><b>Type</b></td>
                <td>{slot._ui5type?.text}</td>
            </tr>
            {slot._ui5since && <tr>
                <td><b>Available since</b></td>
                <td>{slot._ui5since}</td>
            </tr>}
            {slot.deprecated && <tr>
                <td><b>Deprecated</b></td>
                <td>{slot.deprecated}</td>
            </tr>}
        </tbody>
    </table>
}