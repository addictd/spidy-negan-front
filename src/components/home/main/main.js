import React, { Component } from 'react';
import './main.scss';
const obj = [{
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}, {
    title: "title",
    author: 'author',
    date: Date(),
    read_time: '5min',
    supporting_text: 'supporting text',
    tags: ['tag1', 'tag2', 'tag3', 'tag4']
}]
class Main extends Component {
    render() {
        return <div className="main-wrapper">
            <div className="main-body">

                <div className="control-wrapper">
                    <div className="control-body">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">
                                    <i className="fa fa-search" aria-hidden="true"></i>&nbsp;tag
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter tags separated by commas" />
                        </div>
                        <div>
                            <button type="button" className="btn btn-light">Search time</button>

                        </div>
                    </div>
                </div>

                <div className="post-wrapper">
                    <div className="post-body">
                        {
                            obj.map((item, i) => {
                                return <div className="card" key={item.toString() + i} >
                                    <div className="card-body">
                                        <h5 className="card-title">title</h5>
                                        <p>
                                            <span>Author</span>
                                            <span>Date</span>
                                            <span>read time</span>
                                        </p>
                                        <p className="card-text">Supporting text</p>
                                        <a href="#" className="btn btn-primary">Button</a>
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

export default Main;