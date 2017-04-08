import React from 'react';
import {Button, Col, Grid, Row} from 'react-bootstrap';
import {TablePicker} from './components/insertdel/TablePicker.js';
import {connect} from 'react-redux';

export function InsertDeleteV({activePanel}) {
	return(
		<div className='insdel'>
			<Grid>
				<Col md={2}><TablePicker/></Col>
				<Col md={7}> {chooseMask(activePanel)} </Col>
			</Grid>
		</div>
	);
};

const chooseMask = (activePanel) => {
	switch (activePanel) {
		case 'Authors':
			return(<h2> HELLLOOOO </h2>);
	}
}

const mapStateToProps = (state) => {
	return {
		activePanel: state.get('insertdel').get('activePanel')
	};
};

export const InsertDelete = connect(mapStateToProps)(InsertDeleteV);

