import React from 'react';
import {Button, Modal, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import {login} from './actions/index.js';

class LogInV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : '',
            pass: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onLogin(this.state.user, this.state.pass);
    }

    render() {
        const saveName = e => this.setState({user: e.target.value});
        const savePass = e => this.setState({pass: e.target.value});
        return (
            <Modal show={!this.props.isLoggedIn}>
                <Modal.Header>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <FormGroup>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.user}
                                onChange={saveName.bind(this)}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.pass}
                                onChange={savePass.bind(this)}/>
                        </FormGroup>
                        <div className="login-button">
                            <Button 
                                type="submit"
                                onClick={this.onSubmit.bind(this)}>
                                Log In
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.get('data').get('isLoggedIn', false)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (user, pass) => dispatch(login(user, pass))
    };
};

export const LogIn = connect(mapStateToProps, mapDispatchToProps)(LogInV);