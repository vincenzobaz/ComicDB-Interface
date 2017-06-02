import React from 'react';
import {Panel, Well} from 'react-bootstrap';
import {ResultTable} from './../ResultTable.js';

const prettyTableName = name => name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ');

const removeIndex = tableResult => {
    const id_index = tableResult.fieldNames.findIndex(n => n == 'id');
    return {
        tableName: tableResult.tableName,
        data: tableResult.data.map(r => r.filter((el, idx) => idx != id_index)),
        fieldNames: tableResult.fieldNames.filter((n, i) => i != id_index),
        id_index: id_index
    };
};

export const SearchResults = ({results, showid}) => {
    const res = showid ? results : results.map(t => removeIndex(t));
    return (
        <div className="searchresults">
            <Well>
                <h2>Results</h2>
                {res.filter(t => t.data.length != 0).map(t =>
                                <Panel key={prettyTableName(t.tableName)} header={t.tableName} bsStyle="info">
                                    <ResultTable tableName={t.tableName} fieldNames={t.fieldNames} data={t.data} deletable={true}/>
                                </Panel>)}
            </Well>
        </div>
    );
};
