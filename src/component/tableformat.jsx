import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import classes from '@material-ui/core/classes';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import './allign.css'
import './row.css'
import './header.css'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client';
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var username = null
var stompClient = null
// var socket = null
class tableformat extends Component {




    componentDidMount() {
        //     this.socket.on("update", () => {

        //         this.setState({ name: "updated name !" });
        //       });

        // this is an "echo" websocket service
        console.log('didmount')
        var socket = new SockJS('http://localhost:8080/ws');
        // console.log('jj')

        stompClient = Stomp.over(socket);
        socket.onopen = function () {
            console.log('open');
        }
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            //subscribing path
            stompClient.subscribe('/topic/public', function (greeting) {
                console.log('destination' + greeting);
                //you can execute any function here
            });
            // console.log('jhhj')
            stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: "username", type: 'JOIN' })
            )
        });
    }


    sendMessage() {
        console.log('sendmessage')
        var messageContent = "hii"
        if (messageContent && stompClient) {
            console.log('sended')
            var chatMessage = {

                sender: "username",
                content: messageInput.value,
                type: 'CHAT'
            };
            // console.log("abcds")
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify({ "type": "JOIN","sender":"username" ,"content": messageContent }));
            // messageInput.value = '';
            // messageInput.value = '';
        }
        // event.preventDefault();
    }



    render() {
        return (
            //       <div className="allign">
            //            <AppBar position="static">
            //   <Toolbar>
            //     <IconButton edge="start" color="inherit" aria-label="menu">
            //       <MenuIcon />
            //     </IconButton>
            //     <Typography variant="h6" >
            //       News
            //     </Typography>
            //     <Button color="inherit">Login</Button>
            //   </Toolbar>
            // </AppBar>


            <div class="row">
                <div class="column side">
                    <h2>List</h2>
                    <div>

                    </div>
                    {/* <p> 
                        </p> */}
                </div>



                <div class="column side1">

                    <div id="chat-page" class="hidden">
                        <div class="chat-container">
                            <div class="chat-header">
                                <h2>Spring Boot WebSocket Chat Application</h2>
                            </div>

                            <p>
                                <div class="connecting">

                                    Connecting...
            </div>
                                <ul id="messageArea">

                                </ul>
                                <form id="messageForm" name="messageForm">
                                    <div class="form-group">
                                        <div class="input-group clearfix">
                                            <input type="text" id="message" placeholder="Type a message..." autocomplete="off" class="form-control" />
                                            {/* <button>send</button> */}
                                            <button type="submit" onClick={this.sendmessage}>Send</button>
                                        </div>
                                    </div>
                                </form>
                            </p>
                            <br></br>

                        </div>
                    </div>
                </div>


            </div>

        );
    }
}

export default tableformat;