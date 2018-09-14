import React, { Component } from "react"
import axios from "axios"

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        axios.get(`/api/post/${this.props.match.params.postid}`)
        .then(res => {
            this.setState({
                post: res.data
            })
        })
    }

    render() {
        const { post } = this.state
        return (
            <div>
                <div>
                    <h1>{post.title}</h1>
                    <h3>by {post.username}</h3>
                    <img src={post.user_image} alt=""/>
                </div>
                <div>
                    <img src={post.post_image} alt="post"/>
                    <p>{post.content}</p>
                </div>
            </div>
        )
    }
}

export default Post