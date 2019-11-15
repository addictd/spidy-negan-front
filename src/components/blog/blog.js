import React, { Component } from 'react';

import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import './blog.scss';
import * as actions from '../home/article-actions';

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

        console.log('article_arr: ', article_arr);
        if (article_arr.length === 1) {

            this.props.actions.fetchResponses({ id });

            const article = article_arr[0];
            this.setState(state => {
                return ({ id, article })
            });

            const style = article.blog_style;
            const html = article.blog_html;
            const response_html = article.blog_response_html;


            const blog_body = document.getElementById('blog-body-content');
            console.log('blog_body: ', blog_body);
            console.log('html: ', html);
            // const blog_body_responses = document.getElementById('blog-body-responses');


            if (html) {
                var div = document.createElement("div");
                div.id = "root";
                div.innerHTML = html;
                blog_body.appendChild(div);
            }

            // if (response_html) {
            //     var div = document.createElement("div");
            //     div.className = 'responsesStream js-responsesStreamOther';
            //     div.innerHTML = response_html;
            //     blog_body.appendChild(div);
            // }


            if (style) {
                function addCss(content) {
                    const style = document.createElement("style");
                    style.innerHTML = content;
                    blog_body.appendChild(style);
                }

                for (let i = 0; i < style.length; i++) {
                    addCss(style[i]);
                }

            }



        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.articles.blog_response !== this.props.articles.blog_response) {

            const response_html = this.props.articles.blog_response;
            const blog_body = document.getElementById('blog-body-responses');

            if (response_html) {
                var div = document.createElement("div");
                div.className = 'responsesStream js-responsesStreamOther';
                div.innerHTML = response_html;
                blog_body.appendChild(div);

                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.crossOrigin = 'anonymous';
                link.href = "https://cdn-static-1.medium.com/_/fp/css/main-branding-base.49OOsqVYw_M495OoBDcG4A.css";
                blog_body.appendChild(link);
            }
        }
    }

    render() {
        const { id, article } = this.state;
        console.log('article : ', article);
        console.log('state : ', this.state);

        // const _not_found = 

        // const found = 

        return <div className="blog-wrapper">

            <div className={id ? "blog-body" : "blog-body hidden"}>

                <div className='basic-info'>
                    Original Url : <a href={article.url}>{article.url}</a>
                </div>
                <div id="blog-body-content"  >

                </div>
                <div id="blog-body-responses"  >

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