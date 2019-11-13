import React, { Component } from 'react';
import './main.scss';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from '../article-actions';
import ReactHtmlParser from 'react-html-parser';

const highlightStyle = {color : 'yellow'};

class Main extends Component {
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
    render() {
        const { input_tag, articles, available_tags } = this.props.articles;
        const hl = this.highlight;
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
                        <div>
                            remaining
                            {/* <button 
                                type="button" 
                                className="btn btn-light"
                                onClick={this.fetchMoreLinks}
                                >{articles.length ? "Fetch more" : 'Fetch articles'}</button> */}
                        </div>

                    </div>
                </div>

                <div className="available-tags-wrapper">
                    <div className="available-tags-body">
                        <span>Related Tags: &nbsp; &nbsp;</span>

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
                </div>

                <div className="post-wrapper">
                    <div className="post-body">
                        {
                            articles.map((item, i) => {
                                
                                if (item.err) return <div className="card" key={item.toString() + i} >
                                    <div className="card-body">
                                        <p>Unable to load content</p>
                                    </div>
                                </div>
                                return <div className="card" key={item.toString() + i} >
                                    <div className="card-body">
                                        <h5 className="card-title">{i + 1}.&nbsp;{ hl(item.headline) }</h5>

                                        <p>Author: { hl(item.author.name)}</p>
                                        <p>DatePublished: { (new Date(Date.parse(item.datePublished))).toLocaleDateString() }</p>
                                        <p>Fetch_time: {item.fetch_time / (1000)} &nbsp; seconds</p>
                                        <p className="card-text">{ hl(item.description) }</p>
                                        <p>Tags : &nbsp;
{
                                                item.keywords.map(tag=> <span key={tag + i}> {  hl( tag) }&nbsp;</span>)
                                            }
                                        </p>
                                        <p>Publisher: { hl(item.publisher.name)}</p>

                                        {/* <a href="#" className="btn btn-primary">Button</a> */}
                                    </div>
                                </div>
                            })
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