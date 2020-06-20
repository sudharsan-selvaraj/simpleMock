import React, {Component} from "react";
import {InputGroup, FormControl} from 'react-bootstrap';

class CustomTextarea extends Component{
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <InputGroup className="mb-3">
                    <FormControl as="textarea" id={this.props.name}
                         aria-label={this.props.name}
                         onChange={this.props.change}
                         value={this.props.value}
                        placeholder={this.props.placeholder}/>
                </InputGroup>
            </div>
        )
    }
}

export default CustomTextarea;