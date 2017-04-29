import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import {insert} from './../../actions/insertdel.js';

// TODO: Container (with connect)
// TODO: Submit
class InsertPublishersV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            year_began: '',
            year_ended: '',
            notes: '',
            url: ''
        };
    }

    validYearsRange() {
        const year = (new Date()).getFullYear();
        const start = this.state.year_began;
        const end = this.state.year_ended;
        if (start == '' || end == '') return;
        const validStart = start < year;
        const validEnd = start < end;
        return (validStart && validEnd) ? 'success': 'error';
    }

    canSubmit() {
       return this.state.name != '' &&
             this.state.year_began != '' &&
             this.state.year_ended != '' &&
             this.validYearsRange() === 'success';
    }

    render() {
        const saveName = e => this.setState({name: e.target.value});
        const saveNotes = e => this.setState({notes: e.target.value});
        const saveYearBegan = e => this.setState({year_began: e.target.value});
        const saveYearEnded = e => this.setState({year_ended: e.target.value});
        const saveUrl = e => this.setState({url: e.target.value});

        return (
            <div className="insertpublishers">
                <h2> Insert a Publisher </h2>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                value={this.state.name}
                                onChange={saveName.bind(this)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={this.validYearsRange()}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Active from
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                type="text"
                                value={this.state.year_began}
                                onChange={saveYearBegan.bind(this)}/>
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                            To
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                type="text"
                                value={this.state.year_ended}
                                onChange={saveYearEnded.bind(this)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Url
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                value={this.state.url}
                                onChange={saveUrl.bind(this)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Notes
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                value={this.state.notes}
                                componentClass="textArea"
                                onChange={(saveNotes.bind(this))}/>
                        </Col>
                    </FormGroup>
                    <Button
                        disabled={!this.canSubmit()}
                        onClick={/*TODO*/ () => console.log('submit')}>
                        Add to database
                    </Button>
                </Form>
           </div>
        );
    }
}

export const InsertPublishers = connect()(InsertPublishersV);