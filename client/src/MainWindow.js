import React from 'react';
import { Grid, PageHeader, Tab, Tabs } from 'react-bootstrap';
import { Search } from './Search.js';
import { PredefQueries } from './PredefQueries.js';
import { InsertDelete } from './InsertDelete.js';
import {LogIn} from './LogIn.js';
import {connect} from 'react-redux';

const MainWindowV = ({loggedIn}) => {
    if (loggedIn) {
        return (
            <div>
                <Grid>
                    <PageHeader>ComicDB Web Interface</PageHeader>
                    <Tabs id="tab-chooser" justified={true}>
                        <Tab eventKey={'search'} title="Search"><Search/></Tab>
                        <Tab eventKey={'insdel'} title="Insert/Delete" ><InsertDelete/></Tab>
                        <Tab eventKey={'prefqueries'} title="Predefined Queries"> <PredefQueries/></Tab>
                    </Tabs>
                </Grid>
            </div>
        );
    }
    else return (<LogIn />);
};

const mapStateToProps = state => {
    return {
        loggedIn: state.get('data').get('isLoggedIn', false)
    };
};

export const MainWindow = connect(mapStateToProps)(MainWindowV);