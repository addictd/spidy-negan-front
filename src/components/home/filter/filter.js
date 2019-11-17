import React, { Component } from 'react';
import './filter.scss';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from '../article-actions';
import _utils from '../../utils/utils';


class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onChange = e => {
        const key = e.currentTarget.getAttribute("data-keyname");
        const value = e.target.value || e.currentTarget.getAttribute("data-value");
        this.props.actions.onChangeFilterInput({ key, value });
        if(!e.target.value){
            this.onFilter();
        }
    }

    refineSearchObj = (obj) => {
        const filtered = {};
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            if (obj[keys[i]]) { filtered[keys[i]] = obj[keys[i]]; }
        }
        return filtered;
    }

    filterFunction = ({ obj, filterObj }) => {
        obj = obj.filter(item => item.crawl_status === 'success');
        const filterObj_keys = Object.keys(filterObj);
        // console.log("filterObj_keys: ", filterObj_keys);

        const returnobject = obj.filter(item => {

            let return_bool = true;

            for (let i = 0; i < filterObj_keys.length; i++) {
                const _key = filterObj_keys[i];
                let _value = filterObj[filterObj_keys[i]];

                if (Object.prototype.toString.call(_value) === "[object String]") {
                    _value = _value.toLowerCase();
                }

                // if (_key === "tags") {
                //     let flag = false;
                //     item['keywords'].forEach(tag => {
                //         if (tag.toLowerCase().indexOf(_value) > -1) {
                //             flag = true;
                //         }
                //     });
                //     return_bool = flag;

                // } else if (_key === "author") {
                //     if (item["author"].toLowerCase().indexOf(_value) === -1) {
                //         return_bool = false;
                //     }
                // } else if (_key === "publisher") {
                //     if (item['publisher'].toLowerCase().indexOf(_value) === -1) {
                //         return_bool = false;
                //     }
                // } else {
                //     if (item[_key].toLowerCase().indexOf(_value) === -1) {
                //         return_bool = false;
                //     }
                // }
                if(_key === 'word'){
                    const combined = _utils.getAllNestedValues(obj).join(' ');
                    if(combined.toLowerCase().indexOf(_value) === -1){
                        return_bool = false;
                    }
                }else{

                    if (item[_key].toLowerCase().indexOf(_value) === -1) {
                        return_bool = false;
                    }
                }

            }
            return return_bool;
        });
        return returnobject;
    }

    onFilter = () => {
        const { filter, articles } = this.props.articles;

        const filterObj = this.refineSearchObj(filter);
        const filtered_articles = this.filterFunction({ obj: articles, filterObj });
        this.props.actions.setFilteredArticles({ articles: filtered_articles });
        this.props.actions.setShowFiltered({ status: true });
    }

    render() {
        const { filter } = this.props.articles;

        const refined = this.refineSearchObj(filter);
        // console.log('refined: ', refined);
        const _search = <div
            className="input-group-prepend">
            <span onClick={this.onFilter} className="input-group-text" style={{ backgroundColor: "white" }}>
                <i className="fa fa-search" aria-hidden="true"></i>
            </span>
        </div>;
        return <div className="filter-wrapper">
            <div className="filter-body">
                <header>
                    <p className="h6">Filters</p>
                </header>
                <div className="filter-preview">

                    {Object.keys(refined).map(_key => (<button
                        key={_key.toString() + (new Date()).getTime()}
                        type="button"
                        className="btn btn-light btn-sm"
                        data-keyname={_key}
                        onClick={this.onChange}
                        data-value=''
                    >{refined[_key]}

                        &nbsp;&nbsp;<i className="fa fa-close " ></i> </button>))}
                </div>

                <div className="input-fields">

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Serach word"
                            value={filter.word}
                            data-keyname="word"
                            onChange={this.onChange}
                            onKeyUp={e => { if (e.keyCode === 13) { this.onFilter(); } }}
                        />{_search}
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="By Keyword"
                            data-keyname="keywords"
                            value={filter.keywords}
                            onChange={this.onChange}
                            onKeyUp={e => { if (e.keyCode === 13) { this.onFilter(); } }}
                        />{_search}

                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="By headline"
                            data-keyname="headline"
                            value={filter.headline}
                            onChange={this.onChange}
                            onKeyUp={e => { if (e.keyCode === 13) { this.onFilter(); } }}
                        />{_search}
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="By Author"
                            data-keyname="author"
                            value={filter.author}
                            onChange={this.onChange}
                            onKeyUp={e => { if (e.keyCode === 13) { this.onFilter(); } }}
                        />{_search}
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="By publisher"
                            data-keyname="publisher"
                            value={filter.publisher}
                            onChange={this.onChange}
                            onKeyUp={e => { if (e.keyCode === 13) { this.onFilter(); } }}
                        />{_search}
                    </div>

                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles
    }
}
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

Filter.propTypes = {
    articles: PropTypes.shape({
        input_tag: PropTypes.string,
        input_tag: PropTypes.string,
        available_tags: PropTypes.array,
        articles: PropTypes.array,
        primary_tag: PropTypes.string,
        filter: PropTypes.shape({
            word: PropTypes.string,
            tags: PropTypes.string,
            headline: PropTypes.string,
            author: PropTypes.string,
            publisher: PropTypes.string,
            identifier: PropTypes.string
        }),
        filtered_articles: PropTypes.array,
        show_filtered: PropTypes.bool,
        blog_response: PropTypes.string
    }),
    user: PropTypes.shape({
        activity: PropTypes.array
    }),
    actions: PropTypes.object
};


export default connect(mapStateToProps, mapDispatchToProps)(Filter);