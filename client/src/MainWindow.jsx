import React from 'react';
import {Grid, PageHeader, Row, Tab, Tabs} from 'react-bootstrap';
import {Search} from './Search.jsx';
import {PredefQueries} from './PredefQueries.jsx';
import {InsertDelete} from './InsertDelete.jsx';

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