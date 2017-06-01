import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {deleteEntry} from './../../actions/search.js';

class DeleteButtonV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {deleted: false};
    }

    onDelete() {
        this.props.onDelete(this.props.tableName, this.props.id);
        this.setState({deleted: true});
    }

    render() {
        if (!this.state.deleted) {
            return (<img src={server_url + "/del_ico.png"} height={20} width={20} onClick={this.onDelete.bind(this)}/>);
        } else {
            return (<Button bsStyle="info">Deleted</Button>);
        }
    } 
}

const mapStateToProps = (state, ownProps) => {
    return {
        tableName: ownProps.tableName,
        id: ownProps.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: (tableName, id) => dispatch(deleteEntry(tableName, id))
    };
};

export const DeleteButton = connect(mapStateToProps, mapDispatchToProps)(DeleteButtonV);