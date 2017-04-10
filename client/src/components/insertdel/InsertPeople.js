import React from 'react';
import {connect} from 'react-redux';
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';

class InsertPeopleV extends React.Component {
	constructor(props) {
		super(props);
		this.state = {name : ''};
	}

	handleChange(e) {
		this.setState({name: e.target.value})
	}

	isValid() {
		const name = this.state.name;
		if (name === "Bob le bricoleur") return 'error';
		if (name.length <= 3 && name.length > 0) return 'error';
		if (name.split(' ').length > 2) return 'warning';
		if (name.length > 3) return 'success' 
	}

	onSubmit(name) {
		this.props.submit(this.state.name);
		this.setState({name: ''});
	}

	render() {
		return (
			<form>
				<FormGroup validationState={this.isValid()}>
					<ControlLabel> Name </ControlLabel>
					<FormControl
						type="text"
						value={this.state.name}
						onChange={this.handleChange.bind(this)}/>
					<FormControl.Feedback/>
				</FormGroup>
				<Button
					disabled={this.isValid() !== 'success'}
					onClick={this.onSubmit.bind(this)}>
					Add to database
				</Button>
			</form>

		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		submit: t => console.log(t)
	};
};

export const InsertPeople = connect(mapDispatchToProps)(InsertPeopleV)


