import React, { Component } from 'react';
import './main.scss';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from '../article-actions';
import ReactHtmlParser from 'react-html-parser';

const highlightStyle = { color: 'yellow' };

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_json: ""
        }
    }
    onChange = e => {
        const type = e.currentTarget.getAttribute('data-type');
        const value = e.target.value;
        this.props.actions.onChangeInput({ type, value });
    }
    // onSearch = () => {
    //     const { input_tag } = this.props.articles;
    //     this.props.actions.getStories({ tag: input_tag });
    // }
    onTagClick = e => {
        this.props.actions.onChangeInput({ value: e.currentTarget.getAttribute('data-primary-tag') });
        this.props.actions.fetchMoreLinks({ tag: e.currentTarget.getAttribute('data-primary-tag') });
    }
    fetchMoreLinks = () => {
        const { input_tag } = this.props.articles;
        this.props.actions.fetchMoreLinks({ tag: input_tag });
    }
    refineObj = obj => {
        const filtered = {};
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            if (obj[keys[i]]) { filtered[keys[i]] = obj[keys[i]]; }
        }
        return filtered;
    }
    highlight = content => {
        let filter_obj = this.props.articles.filter;
        let filter_keys = Object.values(this.refineObj(filter_obj));
        let new_content = content;
        for (let i = 0; i < filter_keys.length; i++) {
            new_content = new_content.toLowerCase().replace(filter_keys[i].toLowerCase(), `<span class="highlight"> ${filter_keys[i]}</span>`);
        }
        new_content = ReactHtmlParser(new_content);
        return new_content;
    }
    show_json = e => this.setState({ show_json: e.currentTarget.getAttribute('data-identifier') });
    hide_json = () => this.setState({ show_json: '' });
    changeTab = e => {
        const type = e.currentTarget.getAttribute("data-tab");
        if(type === 'all') this.props.actions.setShowFiltered({status : false});
        if(type === 'filtered') this.props.actions.setShowFiltered({status : true });
    }
    render() {
        const { show_json } = this.state;
        const { input_tag, articles, available_tags,show_filtered,filtered_articles } = this.props.articles;
        const hl = this.highlight;

        const articleMap = (item, i) => {

            if (item.err) return <div className="card" key={item.toString() + i} >
                <div className="card-body">
                    <p>Unable to load content</p>
                </div>
            </div>
            if (show_json === item.identifier) {

                return <div className="card" key={item.toString() + i} >
                    <div className="card-body">
                        <pre >
                            <button onClick={this.hide_json}>Show less</button>
                            {JSON.stringify(item, undefined, 2)}
                        </pre>
                    </div>
                </div>
            }
            return <div className="card" key={item.toString() + i} >
                <div className="card-body">

                    <div className="hero-section">
                        <div className="image">
                            <img src={item.image[0]} />
                        </div>
                        <div className="headerText">
                            <div className="heading">
                                <a href={item.url} target="_blank">
                                    <h7 className="card-title">[{i + 1}]&nbsp;{hl(item.headline)}</h7>
                                </a>
                                <span data-identifier={item.identifier} onClick={this.show_json}><i class="fa fa-expand" aria-hidden="true"></i></span>
                            </div>
                            <div className="meta-details">
                                <small className="text-muted">Author: {hl(item.author.name)}</small>
                                <small className="text-muted">
                                    DatePublished: {(new Date(Date.parse(item.datePublished))).toLocaleDateString()}</small>
                                <small className="text-muted">Publisher: {hl(item.publisher.name)}</small>
                                <small className="text-muted">Fetch_time: {item.fetch_time / (1000)} sec</small>
                            </div>
                            <div className="hero-details">
                                <p className="article-description">{hl(item.description)}</p>
                                <p className='article-tags'>Tags : &nbsp;
{
                                        item.keywords.map(tag => <button
                                            type="button"
                                            class="btn btn-light"
                                            key={tag + i}>
                                            {hl(tag)}</button>)
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        };

        return <div className="main-wrapper">
            <div className="main-body">

                <div className="control-wrapper">
                    <div className="control-body">
                        <div className="input-group mb-3">
                            <div
                                onClick={this.fetchMoreLinks}
                                className="input-group-prepend">
                                <span className="input-group-text" >
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                    &nbsp;&nbsp;{articles.length ? "Fetch more" : 'Fetch articles'}
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter tag"
                                data-type="input_tag"
                                value={input_tag}
                                onChange={this.onChange}
                                onKeyUp={e => { if (e.keyCode === 13) { this.fetchMoreLinks(); } }}
                            />
                        </div>
                        {/* <div>
                            remaining */}
                        {/* <button 
                                type="button" 
                                className="btn btn-light"
                                onClick={this.fetchMoreLinks}
                                >{articles.length ? "Fetch more" : 'Fetch articles'}</button> */}
                        {/* </div> */}

                    </div>
                </div>

                {
                    available_tags.length ?
                    <div className="available-tags-wrapper">
                        <div className="available-tags-body">
                            <span>Related Tags: &nbsp; &nbsp;</span>
                            <button
                                type="button"
                                className="btn btn-light"
                                data-primary-tag='fashion'
                                onClick={this.onTagClick}
                            >sdfsf</button>
                            {
                                available_tags.map((item, i) => {
                                    return <button
                                        type="button"
                                        className="btn btn-light"
                                        key={item + i}
                                        data-primary-tag={item}
                                        onClick={this.onTagClick}
                                    >
                                        <i className="fa fa-search" aria-hidden="true" /> &nbsp; {item}
                                    </button>
                                })
                            }

                        </div>
                    </div>: <noscript />
                }

                <div className="post-wrapper">
                    <div className="post-body">


                        <div className="post-body-tabs">
                            <span data-tab="all" onClick={this.changeTab} className={ show_filtered ? '' : "active"}>All</span>
                            <span data-tab="filtered" onClick={this.changeTab} className={ !show_filtered ? '' : "active"}>Filtered</span>
                        </div>


                        {
                            !show_filtered
                                ? articles.map( articleMap )
                                : filtered_articles.map(articleMap)
                            
                        }

                        {
                            articles.length > 0
                                ? <div className="card " >
                                    <div className="card-body load-more" onClick={this.fetchMoreLinks}>
                                        <p>Load More</p>
                                    </div>
                                </div> : <noscript />
                        }

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


export default connect(mapStateToProps, mapDispatchToProps)(Main);