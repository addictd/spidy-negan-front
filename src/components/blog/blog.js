import React, { Component } from 'react';

import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import './blog.scss';
import * as actions from '../home/article-actions';
import Loader from '../common/loader';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            article: {}
        }
    }
    componentDidMount() {
        const { articles } = this.props.articles;
        const { pathname } = this.props.location;
        const _arr = pathname.split('/');
        const id = _arr[_arr.length - 1].trim();
        const article_arr = articles.filter(item => item.identifier === id);

        if (article_arr.length === 1) {
            this.setState({id, article : article_arr[0] });
            this.props.actions.fetchHtml({ url: article_arr[0].url });
        }

    }

    componentDidUpdate(prevProps, prevState) {
        const blog_body = document.getElementById('blog-body-content');
        const { blog_html, blog_style, blog_response } = this.props.articles;

        if (prevProps.articles.blog_html !== blog_html) {
            if (blog_html) {
                var div = document.createElement("div");
                div.id = "root";
                div.innerHTML = blog_html
                blog_body.appendChild(div);
            }
            this.props.actions.fetchResponses({ id : this.state.id });
        }

        if (prevProps.articles.blog_style !== blog_style) {
            if (blog_style) {
                function addCss(content) {
                    const style = document.createElement("style");
                    style.innerHTML = content;
                    blog_body.appendChild(style);
                }
                addCss(blog_style);
            }
        }


        if (prevProps.articles.blog_response !== blog_response) {
            const blog_body = document.getElementById('blog-body-responses');

            if (blog_response) {
                var div = document.createElement("div");
                div.className = 'responsesStream js-responsesStreamOther';
                div.innerHTML = blog_response;
                blog_body.appendChild(div);

                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.crossOrigin = 'anonymous';
                link.href = "https://cdn-static-1.medium.com/_/fp/css/main-branding-base.49OOsqVYw_M495OoBDcG4A.css";
                blog_body.appendChild(link);
            }
        }
    }
    componentWillUnmount() {
        this.props.actions.setBlogResponse({ blog_response: "" });
        this.props.actions.setBlogHtml({ blog_html: "" });
        this.props.actions.setBlogStyle({ blog_style: "" });
    }
    render() {
        const { id, article } = this.state;
        const { blog_response, blog_html } = this.props.articles;

        return <div className="blog-wrapper">

            <div className={id ? "blog-body" : "blog-body hidden"}>

                <div className='basic-info'>
                    Original Url : <a href={article.url}>{article.url}</a>
                </div>
                {
                    !blog_html ? <Loader /> : <noscript />
                }
                <div id="blog-body-content"  >

                </div>
                <div id="blog-body-responses"  >
                    <div className={blog_response ? "loader hidden" : "loader"}>
                        <Loader />
                    </div>
                </div>
            </div>

            <div className={id ? "not-found hidden" : "not-found"} >
                <h5> Oops! Fetch article first.</h5>
            </div>

        </div>
    }
}


const mapStateToProps = state => {
    return {
        location: state.router.location,
        articles: state.articles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Blog));