import React from 'react';
import {Table} from 'react-bootstrap';
import {DeleteButton} from './search/DeleteButton.js';

const prettyTableName = name => name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ');

export const ResultTable = ({tableName, fieldNames, data}) => {
    const id_index = fieldNames.findIndex(n => n == 'id');
    const fields = fieldNames.filter((n, i) => i != id_index);

    return (
        <Table responsive>
            <thead>
                <tr>
                    {fields.map(f => <th key={f} >{prettyTableName(f)}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((entry, idx) => <tr key={idx} >{entry.filter((el, i) => i != id_index).map((att, indx) => <td key={indx}>{att}</td>)} <DeleteButton tableName={tableName} id={entry[id_index]}/> </tr>)}
            </tbody>
        </Table>
    );
};

