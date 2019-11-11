import React, { Component } from 'react';
import './main.scss';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from '../article-actions';


class Main extends Component {
    onChange = e => {
        const type = e.currentTarget.getAttribute('data-type');
        const value = e.target.value;
        this.props.actions.onChangeInput({ type, value });
    }
    onSearch = () => {
        const { input_tag } = this.props.articles;
        this.props.actions.onSearchTag({ tag: input_tag });
    }
    onTagClick = e => {
        this.props.actions.getArticlesList({ tag : e.currentTarget.getAttribute('data-primary-tag')})
    }
    render() {
        const { input_tag, articles, available_tags } = this.props.articles;

        return <div className="main-wrapper">
            <div className="main-body">

                <div className="control-wrapper">
                    <div className="control-body">
                        <div className="input-group mb-3">
                            <div
                                onClick={this.onSearch}
                                className="input-group-prepend">
                                <span className="input-group-text" >
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter tags separated by commas"
                                data-type="input_tag"
                                value={input_tag}
                                onChange={this.onChange}
                                onKeyUp={e => { if (e.keyCode === 13) { this.onSearch(); } }}
                            />
                        </div>
                        <div>
                            <button type="button" className="btn btn-light">Search time</button>
                        </div>
                    </div>
                </div>

                <div className="available-tags-wrapper">
                    <div className="available-tags-body">
                        <span>Available Tags: &nbsp; &nbsp;</span>

                        {
                            available_tags.map((item,i) => {
                                return <button 
                                    type="button" 
                                    className="btn btn-light" 
                                    key={item.tag + i}
                                    data-primary-tag ={item.tag}
                                    onClick={this.onTagClick}
                                    >
                                    <i className="fa fa-search" aria-hidden="true" /> &nbsp; {item.tag}
                                </button>
                            })
                        }

                    </div>
                </div>

                <div className="post-wrapper">
                    <div className="post-body">
                        {
                            articles.map((item, i) => {
                                return <div className="card" key={item.toString() + i} >
                                    <div className="card-body">
                                        <h5 className="card-title">{i+1}.&nbsp;{item.headline}</h5>
                                        
                                        <p>{item.author.name}</p>
                                            <p>{item.dataPublished}</p>
                                            {/* <p>{item.read_time}</p>

                                            <p>{item.url}</p>
                                            <p>{item.fetch_time}</p> */}
                                        <p className="card-text">{item.description}</p>
                                        {
                                            item.keywords.filter(item => {
                                                if(item.split(":")[0] === 'Tag')return true;
                                                return false;
                                            })
                                            .map(tag => <span key={tag+i}>{tag.split(':')[1]}&nbsp;</span>)
                                        }
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