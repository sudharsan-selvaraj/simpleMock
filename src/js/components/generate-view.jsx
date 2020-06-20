import React, {Component} from "react";
import code from 'raw-loader!../../assets/code';

class GenerateView extends Component{
    constructor() {
        super();

        this.state = Store.getState();
    }

    render() {
        let obj= {};

        this.state.mocks.forEach((d) => {
            obj[d.endpoint] = {
                method: d.method,
                body: d.body
            };
        });

        let snippet = `<script type="text/javacript">let response = ${JSON.stringify(obj)};${code}</script>`;

        return (
            <div className="form-group export-view">
                <label htmlFor="script-textarea">Copy/paste this snippet into your app head</label>
                <textarea className="form-control" id="script-textarea" rows="3">
                        {snippet}
                    </textarea>
            </div>
        );
    }
}

export default GenerateView;
