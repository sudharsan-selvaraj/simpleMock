import React, {Component} from "react";
import {InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';

class CustomInputDropdown extends Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div class="dropdown-input">
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <InputGroup className="mb-3">
                    <DropdownButton
                        as={InputGroup.Prepend}
                        variant="outline-secondary"
                        title={this.props.dropdownValue}
                        id="input-group-dropdown-1">
                        <Dropdown.Item href="#" onClick={this.props.changeDropdown}>GET</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={this.props.changeDropdown}>POST</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={this.props.changeDropdown}>PUT</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={this.props.changeDropdown}>PATCH</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={this.props.changeDropdown}>DELETE</Dropdown.Item>
                    </DropdownButton>
                    <FormControl
                        id={this.props.name}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        aria-label={this.props.name}
                        onChange={this.props.change}
                    />
                </InputGroup>
            </div>
        );
    }
}

export default CustomInputDropdown;
