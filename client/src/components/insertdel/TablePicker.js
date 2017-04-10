import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Server} from './../../ComicDBServer.js'
import {fetchTableListReceived} from './../../actions/index.js'
import {activateInsertPanel} from './../../actions/insertdel.js'

function TablePickerV({activePanel, tableList, activatePanel}) {
	return(
		<div className="tablepicker">
			<h4> Choose a table </h4>
			<div className="selectors">
				{tableList && tableList.map(t => <Button
					key={t}
					active={activePanel == t}
					bsSize='large'
					onClick={activatePanel.bind(null, t)}
					block> {t} </Button>)}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		activePanel: state.get('insertdel').get('activePanel'),
		tableList: state.get('data').get('tables')
	};
};

const mapDispatchToProps = dispatch => {
    Server.fetchTableList().then(ls => dispatch(fetchTableListReceived(ls)));
    return {
	    activatePanel: t => dispatch(activateInsertPanel(t))
    };
}

export const TablePicker = connect(mapStateToProps, mapDispatchToProps)(TablePickerV)

