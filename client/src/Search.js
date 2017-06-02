import React from 'react';
import {Grid, Row} from 'react-bootstrap';
import {SearchInput} from './components/search/SearchInput.js';
import {SearchResults} from './components/search/SearchResults.js';
import {Server} from './ComicDBServer.js';
import {connect} from 'react-redux';
import {tablelist} from './actions/index.js';
import {ReactSpinner} from './components/Spinner.js';

const SearchV = ({searchResults, searchPending, showid}) => {
    return(
        <div className="search">
            <SearchInput />
            <Grid>
                <Row>
                    {searchPending && <ReactSpinner />}
                    {searchResults && <SearchResults results={searchResults} showid={showid}/>}
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
        searchPending: state.get('search').get('pending', false),
        showid: state.get('search').get('showid', false)
    };
};

export const Search = connect(mapStateToProps, mapDispatchToProps)(SearchV);

