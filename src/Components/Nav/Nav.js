import React from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"

import { connect } from "react-redux"

function Nav(props) {
    const { username, picture, location } = props
    return (
        <div>
            {location.pathname === "/"
            ?
                null
            :
                <div>
                    <Link to="/dashboard"><button>Home</button></Link>
                    <Link to="/new"><button>New Post</button></Link>
                    <img src={picture} alt="profile pic"/>
                    <h2>{username} </h2>
                    <a href="http://localhost:3005/logout"><button>Logout</button></a>
                    <hr/>
                </div>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        username: state.username,
        picture: state.picture
    }
}

export default withRouter(connect(mapStateToProps)(Nav))