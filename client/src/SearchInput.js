import React from 'react';
import {Button, FormGroup, FormControl, Grid, Row, Col} from 'react-bootstrap';
import {AdvancedSettings} from './AdvancedSettingsDialog.js';
import {Server} from './ComicDBServer.js'
import {connect} from 'react-redux';
import {toggleSearchSettings, searchResultReceived} from './actions/search.js'

class SearchInputV extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchBoxContent : '' };
    }

    onSearchClick(e) {
        e.preventDefault();
        this.props.onSearchRun(this.state.searchBoxContent);
        this.props.onSearchRun({
		string: this.state.searchBoxContent,
		enabledTables: this.props.enabledTables.filter(v => v).toArray()
	});
    }

    handleChange(e) {
        this.setState({searchBoxContent: e.target.value});
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
                            onClick={this.props.onShowSettings}>
                            Advanced Options
                        </Button>
                    </Col>
                </Row>
               <Row>
		       {this.props.showSettings && <AdvancedSettings/>}
               </Row>
               </Grid>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchRun: (args) =>
            Server.search(args).then(result => dispatch(searchResultReceived(result))),
        onShowSettings: () => dispatch(toggleSearchSettings())
    };
};

const mapStateToProps = (state) => {
    return {
        enabledTables: state.get('search').get('enabledTables'),
        showSettings: state.get('search').get('showAdvancedSettings', false)
    }
}

export const SearchInput = connect(mapStateToProps, mapDispatchToProps)(SearchInputV);

