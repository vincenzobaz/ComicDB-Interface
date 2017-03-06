import React from 'react';
import {Grid, Row} from 'react-bootstrap';
import {SearchInput} from './SearchInput.jsx';

export class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enabledTables: null,
            searchResult: null
        };
    }

    saveResults(result) {
        this.setState({searchResult: result})
    }

    render() {
        return(
            <div className="search">
            <Grid>
                <SearchInput onSearchClick={this.saveResults.bind(this)} />
                <Row>
                   {this.state.searchResult && <h2> Results </h2>}
                    {this.state.searchResult && <p> {"Searching " + this.state.searchResult} </p>}
               </Row>
            </Grid>
            </div>
        );
    }
}
