import React from 'react';
import {connect} from 'react-redux';
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import {insert} from './../../actions/insertdel.js';

class InsertPeopleV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name : ''};
    }

    handleChange(e) {
        this.setState({name: e.target.value});
    }

    isValid() {
        const name = this.state.name;
        if (name.length <= 3 && name.length > 0) return 'error';
        if (name.split(' ').length > 2) return 'warning';
        if (name.length > 3) return 'success';
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.submit(this.state.name);
        this.setState({name: ''});
    }

    render() {
        return (
            <div className="insertpeople">
                <h2> Insert a Person </h2>
                <form>
                    <FormGroup validationState={this.isValid()}>
                        <ControlLabel> Name </ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange.bind(this)}/>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <Button
                        type="submit"
                        disabled={this.isValid() !== 'success'}
                        onClick={this.onSubmit.bind(this)}>
                        Add to database
                    </Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submit: name => dispatch(insert('People', {name: name}))
    };
};

export const InsertPeople = connect(null, mapDispatchToProps)(InsertPeopleV);
