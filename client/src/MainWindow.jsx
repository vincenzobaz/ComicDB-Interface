import React from 'react';
import {Navbar, Nav, NavItem, Grid, Row} from 'react-bootstrap';
import {Search} from './Search.jsx';
import {PredefQueries} from './PredefQueries.jsx';
import {InsertDelete} from './InsertDelete.jsx';

export class MainWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: 'search'
        };
    }

    changeView(eventKey) {
        this.setState({showing: eventKey});
    }

    selectView() {
        switch (this.state.showing) {
            case 'search':
                return(<Search />);
            case 'prefqueries':
                return(<PredefQueries />);
            case 'insdel':
                return(<InsertDelete />);
        }
    }

    render() {
        return(
            <Grid>
                <Row className="navbar">
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                ComicDB
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav onSelect={this.changeView.bind(this)}>
                            <NavItem eventKey={'search'}>Search</NavItem>
                            <NavItem eventKey={'prefqueries'}>Predefined Queries</NavItem>
                            <NavItem eventKey={'insdel'}>Insert/Delete</NavItem>
                        </Nav>
                    </Navbar>
                </Row>
                <Row className="content">
                    {this.selectView()}
                </Row>
            </Grid>
        );
    }
}