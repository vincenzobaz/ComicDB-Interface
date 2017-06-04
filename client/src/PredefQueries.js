import React from 'react';
import {connect} from 'react-redux';
import {Accordion, Panel} from 'react-bootstrap';
import {querylist, predefquery} from './actions/predefqueries.js';
import {Map} from 'immutable';
import {Query} from './components/PredefQueries/Query.js';
import {MostReprintedIssue} from './components/PredefQueries/MostReprintedIssue.js';


const PredefQueriesV = ({queryList, queriesDone, performQuery}) => {
    const doQuery = index => !queriesDone[index] && performQuery(index);
    return(
        <div className="predef">
                <Accordion>
                    {queryList.map((q, i) => 
                        <Panel
                             header={q}
                             key={i} 
                             eventKey={i}
                             onClick={() => doQuery(i)}>
                             <Query index={i}/>
                        </Panel>)}
                        <Panel
                            header="3o) Most reprinted story of an issue"
                            eventKey={22}
                            key={22}>
                            <MostReprintedIssue/>
                       </Panel>
                </Accordion>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    dispatch(querylist());
    return {
        performQuery: i => dispatch(predefquery(i))
    };
};

const mapStateToProps = state => {
    const queryList = state.get('predef', new Map()).get('list', []);
    const queriesDone = queryList.map((q, i) => {
        const currQuery = state.get('predef').get(i);
        if (currQuery == null) return false;
        else return currQuery.get('result') != null;
    });
    return {
        queryList: queryList,
        queriesDone: queriesDone
    };
};

export const PredefQueries = connect(mapStateToProps, mapDispatchToProps)(PredefQueriesV);