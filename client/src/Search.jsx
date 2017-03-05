import React from 'react';
import {Button, ControlLabel, FormGroup, FormControl, Grid, Row, Col} from 'react-bootstrap';
import {AdvancedSettings} from './AdvancedSettingsDialog.jsx';

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
        this.fetchListTable();
    }

    fetchListTable() {
        const addToState = ls => this.setState({enabledTables: new Map(ls.map(el => [el, false]))});
        fetch("http://localhost:3000/tables_list", {
            method: "get"
        }).then(r => r.json()).then(addToState.bind(this));
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

    toggleSettingsDialog() {
        this.setState({showSettings: !this.state.showSettings})
        console.log(this.state.enabledTables);
    }

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
                <Button
                    bsStyle="success"
                    onClick={this.toggleSettingsDialog.bind(this)}
                    >
                        Advanced Options
                </Button>
                {this.state.showSettings && <AdvancedSettings enabledTables={this.state.enabledTables} closeFunction={this.toggleSettingsDialog.bind(this)}/>}
                {this.state.searching && <h2> Results </h2>}
                {this.state.searching && <p> {"Searching " + this.state.searchString} </p>}
            </div>
        );
    }

}
