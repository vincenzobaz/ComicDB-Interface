import React from 'react';
import {Button, Col, Grid, Row} from 'react-bootstrap';
import {TablePicker} from './components/insertdel/TablePicker.js';
import {connect} from 'react-redux';
import {InsertPeople} from './components/insertdel/InsertPeople.js';
import {InsertStories} from './components/insertdel/InsertStories.js';
import {InsertIssues} from './components/insertdel/InsertIssues.js';
import {InsertPublishers} from './components/insertdel/InsertPublishers.js';

const InsertDeleteV = ({activePanel}) => {
    return(
        <div className='insdel'>
            <Grid>
                <Col md={2}><TablePicker/></Col>
                <Col md={7}> {chooseMask[activePanel]} </Col>
            </Grid>
        </div>
    );
};

const chooseMask = {
    'Publishers': <InsertPublishers/>,
    'People': <InsertPeople/>,
    'Stories': <InsertStories/>,
    'Issues': <InsertIssues/>
};

const mapStateToProps = (state) => {
    return {
        activePanel: state.get('insertdel').get('activePanel')
    };
};

export const InsertDelete = connect(mapStateToProps)(InsertDeleteV);

