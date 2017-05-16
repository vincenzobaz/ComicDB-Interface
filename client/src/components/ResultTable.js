import React from 'react';
import {Table} from 'react-bootstrap';

const prettyTableName = name => name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ');

export const ResultTable = ({fieldNames, data}) => {
    return (
        <Table responsive>
            <thead>
                <tr>
                    {fieldNames.map(f => <th key={f} >{prettyTableName(f)}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((entry, idx) => <tr key={idx} >{entry.map((att, indx) => <td key={indx}>{att}</td>)} </tr>)}
            </tbody>
        </Table>
    );
};

