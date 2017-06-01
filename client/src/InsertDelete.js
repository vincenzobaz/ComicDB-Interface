import React from 'react';
import {Button, Col, Grid, Row} from 'react-bootstrap';
import {TablePicker} from './components/insertdel/TablePicker.js';
import {connect} from 'react-redux';
import {InsertPeople} from './components/insertdel/InsertPeople.js';
import {InsertStories} from './components/insertdel/InsertStories.js';
import {InsertIssues} from './components/insertdel/InsertIssues.js';
import {InsertPublishers} from './components/insertdel/InsertPublishers.js';
import {hideNotif} from './actions/insertdel.js';

const InsertDeleteV = ({activePanel, pending, succesful, hideNotif}) => {
    let msg = '';
    if (succesful) msg = 'Insert successful';
    else msg = 'An error occurred during insert';

    return(
        <div className='insdel'>
            <Grid>
                {succesful != 'LOL' && <Row><h3 onClick={hideNotif}> {msg} </h3> </Row>}
                <Row>
                    <Col md={3}><TablePicker/></Col>
                    <Col md={9}> {chooseMask[activePanel]} </Col>
                </Row>
            </Grid>
        </div>
    );
};

const chooseMask = {
    'Publishers': <InsertPublishers/>,
    'People': <InsertPeople/>,
    //'Stories': <InsertStories/>,
    //'Issues': <InsertIssues/>
};

const mapStateToProps = (state) => {
    return {
        activePanel: state.get('insertdel').get('activePanel'),
        pending: state.get('insertdel').get('pending', false),
        succesful: state.get('insertdel').get('insertWorked', 'LOL')
    };
};

const mapDispatchToProps = dispatch => {
    return {
        hideNotif: () => dispatch(hideNotif())
    };
};

export const InsertDelete = connect(mapStateToProps, mapDispatchToProps)(InsertDeleteV);

