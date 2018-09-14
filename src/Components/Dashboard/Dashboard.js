import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import { connect } from "react-redux"

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: "",
            myPosts: true,
            posts: []
        }

        this.updateMyPosts = this.updateMyPosts.bind(this)
    }
    componentDidMount() {
        axios.get(`/api/posts/${this.props.id}`)
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    searchPosts(search, myposts) {
        axios.get(`/api/posts/${this.props.id}?search=${search}&myposts=${myposts}`)
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    updateSearch(val) {
        this.setState({
            search: val
        })
    }

    resetSearch() {
        this.setState({
            search: ""
        })
    }

    updateMyPosts() {
        this.setState({
            myPosts: !this.state.myPosts
        })
    }

    render() {
        return (
            <div>
                <input type="text"
                placeholder="Search by title"
                name="search"
                value={this.state.search}
                onChange={(e) => this.updateSearch(e.target.value)}/>
                <button onClick={() => this.searchPosts(this.state.search, this.state.myPosts)}>Search</button>
                <button onClick={() => this.resetSearch()}>Reset</button>
                <h3>My Posts</h3>
                <input type="checkbox"
                checked={this.state.myPosts}
                onChange={() => this.updateMyPosts()}/>
                <hr/>
                {
                    this.state.posts.map(post => {
                        return (
                            <div key={post.post_id}>
                                <Link to={`/post/${post.post_id}`}><h1>{post.title}</h1></Link>
                                <h3>by {post.username}</h3>
                                <img src={post.image} alt=""/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps({id}) {
    return {
        id
    }
}

export default connect(mapStateToProps)(Dashboard)