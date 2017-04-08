import React from 'react';
import {Grid, PageHeader, Row, Tab, Tabs} from 'react-bootstrap';
import {Search} from './Search.js';
import {PredefQueries} from './PredefQueries.js';
import {InsertDelete} from './InsertDelete.js';

export function MainWindow(props) {
    return(
        <Grid>
            <Row className="navbar">
                <PageHeader>ComicDB Web Interface</PageHeader>
                <Tabs id="tab-chooser">
                    <Tab eventKey={'search'} title="Search"><Search/></Tab>
                    <Tab eventKey={'prefqueries'} title="Predefined Queries"> <PredefQueries/></Tab>
                    <Tab eventKey={'insdel'} title="Insert/Delete" ><InsertDelete/></Tab>
                </Tabs>
            </Row>
        </Grid>
    );
}