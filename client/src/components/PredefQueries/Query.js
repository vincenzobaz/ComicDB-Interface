import React from 'react';
import {connect} from 'react-redux';
import {ReactSpinner} from './../Spinner.js';
import {ResultTable} from './../ResultTable.js';
import {Map} from 'immutable';

const QueryV = ({pending, result}) => {
    return (
        <div>
            {pending ? <ReactSpinner /> : <ResultTable fieldNames={result.fieldNames} data={result.data} deletable={false} showid={false} />}
        </div>
    );
};

const mapStateToProps = (state, {index}) => {
    const currPredef = state.get('predef', new Map()).get(index);
    return {
        pending: currPredef == null ? false : currPredef.get('pending'),
        result: currPredef == null ? {fieldNames: [], data: []} : currPredef.get('result')
    };
};


export const Query = connect(mapStateToProps)(QueryV);