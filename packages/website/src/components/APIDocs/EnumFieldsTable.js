import React from 'react';

export default function EnumFieldsTable({ declaration }) {
    const enumFields = declaration.members?.filter(member => member.kind === "field") || [];

    if (!enumFields.length) {
        return "No enum fields available for this component."
    }

    return <table style={{
            display: "table",
            borderRadius: "0.5rem",
            boxShadow: "inset 0 0 0 1px var(--ifm-table-border-color)",
            borderStyle: "hidden",
        }}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {
                enumFields.map((field, idx) => {
                    return <tr key={"enum" + idx}>
                        <td><b>{field.name}</b></td>
                        <td dangerouslySetInnerHTML={{__html: field.description}}></td>
                    </tr>
                })
            }
        </tbody>
    </table>
}