import React from 'react';
import {Button, Checkbox, Modal} from 'react-bootstrap';
import {Map, OrderedMap} from 'immutable';
import {searchToggleTable, toggleSearchSettings} from './actions/index.js';
import {connect} from 'react-redux';

function AdvancedSettingsDialogV({enabledTables, toggleTable, onClose}) {
    return(
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Advanced Search Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Tables to search:</h4>
                    {enabledTables.map((enabled, table) => <Checkbox key={table} checked={enabled} onChange={toggleTable.bind(null, table)}> {table} </Checkbox>)}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
}

const mapStateToProps = (state = new Map()) => {
    return {
        enabledTables: state.get('tables', new OrderedMap())
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleTable: table => dispatch(searchToggleTable(table)),
        onClose: () => dispatch(toggleSearchSettings())
    }
};

export const AdvancedSettings = connect(mapStateToProps, mapDispatchToProps)(AdvancedSettingsDialogV)
