import React, { Component } from 'react';
import './allign.css'

// import './header.css'
// import Websocket from 'react-websocket';
import Button from '@material-ui/core/Button';
import Tableformat from '../component/tableformat';
import Dashboard from '../component/Dashboard';

import io from 'socket.io-client';
var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');
var username = null

var stompClient = null
class Startingpage extends Component {
    //

    constructor(props) {
        super(props)
        this.state = {
            username: ""


        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)

    }


    connect = () => {
        // console.log(this.state)
        localStorage.setItem('username', this.state.username)
        this.props.history.push('/messaging')
    }
    handlesubmit = (event) => {
        const{username} = this.state.username
        event.preventdefault()

    }
    handleInputChange = (event) => {
        // event.preventdefault()
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value

        }
        )
    }



    render() {
        const { username } = this.state;
        return (


            // <div className="allign">
            <div id="username-page">
                <div></div>
                <div class="username-page-container">
                    {/* <text >{this.state.name}</text> */}
                    <h1 class="title">Type your username</h1>
                    <form id="usernameForm" onSubmit={this.handlesubmit}>
                        <div class="form-group">
                            <input type="text"
                                name="username"
                                value={this.state.username} 
                                onChange={this.handleInputChange }
                                placeholder="Username" autocomplete="off" class="form-control" />
                        </div><br></br>

                        <div class="form-group">
                            {/* <Button variant="contained" color="primary" onClick={()=>this.connect(this.setState('#name'))}
                                >Start chatting </Buttson> */}
                            {/* <Button variant="contained" color="primary" onClick={()=>this.connect(this.setState('usernmae'))}
                                >Start </Button> */}
                            {/* <button onClick={()=>this.setData()}>starti</button> */}
                            <button type="submit" class="accent username-submit" onClick={this.connect
                            }>Start Chatting</button>
                        </div>
                    </form>
                </div>
            </div>

            // </div >
        );
    }
}

export default Startingpage;