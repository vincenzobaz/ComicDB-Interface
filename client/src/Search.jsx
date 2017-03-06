import React from 'react';
import {Button, ControlLabel, FormGroup, FormControl, Grid, Row, Col} from 'react-bootstrap';
import {AdvancedSettings} from './AdvancedSettingsDialog.jsx';
import {fetchTableLists} from './ComicDBServer';

export class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchBoxContent : '',
            searchString: '',
            searching: false,
            showSettings: false,
            enabledTables: null,
        };
        this.retrieveTableNames();
    }

    retrieveTableNames() {
        const addToState = ls => this.setState({enabledTables: new Map(ls.map(el => [el, false]))});
        fetchTableLists.then(addToState.bind(this))
    }

    handleChange(e) {
        this.setState({searchBoxContent: e.target.value});
    }

    searchButtonHandler(e) {
        e.preventDefault();
        this.setState({
            searching: true,
            searchString: this.state.searchBoxContent
        });
    }

    toggleSettingsDialog() {
        this.setState({showSettings: !this.state.showSettings})
    }

    render() {
        return(
            <div className="search">
            <Grid>
                <Row>
                    <form onSubmit={this.searchButtonHandler.bind(this)}>
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
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <Button
                            bsSize="large"
                            bsStyle="primary"
                            onClick={this.searchButtonHandler.bind(this)}>
                                Search
                        </Button>
                    </Col>
                    <Col xs={6} md={4}></Col>
                    <Col xs={6} md={4}>
                        <Button
                            bsSize="large"
                            bsStyle="success"
                            onClick={this.toggleSettingsDialog.bind(this)}
                            >
                                Advanced Options
                        </Button>
                    </Col>
                </Row>
               <Row>
                    {this.state.showSettings && <AdvancedSettings enabledTables={this.state.enabledTables} closeFunction={this.toggleSettingsDialog.bind(this)}/>}
                    {this.state.searching && <h2> Results </h2>}
                    {this.state.searching && <p> {"Searching " + this.state.searchString} </p>}
               </Row>
            </Grid>
            </div>
        );
    }

}
