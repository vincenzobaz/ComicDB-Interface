import React from 'react';
import {Grid, Row} from 'react-bootstrap';
import {SearchInput} from './SearchInput.js';
import {Server} from './ComicDBServer.js'
import {connect} from 'react-redux';
import {fetchTableListReceived, searchResultReceived} from './actions/index.js'

function SearchV({searchResults}) {
    return(
        <div className="search">
            <SearchInput />
            <Grid>
                <Row>
                    {searchResults && <h2> Results </h2>}
                    {searchResults && <p> {searchResults} </p>}
                </Row>
            </Grid>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    Server.fetchTableList().then(ls => dispatch(fetchTableListReceived(ls)));
    return {};
}

const mapStateToProps = (state = new Map()) => {
    return {
        searchResults: state.get('searchResults', false),
    };
}

export const Search = connect(mapStateToProps, mapDispatchToProps)(SearchV);
