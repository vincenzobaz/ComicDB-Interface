import React from 'react';
import {Button, ControlLabel, FormGroup, FormControl, Grid, Row, Col} from 'react-bootstrap';
import {AdvancedSettings} from './AdvancedSettingsDialog.jsx';
import {fetchTableLists, search} from './ComicDBServer';

export class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBoxContent : '',
            showSettings: false,
            enabledTables: null,
        };
        this.retrieveTableNames();
        this.saveResults = props.onSearchClick;
    }

    onSearchClick(e) {
        e.preventDefault();
        search({
            string: this.state.searchBoxContent,
            enabledTables: this.state.enabledTables
        }).then(result => this.saveResults(result));
    }

    retrieveTableNames() {
        const addToState = ls => this.setState({enabledTables: new Map(ls.map(el => [el, false]))});
        fetchTableLists().then(addToState.bind(this))
    }

    handleChange(e) {
        this.setState({searchBoxContent: e.target.value});
    }

    toggleSettingsDialog() {
        this.setState({showSettings: !this.state.showSettings})
    }

    render() {
        return(
            <Grid>
                <Row>
                    <form onSubmit={this.onSearchClick.bind(this)}>
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
                            onClick={this.onSearchClick.bind(this)}>
                                Search
                        </Button>
                    </Col>
                    <Col xs={6} md={4}></Col>
                    <Col xs={6} md={4}>
                        <Button
                            bsSize="large"
                            bsStyle="success"
                            onClick={this.toggleSettingsDialog.bind(this)}>
                            Advanced Options
                        </Button>
                    </Col>
                </Row>
               <Row>
                    {this.state.showSettings && <AdvancedSettings enabledTables={this.state.enabledTables} closeFunction={this.toggleSettingsDialog.bind(this)}/>}
               </Row>
               </Grid>
        );
    }
}
