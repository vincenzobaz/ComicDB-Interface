import React from 'react';
import {connect} from 'react-redux';
import {Button, Form, FormGroup, Col, FormControl} from 'react-bootstrap';
import {mostReprintedIssue} from './../../actions/predefqueries.js';
import {Query} from './Query.js';

class MostReprintedIssueV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: ''};
    }

    onSearch(e) {
        e.preventDefault();
        this.props.onRun(this.state.id);
    }

    render() {
        const saveid = e => this.setState({id: parseInt(e.target.value)});
        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={1}>
                            <h4>Issue id</h4>
                        </Col>
                        <Col sm={8}>
                            <FormControl type="text" value={this.state.id} onChange={saveid.bind(this)}/>
                        </Col>
                        <Col sm={3}>
                            <Button type="submit" onClick={this.onSearch.bind(this)}>Run</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <Query index={22}/>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onRun: id => dispatch(mostReprintedIssue(id))
    };
};

export const MostReprintedIssue = connect(null, mapDispatchToProps)(MostReprintedIssueV);