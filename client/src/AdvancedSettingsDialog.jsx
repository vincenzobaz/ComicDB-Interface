import React from 'react';
import {Button, FormGroup, Checkbox, Modal} from 'react-bootstrap';

export class AdvancedSettings extends React.Component{
    constructor(props) {
        super(props);

        let tableList = [];
        let enabled = [];

        props.enabledTables.forEach((v, k, m) => {
            tableList.push(k);
            enabled.push(v);
        });

        this.state = {
            tables: tableList,
            enabled: enabled
        };

        this.map = props.enabledTables;
        this.closeFunction = props.closeFunction;
    }

    handleClick(idx) {
        let enabled = this.state.enabled;
        enabled[idx] = !enabled[idx];
        this.setState({enabled: enabled});

        this.map.set(this.state.tables[idx], enabled[idx]);
    }

    render() {
        return(
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Advanced Search Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Tables to search:</h4>
                        {this.state.tables.map((table, idx) => <Checkbox key={table} checked={this.state.enabled[idx]} onChange={this.handleClick.bind(this, idx)}> {table} </Checkbox>)}
            </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeFunction}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}
