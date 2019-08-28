import React from 'react';
import _ from 'underscore';
import RenderData from './render_data';
import RenderFilter from "./render_filter";
import Records from "../../collection/records";
import Filter from "../model/filter";
import Page from "./common/page";
import ErrorMessage from "./common/error_message";

export default class List extends Page {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: new Records(),
            filter: new Filter({sortBy: {value: "what", label: "What"}}),
            errorMessages: {}
        };
        if (this.props.location.state !== undefined) {
            const data = JSON.parse(this.props.location.state);
            this.state = {
                searchResults: new Records(data.searchResults),
                filter: new Filter(data.filter),
                errorMessages: {}
            }
        }
        _.bindAll(this, 'changeFilterParameters', 'search');
    }

    search() {
        const records = new Records();
        records.fetch({
            url: 'MYSCRIPT.py',
            type: 'GET',
            data: {
                keyword: this.state.filter.get('keyword'),
                sortBy: this.state.filter.get('sortBy')
            },
            success: () => {
                records.comparator = this.state.filter.get('sortBy')["value"];
                records.sort();
                this.setState({searchResults: records, errorMessages: {}});
            },
            error: () => {
                this.setState({errorMessages: {main: "SERVER_ERROR_TRY_LATER"}});
            }
        });
    }

    changeFilterParameters(key, value) {
        debugger;
        const newFilter = this.state.filter;
        newFilter.set({[key]: value});
        this.setState({filter: newFilter})
    }

    render() {
        return (
            <div>
                <ErrorMessage message={this.state.errorMessages.main}/>
                <center>
                    <h1 className="margin-top-2 primary-text thin-font">My Search !</h1>
                </center>
                <RenderFilter
                    // searchClick={this.search}
                    searchClick={() => {
                    }}
                    {...this.state}
                    changeFilter={this.changeFilterParameters}
                    setError={this.setError}
                />
                <RenderData
                    {...this.state}
                    history={this.props.history}
                />
                <div id="loader" className="margin-top-3 loader" hidden/>
                <p className="margin-top-5">
                    <center className="thin-font">
                        This website is designed, developed, tested and deployed by
                        <a href="https://www.facebook.com/nidhi.tiwari.3194" target='#'><span
                            className="primary-text bold-font"> Nidhi Tiwari </span></a>
                    </center>
                </p>
            </div>
        )
    }
}
