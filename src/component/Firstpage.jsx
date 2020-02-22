import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
var sock = null

class Firstpage extends Component {
    socket;
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)

    }
    handlesubmit = (event) => {
        //const { username } = this.state.username
        // localStorage.setItem('username',username);
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
        console.log(this.state);

    }


    sendMessage() {
        // sock.connect({}, this.onConnected ,this.onError);
        console.log('sendMessage')
        //var messageContent = messageInput.value.trim();
        var messageContent = "hello"
        if (messageContent && sock) {
            var chatMessage = {
                sender: "username",
                // content: messageInput.value,
                content: messageContent,
                type: 'CHAT'
            };
            sock.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
            // messageInput.value = '';
            // messageContent = ' ';
        }
        //event.preventDefault();
    }



    connect = () => {
        console.log(this.state);
        localStorage.setItem('username', this.state.username)
        this.props.history.push('/finalpage')
    }

    render() {
        const { username } = this.state;
        return (


            // <div className="allign">
            <div id="username-page">
              
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


   
export default Firstpage ;