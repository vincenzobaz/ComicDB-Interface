    import React from 'react';
import {Button, FormGroup, FormControl, Grid, Row, Col} from 'react-bootstrap';
import {AdvancedSettings} from './AdvancedSettingsDialog.js';
import {Server} from './../../ComicDBServer.js'
import {connect} from 'react-redux';
import {search, toggleSearchSettings} from './../../actions/search.js'

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
      return (
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
          <Button
            bsSize="large"
            bsStyle="primary"
            onClick={this.onSearchClick.bind(this)}>
                Search
          </Button>
          <div className="adv-search-settings-button">
            <Button
              bsSize="large"
              bsStyle="success"
              onClick={this.props.onShowSettings}>
                Advanced Options
            </Button>
          </div>
	      </form>
      );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchRun: args => dispatch(search(args)),
        onShowSettings: () => dispatch(toggleSearchSettings())
    };
};

const mapStateToProps = (state) => {
    return {
        enabledTables: state.get('search').get('enabledTables'),
        showSettings: state.get('search').get('showAdvancedSettings', false)
    };
};

export const SearchInput = connect(mapStateToProps, mapDispatchToProps)(SearchInputV);
