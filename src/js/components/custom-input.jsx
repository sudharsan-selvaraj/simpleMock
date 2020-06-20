import React, { Component } from "react";
import {InputGroup, FormControl} from 'react-bootstrap';

class CustomInput extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <div>
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <InputGroup className="mb-3">
                    <FormControl
                        id={this.props.name}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        aria-label={this.props.name}
                        onChange={this.props.change}
                    />
                </InputGroup>
             </div>
        )
    }
}

export default CustomInput;