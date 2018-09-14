import React, { Component } from "react"
import axios from "axios"

import { connect } from "react-redux"

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            image: "",
            content: ""
        }
        this.updateInput = this.updateInput.bind(this)
    }

    updateInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createPost(title, image, content, author_id) {
        axios.post(`/api/create-post/${author_id}`, {title, image, content})
        .then(() => {
            this.props.history.push("/dashboard")
        })
    }

    render() {
        const { title, image, content } = this.state
        return (
            <div>
                <img src={image} alt="invalid URL"/>
                <h2>Title</h2>
                <input type="text"
                placeholder="Enter title"
                name="title"
                value={title}
                onChange={this.updateInput}/>
                <h2>Image</h2>
                <input type="text"
                placeholder="Enter image URL"
                name="image"
                value={image}
                onChange={this.updateInput}/>
                <h2>Content</h2>
                <input type="text"
                placeholder="Enter content"
                name="content"
                value={content}
                onChange={this.updateInput}/>
                <button onClick={() => this.createPost(title, image, content, this.props.id)}>Post</button>
            </div>
        )
    }
}

function mapStateToProps({id}) {
    return {
        id
    }
}

export default connect(mapStateToProps)(Form)