import React from 'react';
import {Panel, Table} from 'react-bootstrap';

const prettyTableName = name => name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ');

const ResultTable = ({fieldNames, data}) => {
    let j = 0;
    let h = 0;
    return (
        <Table responsive>
            <thead>
                <tr>
                    {fieldNames.map(f => <th key={f} >{prettyTableName(f)}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map(entry => <tr key={j++} >{entry.map(att => <td key={h++}>{att}</td>)} </tr>)}
            </tbody>
        </Table>
    );
};

export const SearchResults = ({results}) => {
    return (
        <div>
            <h2>Results</h2>
             {results.filter(t => t.data.length != 0).map(t =>
                            <Panel key={t.tableName} header={t.tableName} bsStyle="warning">
                                <ResultTable fieldNames={t.fieldNames} data={t.data}/>
                            </Panel>)}
        </div>
    );
};
