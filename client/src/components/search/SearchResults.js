import React from 'react';
import {Panel, Well} from 'react-bootstrap';
import {ResultTable} from './../ResultTable.js';

const prettyTableName = name => name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ');
export const SearchResults = ({results}) => {
    return (
        <div className="searchresults">
            <Well>
                <h2>Results</h2>
                {results.filter(t => t.data.length != 0).map(t =>
                                <Panel key={prettyTableName(t.tableName)} header={t.tableName} bsStyle="info">
                                    <ResultTable tableName={t.tableName} fieldNames={t.fieldNames} data={t.data} deletable={true}/>
                                </Panel>)}
            </Well>
        </div>
    );
};
