import React from 'react';
import {Grid, Row, Well} from 'react-bootstrap';
import {SearchInput} from './components/search/SearchInput.js';
import {Server} from './ComicDBServer.js'
import {connect} from 'react-redux';
import {tablelist} from './actions/index.js'

const SearchV = ({searchResults}) => {
    return(
        <div className="search">
            <SearchInput />
            <Grid>
                <Row>
                    {searchResults && <h2> Results </h2>}
                    {searchResults && <Well><p> {searchResults} </p></Well>}
                </Row>
            </Grid>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    dispatch(tablelist());
    return {};
}

const mapStateToProps = (state) => {
    return {
        searchResults: state.get('search').get('searchResults', false),
    };
}

export const Search = connect(mapStateToProps, mapDispatchToProps)(SearchV);

