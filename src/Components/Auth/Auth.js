import React, { Component } from "react"
import axios from "axios"

import { connect } from "react-redux"
import { updateState } from "../../ducks/reducer"

class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
        }
        this.updateInput = this.updateInput.bind(this)
    }

    updateInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login(username, password) {
        const { updateState, history } = this.props
        axios.post("/login", {username, password})
        .then(res => {
            const {user_id, username, image} = res.data
            updateState(user_id, username, image)
            history.push("/dashboard")
        })
    }

    register(username, password) {
        const { updateState, history } = this.props
        axios.post("/register", {username, password})
        .then(res => {
            const {id, username, image} = res.data
            updateState(id, username, image)
            history.push("/dashboard")
        })
    }

    render() {
        return (
            <div>
                <h1>Helo</h1>
                <input type="text"
                placeholder="Enter username"
                name="username"
                value={this.state.username}
                onChange={this.updateInput}/>
                <input type="text"
                placeholder="Enter password"
                name="password"
                value={this.state.password}
                onChange={this.updateInput}/>
                <button onClick={() => this.login(this.state.username, this.state.password)}>Login</button>
                <button onClick={() => this.register(this.state.username, this.state.password)}>Register</button>
            </div>
        )
    }
}

export default connect(null, {updateState})(Auth)