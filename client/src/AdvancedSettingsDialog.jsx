import React from 'react';
import {Button, FormGroup, Checkbox, Modal} from 'react-bootstrap';

export class AdvancedSettings extends React.Component{
    constructor(props) {
        super(props);
        const enabledTables = props.enabledTables;

        let tableList = [];
        let enabled = [];

        enabledTables.forEach((v, k, m) => {
            tableList.push(k);
            enabled.push(v);
        });

        this.state = {
            tables: tableList,
            enabled: enabled
        };

        this.map = enabledTables;
        this.closeFunction = props.closeFunction;
    }

    handleClick(idx) {
        let enabled = this.state.enabled;
        enabled[idx] = !enabled[idx];
        this.setState({enabled: enabled});

        this.map.set(this.state.tables[idx], enabled[idx]);
    }

    createEnabledMap(list, values) {
        let result = {};
        list.forEach((t, i) => result[t] = values[i]);
        return result;
    }

    render() {
        return(
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Advanced Search Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tables to search:
                        {this.state.tables.map((table, idx) => <Checkbox key={table} checked={this.state.enabled[idx]} onChange={this.handleClick.bind(this, idx)}> {table} </Checkbox>)}
            </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.closeFunction.bind(this.createEnabledMap.bind(null, this.state.tables, this.state.enabled))}
                        >
                            Close
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}