import React, { Component } from 'react';
import './main.scss';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from '../article-actions';
import ReactHtmlParser from 'react-html-parser';
import Loader from '../../common/loader';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_json: "",
            show_suggestion: false
        }
    }

    componentDidMount() {
        const inputTagElem = document.querySelector('.main-body input[data-type=input_tag]');
        inputTagElem.addEventListener("focusin", () => {
            this.setState({ show_suggestion: true });
        });
        inputTagElem.addEventListener("focusout", () => {
            this.setState({ show_suggestion: false });
        });
    }

    onChange = e => {
        const type = e.currentTarget.getAttribute('data-type');
        const value = e.target.value;
        this.props.actions.onChangeInput({ type, value });
    }

    onTagClick = e => {
        console.log('on tag clicked: ');
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
        if (type === 'all') this.props.actions.setShowFiltered({ status: false });
        if (type === 'filtered') this.props.actions.setShowFiltered({ status: true });
    }

    openArticle = e => {
        const id = e.currentTarget.getAttribute('data-identifier');
        this.props.history.push('/article/' + id);
    }

    render() {
        const { show_json, show_suggestion } = this.state;
        const { activity } = this.props.user;
        const { input_tag, articles, available_tags, show_filtered, filtered_articles } = this.props.articles;
        const hl = this.highlight;


        const activity_filtered = activity.filter(item => item.indexOf(input_tag) !== -1);

        const articleMap = (item, i) => {


            if (item.crawl_status === 'wait') return <div className="card" key={item.toString() + i} >
                <div className="card-body withloader">
                    <div className="loader">
                        <Loader />
                    </div>
                </div>
            </div>;


            if (item.crawl_status === 'pending') return <div className="card" key={item.toString() + i} >
                <div className="card-body withloader">
                    <div className="loader">
                        <span className="bold">{"<pending>"} </span>{item.headline}
                    </div>
                </div>
            </div>

            if (item.crawl_status === 'crawling') return <div className="card" key={item.toString() + i} >
                <div className="card-body withloader">
                    <div className="loader">
                        <span className="bold">{"<crawling>"}</span> {item.headline}
                    </div>
                </div>
            </div>

            if (item.crawl_status === 'err') return <div className="card" key={item.toString() + i} >
                <div className="card-body">
                    <p className="center"><span className="bold">{"<Fetch fail />"}</span></p>
                </div>
            </div>;

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
                            <img src={item.image} />
                        </div>
                        <div className="headerText">
                            <div className="heading">
                                {/* <a href={item.url} target="_blank"> */}
                                <a
                                    data-identifier={item.identifier}
                                    onClick={this.openArticle}
                                >
                                    <h6 className="card-title">[{i + 1}]&nbsp;{hl(item.headline)}</h6>
                                </a>
                                <span data-identifier={item.identifier} onClick={this.show_json}>&nbsp;&nbsp;<i className="fa fa-expand" aria-hidden="true"></i></span>
                            </div>
                            <div className="meta-details">
                                <small className="text-muted">Author: {hl(item.author)}</small>
                                <small className="text-muted">
                                    DatePublished: {(new Date(Date.parse(item.datePublished))).toLocaleDateString()}</small>
                                <small className="text-muted">Publisher: {hl(item.publisher)}</small>
                                <small className="bold">Fetch_time: {item.fetch_time / (1000)} sec</small>
                            </div>
                            <div className="hero-details">
                                <p className="article-description">{hl(item.description)}</p>
                                <p className='article-tags'>Tags : &nbsp;
{
                                        item.keywords.split(',').map(tag => <button
                                            type="button"
                                            className="btn btn-light"
                                            key={tag + i}>
                                            {hl(tag)}</button>)}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        };

        const noArticle = <div className="card"  >
            <div className="card-body">
                <div className="no-article">
                    Enter keyword and start crawling!
                </div>
            </div>
        </div>;

        return <div className="main-wrapper" id="maincrawler">
            <div className="main-body">

                <div className="control-wrapper">
                    <div className="control-body">
                        <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter tag"
                                    data-type="input_tag"
                                    value={input_tag}
                                    onChange={this.onChange}
                                    onKeyUp={e => { if (e.keyCode === 13) { this.fetchMoreLinks(); } }}
                                />

                            <div
                                onClick={this.fetchMoreLinks}
                                className="input-group-prepend">
                                <span className="input-group-text" >
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                    &nbsp;&nbsp;{articles.length ? "Fetch more" : 'Fetch articles'}
                                </span>
                            </div>
                        </div>

                        <div className="suggestions">
                            {show_suggestion
                                ? activity_filtered.map(item => (<div
                                    className="activityMap"
                                    key={item + new Date()}
                                    data-primary-tag={item.toLowerCase()}
                                    onClick={this.onTagClick}
                                > {item}
                                </div>))

                                : <noscript />}

                        </div>
                    </div>

                </div>
            </div>

            <div className="available-tags-wrapper">
                <div className="available-tags-body">
                    <span>Related Tags: &nbsp; &nbsp;</span>
                    {
                        available_tags.length && available_tags.map((item, i) => {
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


                    <div className="post-body-tabs">
                        <span data-tab="all" onClick={this.changeTab} className={show_filtered ? '' : "active"}>All</span>
                        <span data-tab="filtered" onClick={this.changeTab} className={!show_filtered ? '' : "active"}>Filtered</span>
                    </div>


                    {
                        !show_filtered
                            ? articles.length
                                ? articles.map(articleMap)
                                : noArticle
                            : filtered_articles.map(articleMap)

                    }

                    {
                        articles.length > 0
                            ? <div className="card " >
                                <div className="card-body load-more" onClick={this.fetchMoreLinks}>
                                    <p>Load 10 More items</p>
                                </div>
                            </div> : <noscript />
                    }

                </div>

            </div>
        </div>;

    }
}





const mapStateToProps = state => {
    return {
        articles: state.articles,
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

Main.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));