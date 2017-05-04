import React from 'react';
import {connect} from 'react-redux';
import {ReactSpinner} from './../Spinner.js';
import {ResultTable} from './../ResultTable.js';

const QueryV = ({pending, result}) => {
    return (
        <div>
            {pending ? <ReactSpinner /> : <ResultTable fieldNames={result.fieldNames} data={result.data} />}
        </div>
    );
};

const mapStateToProps = (state, {index}) => {
    const currPredef = state.get('predef').get(index);
    return {
        pending: currPredef == null ? false : currPredef.get('pending'),
        result: currPredef == null ? {fieldNames: [], data: []} : currPredef.get('result')
    };
};


export const Query = connect(mapStateToProps)(QueryV);