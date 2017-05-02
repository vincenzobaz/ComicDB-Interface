import React from 'react';
import {Panel, Table} from 'react-bootstrap';

const ResultTable = ({fieldNames, data}) => {
    let i = 0;
    let j = 0;
    let h = 0;
    return (
        <Table responsive>
            <thead>
                <tr>
                    {fieldNames.map(f => <th key={i++} >{f}</th>)}
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
             {results.map(t =>
                            <Panel key={i++} header={t.tableName} bsStyle="warning">
                                <ResultTable fieldNames={t.fieldNames} data={t.data}/>
                            </Panel>)}
        </div>
    );
};
