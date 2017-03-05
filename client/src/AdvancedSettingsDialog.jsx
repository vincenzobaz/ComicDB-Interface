import React from 'react';
import {Button, FormGroup, Checkbox, Modal} from 'react-bootstrap';

export function AdvancedSettings(props) {
    // Will need to fetch list of tables from server

    const handleClick = (idx) => console.log("check " + idx);

    return(
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Advanced Search Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Tables to search:
                    <Checkbox onClick={handleClick.bind(null, 1)}>Table 1</Checkbox>
                    <Checkbox>Table 2</Checkbox>
                    <Checkbox>Table 3</Checkbox>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={props.closeFunction}
                    >
                        Close
                </Button>
            </Modal.Footer>
        </Modal.Dialog>
    );

}