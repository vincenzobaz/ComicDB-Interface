import React from 'react';
import {Panel, Well} from 'react-bootstrap';
import {ResultTable} from './../ResultTable.js';

export const SearchResults = ({results}) => {
    return (
        <div className="searchresults">
            <Well>
                <h2>Results</h2>
                {results.filter(t => t.data.length != 0).map(t =>
                                <Panel key={t.tableName} header={t.tableName} bsStyle="info">
                                    <ResultTable fieldNames={t.fieldNames} data={t.data}/>
                                </Panel>)}
            </Well>
        </div>
    );
};
