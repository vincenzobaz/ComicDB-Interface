import React from 'react';
import {Button, ControlLabel, FormGroup, FormControl, Grid, Row, Col} from 'react-bootstrap';

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBoxContent : '',
            searchString: '',
            searching: false
        };
    }

    handleChange(e) {
        this.setState({searchBoxContent: e.target.value});
    }

    searchButtonHandler() {
        this.setState({
            searching: true,
            searchString: this.state.searchBoxContent
        });
    }

                //<Button> Advanced Options </Button>
    render() {
        return(
            <div className="search">
                <form>
                    <FormGroup>
                        <FormControl
                            type="text"
                            value={this.state.searchBoxContent}
                            placeholder="Type here to search"
                            onChange={this.handleChange.bind(this)}
                        />
                        <FormControl.Feedback/>
                    </FormGroup>
                </form>
                <Button
                    bsSize="large"
                    bsStyle="primary"
                    onClick={this.searchButtonHandler.bind(this)}>
                    Search
                </Button>
                {this.state.searching && <h2> Results </h2>}
                {this.state.searching && <p> {"Searching " + this.state.searchString} </p>}
            </div>
        );
    }

}
