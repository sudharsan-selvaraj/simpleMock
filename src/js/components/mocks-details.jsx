import React, {Component} from "react";
import CustomInput from './custom-input';
import CustomTextarea from "./custom-textarea";
import CustomInputDropdown from "./custom-input-dropdown";
import {Button} from "react-bootstrap";
import {UPDATE_MOCK} from "../actions/mocks.actions";

class MocksDetails extends Component {
    constructor() {
        super();

        let currentAppState = Store.getState();

        this.state = {
            mock: currentAppState.mocks[currentAppState.selectedMock],
            index: currentAppState.selectedMock,
            hasUnsavedChanges: false
        };

        Store.subscribe(() => {
            currentAppState = Store.getState();

            if (currentAppState.selectedMock > -1) {
                this.setState({
                    mock: currentAppState.mocks[currentAppState.selectedMock],
                    index: currentAppState.selectedMock,
                    hasUnsavedChanges: false
                });
            }
            else {
                this.setState({
                    mock: undefined,
                    index: -1
                });
            }
        });

        this.change = this.change.bind(this);
    }

    change(name) {
        return (e) => {
            this.setState({
                mock: {
                    ...this.state.mock,
                    [name]: e.target.value
                },
                hasUnsavedChanges: true
            });
        };
    }

    changeDropdown(e) {
        this.setState({
            mock: {
                ...this.state.mock,
                'method': e.target.textContent
            },
            hasUnsavedChanges: true
        });
    }

    save() {
        Store.dispatch({
            type: UPDATE_MOCK,
            index: this.state.index,
            mock: this.state.mock
        });
    }

    render() {
        if (this.state.mock) {
            return (
                <div className={'mocks-details inline-block'}>
                    <CustomInput name={'Name'}
                                 value={this.state.mock.name}
                                 change={this.change('name')}></CustomInput>

                    <CustomInputDropdown name={'Endpoint'}
                                 value={this.state.mock.endpoint}
                                 change={this.change('endpoint')}
                                 dropdownValue={this.state.mock.method}
                                 changeDropdown={this.changeDropdown.bind(this)}></CustomInputDropdown>

                    <CustomTextarea name={'Body'} placeholder={'Respond with'}
                                    value={this.state.mock.body}
                                    change={this.change('body')}></CustomTextarea>

                    <div className={'mocks-details--control-panel text-left'}>
                        <Button variant="primary" onClick={this.save.bind(this)}
                                className={'mr-3'} disabled={!this.state.hasUnsavedChanges}>save</Button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={'mocks-details inline-block'}>
                    <div className={'center no-data'}>
                        Select a mock from the panel to edit.
                    </div>
                </div>
            )
        }
    }
}

export default MocksDetails;
