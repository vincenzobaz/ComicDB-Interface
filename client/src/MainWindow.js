import React from 'react';
import { Grid, PageHeader, Tab, Tabs } from 'react-bootstrap';
import { Search } from './Search.js';
import { PredefQueries } from './PredefQueries.js';
import { InsertDelete } from './InsertDelete.js';

export const MainWindow = () => {
    return (
        <Grid>
            <PageHeader>ComicDB Web Interface</PageHeader>
            <Tabs id="tab-chooser" justified={true}>
                <Tab eventKey={'insdel'} title="Insert/Delete" ><InsertDelete/></Tab>
                <Tab eventKey={'search'} title="Search"><Search/></Tab>
                <Tab eventKey={'prefqueries'} title="Predefined Queries"> <PredefQueries/></Tab>
            </Tabs>
        </Grid>
    );
};
