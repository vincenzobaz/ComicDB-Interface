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
    const tables = [];
    for (let k in results) {
        if (results.hasOwnProperty(k) && results[k].data.length != 0) {
            tables.push(k);
        }
    }
    let i = 0;
    return (<div> {tables.map(t =>
                                <Panel key={i++} header={t}>
                                    <ResultTable fieldNames={results[t].fieldNames} data={results[t].data}/>
                                </Panel>)}
                                </div>);
};