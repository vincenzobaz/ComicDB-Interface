import React from 'react';
import {Table} from 'react-bootstrap';
import {DeleteButton} from './search/DeleteButton.js';

const prettyTableName = name => name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ');

export const ResultTable = ({tableName, fieldNames, data, deletable, id_index}) => {
    return (
        <Table responsive>
            <thead>
                <tr>
                    {fieldNames.map(f => <th key={f} >{prettyTableName(f)}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((entry, idx) => <tr key={idx} >{entry.map((att, indx) => <td key={indx}>{att}</td>)} {deletable && <DeleteButton tableName={tableName} id={entry[id_index]}/>} </tr>)}
            </tbody>
        </Table>
    );
};

