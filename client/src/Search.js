import React from 'react';
import {Grid, Row, Well} from 'react-bootstrap';
import {SearchInput} from './components/search/SearchInput.js';
import {Server} from './ComicDBServer.js'
import {connect} from 'react-redux';
import {fetchTableListReceived} from './actions/index.js'

function SearchV({searchResults}) {
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
    Server.fetchTableList().then(ls => dispatch(fetchTableListReceived(ls)));
    return {};
}

const mapStateToProps = (state) => {
    return {
        searchResults: state.get('data').get('searchResults', false),
    };
}

export const Search = connect(mapStateToProps, mapDispatchToProps)(SearchV);
