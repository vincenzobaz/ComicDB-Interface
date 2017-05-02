import React from 'react';
import {Grid, Row, Well} from 'react-bootstrap';
import {SearchInput} from './components/search/SearchInput.js';
import {SearchResults} from './components/search/SearchResults.js';
import {Server} from './ComicDBServer.js';
import {connect} from 'react-redux';
import {tablelist} from './actions/index.js';
import {ReactSpinner} from './components/Spinner.js';

const SearchV = ({searchResults, searchPending}) => {
    return(
        <div className="search">
            <SearchInput />
            <Grid>
                <Row>
                    {searchPending && <ReactSpinner />}
                    {(!searchPending || searchResults) && <Well><SearchResults results={searchResults}/></Well>}
                </Row>
            </Grid>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    dispatch(tablelist());
    return {};
};

const mapStateToProps = (state) => {
    return {
        searchResults: state.get('search').get('searchResults', false),
        searchPending: state.get('search').get('pending', false)
    };
};

export const Search = connect(mapStateToProps, mapDispatchToProps)(SearchV);

