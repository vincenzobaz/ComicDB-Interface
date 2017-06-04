import React from 'react';
import {Button, Checkbox, ControlLabel, Col, Form, FormControl, FormGroup, Modal} from 'react-bootstrap';
import {Map, OrderedMap} from 'immutable';
import {searchToggleTable, toggleSearchSettings, maxResults, toggleShowId} from '../../actions/search.js';
import {connect} from 'react-redux';

const AdvancedSettingsDialogV = ({enabledTables, toggleTable, show, onClose, setMaxResults, showid, toggleShowId}) => {
    const setMaxRes = e => setMaxResults(e.target.value);
    const poss = [25, 50, 75, 100];
    const selectAll = () => enabledTables.forEach((enabled, table) => !enabled && toggleTable(table));
    const clearAll = () => enabledTables.forEach((enabled, table) => enabled && toggleTable(table));
    return(
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Advanced Search Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Tables to search:</h4>
                    {enabledTables.map((enabled, table) =>
                        <Checkbox
                            key={table}
                            checked={enabled}
                            onChange={toggleTable.bind(null, table)}>
                                {table}
                        </Checkbox>)}
                <Button onClick={selectAll}>Select all</Button>
                <Button onClick={clearAll}>Clear all</Button>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={8}>
                            Maximal number of results
                        </Col>
                        <Col sm={4}>
                            <FormControl componentClass="select" onChange={setMaxRes}>
                                {poss.map((e, idx) => <option key={idx} value={e}> {e} </option>)}
                            </FormControl>
                        </Col>
                    </FormGroup>
                </Form>
            <Checkbox checked={showid} onChange={toggleShowId}> Show IDs </Checkbox>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.get('search').get('showAdvancedSettings', false),
        enabledTables: state.get('search').get('enabledTables', new OrderedMap()),
        showid: state.get('search').get('showid', false)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleTable: table => dispatch(searchToggleTable(table)),
        onClose: () => dispatch(toggleSearchSettings()),
        setMaxResults: n => dispatch(maxResults(n)),
        toggleShowId: () => dispatch(toggleShowId())
    };
};

export const AdvancedSettings = connect(mapStateToProps,
					mapDispatchToProps)
				(AdvancedSettingsDialogV);
