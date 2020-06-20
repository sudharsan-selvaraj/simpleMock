import React, { Component } from "react";

import MocksList from "./components/mocks-list";
import MocksDetails from "./components/mocks-details";
import {Button} from "react-bootstrap";
import GenerateView from "./components/generate-view";

class App extends Component {
    constructor() {
        super();

        this.state = {
            generateView: false
        };
    }

    generate() {
        this.setState({
            generateView: true
        });
    }

    export() {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(Store.getState().mocks)));
      element.setAttribute('download', 'mocks.json');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    goBack() {
        this.setState({
            generateView: false
        });
    }

    render() {
        return (
            <div>
                <div className={'app-header clearfix'}>
                    <div className={'app-header--logo pull-left'}>
                        <img src={'./logo.png'} />
                    </div>
                    {
                       !this.state.generateView ?
                           <div className={'app-header--control-panel pull-right'}>
                               <Button variant="primary" onClick={this.generate.bind(this)}
                                       className={'ml-3'}>Generate Script</Button>
                               <Button variant="primary" onClick={this.export.bind(this)}
                                       className={'ml-3'}>export</Button>
                           </div>
                           :
                           <div className={'app-header--control-panel pull-right'}>
                               <Button variant="primary" onClick={this.goBack.bind(this)}
                                       className={'ml-3'}>Go back</Button>
                           </div>
                    }
                </div>
                {
                    this.state.generateView ?
                        <div className={'app-body'}>
                            <GenerateView></GenerateView>
                        </div>
                        :
                        <div className={'app-body'}>
                            <MocksList></MocksList>
                            <MocksDetails></MocksDetails>
                        </div>
                }
            </div>
        );
    }
}

export default App;
