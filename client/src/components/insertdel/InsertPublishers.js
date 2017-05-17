import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import {countriesList, insert} from './../../actions/insertdel.js';

class InsertPublishersV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            year_began: '',
            year_ended: '',
            country_code: '',
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

    onSubmit(e) {
        e.preventDefault();
        this.props.submit({
            name: this.state.name,
            year_began: this.state.year_began,
            year_ended: this.state.year_ended,
            country_code: this.state.country_code,
            notes: this.state.notes,
            url: this.state.url
        });
        this.resetState();
    }

    resetState() {
        this.setState({
            name: '',
            year_began: '',
            year_ended: '',
            country_code: '',
            notes: '',
            url: ''
        });
    }

    render() {
        const saveName = e => this.setState({name: e.target.value});
        const saveNotes = e => this.setState({notes: e.target.value});
        const saveYearBegan = e => this.setState({year_began: parseInt(e.target.value)});
        const saveYearEnded = e => this.setState({year_ended: parseInt(e.target.value)});
        const saveUrl = e => this.setState({url: e.target.value});
        const saveCountryCode = e => this.setState({country_code: e.target.value});

        const years = [];
        for (let i = 1700; i < 2018; ++i) {
            years.push(i);
        }
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
                            <FormControl componentClass="select" onChange={saveYearBegan.bind(this)}>
                                {years.map(y => <option key={y} value={y}> {y}</ option>)}
                            </FormControl>
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                            To
                        </Col>
                        <Col sm={4}>
                            <FormControl componentClass="select" onChange={saveYearEnded.bind(this)}>
                                {years.map(y => <option key={y} value={y}> {y}</ option>)}
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Country
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" onChange={saveCountryCode.bind(this)}>
                                {this.props.countries.map(c => <option
                                     key={c['country_code']}
                                     value={c['country_code']}>
                                        {c['name']}</option> )}
                            </FormControl>
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
                        type="submit"
                        disabled={!this.canSubmit()}
                        onClick={this.onSubmit.bind(this)}>
                        Add to database
                    </Button>
                </Form>
           </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        countries: state.get('insertdel').get('countries', [])
    };
};

const mapDispatchToProps = dispatch => {
    dispatch(countriesList());
    return {
        submit: publisher => dispatch(insert('Publisher', publisher))
    };
};

export const InsertPublishers = connect(mapStateToProps, mapDispatchToProps)(InsertPublishersV);
