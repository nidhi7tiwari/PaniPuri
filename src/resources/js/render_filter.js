import React from 'react';
import Select from 'react-select';
import _ from 'underscore';
import Page from "./common/page";


export default class RenderFilter extends Page{
    constructor(props){
        super(props);
        _.bindAll(this, 'searchClick');
    }

    searchClick(){
        const filter = this.props.filter;
        const error = filter.validate();
        if(error.length) {
            const errorMessage = this.getFirstMessage(error);
            this.props.setError({main: errorMessage});
            return;
        }
        this.props.searchClick();
    }

    render(){
        let options = [
            {value:"what",label:"What"},
            {value:"where",label:"Where"}
        ];
        return(
            <div className="row margin-top-3">
                <div className="col-md-2 offset-md-4 col-6 offset-1">
                    <Select
                        multi={false}
                        options={options}
                        onChange={(event) => this.props.changeFilter('sortBy', event)}
                        value={this.props.filter.get('sortBy')}
                        className="form-group no-outline"
                    />
                </div>
                <div className="col-2">
                    <input
                        id="input-github"
                        type="text"
                        className="form-control"
                        onChange={(event) => this.props.changeFilter("keyword", event.target.value)}
                        value={this.props.filter.get('keyword')}
                    />
                </div>
                <div className="col-md-1 col-4">
                    <button
                        className="btn btn-primary width-90 margin-left-5"
                        onClick={this.searchClick}
                    >Search</button>
                </div>
            </div>
        )
    }
}
