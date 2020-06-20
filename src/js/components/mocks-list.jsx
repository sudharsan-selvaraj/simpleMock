import React, {Component} from "react";
import {ADD_MOCK, DELETE_ALL_MOCK, DELETE_MOCK, SELECT_MOCK, UPLOAD_MOCK} from "../actions/mocks.actions";
import {getMockTemplate} from "../helpers/mock.helper";

class MocksList extends Component {
    constructor() {
        super();

        this.state = Store.getState();

        Store.subscribe(() => {
           this.setState(Store.getState());
        });
    }

    add() {
        let name = prompt("what is the name of the Mock?");
        let endpoint = prompt("what is the endpoint of the Mock?");

        if (name && endpoint) {
            Store.dispatch({
                type: ADD_MOCK,
                mock: getMockTemplate({
                    name,
                    endpoint
                })
            });
            Store.dispatch({
               type: SELECT_MOCK,
               index: Store.getState().mocks.length - 1
            });
        }
    }

    delete(e) {
        let index = $(e.target).closest("li")
            .data("index");

        if (index != undefined) {
            Store.dispatch({
                type: DELETE_MOCK,
                index
            });
        }

        e.stopPropagation();
    }

    select(e) {
        let index = ($(e.target).is("li") ? $(e.target) : $(e.target).closest("li")).data("index");

        if (index != undefined) {
            Store.dispatch({
               type: SELECT_MOCK,
               index
            });
        }
    }

    deleteAll() {
        if (window.confirm("Are you sure?")) {
            Store.dispatch({
                type: DELETE_ALL_MOCK
            });
        }
    }

    upload() {
      $("#uploader").trigger("click");
    }

    handleUpload(e) {
      let file = e.target.files[0];

      let reader = new FileReader();

      reader.readAsText(file);

      reader.onload = function() {
        Store.dispatch({
          type: UPLOAD_MOCK,
          mocks: JSON.parse(reader.result)
        });
      };

      reader.onerror = function() {
        alert("Something went wrong!")
      };

      $("#uploader").val('');
    }

    render() {
        let list = [];

        this.state.mocks.forEach((d, i) => {
            list.push(
                <li className={'clickable ' + (i == this.state.selectedMock ? 'active' : '')} onClick={this.select}
                    data-index={i}>
                    <div className={'mocks-list--name'}>
                        {d.name}
                    </div>
                    <div className={'mocks-list--endpoint'}>
                        <span class="mocks-list--endpoint-method">{d.method}</span>
                        <i class="fas fa-circle"></i>
                        <span>{d.endpoint}</span>
                    </div>
                    <div className={'mocks-list--options'}>
                        <i className={'fas fa-times clickable'} onClick={this.delete}></i>
                    </div>
                </li>
            )
        });

        return (
            <div className={'mocks-list inline-block'}>
                <div className={'mocks-list--control-panel text-right'}>
                    {
                        this.state.mocks.length ? <i className={"fas fa-trash clickable"} onClick={this.deleteAll}></i> : ''
                    }
                    <i class="fas fa-upload clickable" onClick={this.upload}></i>
                    <input type="file" id="uploader" onChange={this.handleUpload} style={{display: "none"}}/>
                    <i className={"fas fa-plus clickable"} onClick={this.add}></i>
                </div>
                {
                    this.state.mocks.length ?
                    <ul>
                        {list}
                    </ul>
                    :
                    <div className={'center no-data'}>
                        Click `<i className={'fas fa-plus'}></i>` to add a Mock.
                    </div>
                }
            </div>
        );
    }
}

export default MocksList;
