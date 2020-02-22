import React, { Component } from 'react'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
var stompClient = null

class Finalpage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            message: "",
            array: []
        }
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
    // user="";
    componentDidMount() {
        this.setState({ username: localStorage.getItem('username') }, () => {
            console.log(this.state);
            this.user = this.state.username

        })
        var sock = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(sock);
        sock.onopen = function () {
            console.log('open');

        }


        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            //subscribing path
            stompClient.subscribe('/topic/public', async (notification) => {
                console.log("content", JSON.parse(notification.body).content);
                console.log("sender", JSON.parse(notification.body).sender);
                let object = {
                    sender: JSON.parse(notification.body).sender,
                    message: JSON.parse(notification.body).content
                }
               
              await this.setState({array:[...this.state.array,object]})
                console.log("information", this.state)
                // this.setState(prevState => ({
                //     array: [...prevState.array, JSON.parse(notification.body).content.sender]
                // }), () => {
                //     console.log(this.state.array);

                // })

            });
            stompClient.send("/app/chat.addUser",
                {},
                JSON.stringify({ sender: this.username, type: 'JOIN' })

            )
            // if (this.message.type === 'JOIN') {
            //     //messageElement.classList.add('event-message');
            //     this.message.content = this.message.sender + ' joined!';
            // } else if (this.message.type === 'LEAVE') {
            //     messageElement.classList.add('event-message');
            //     this.message.content = this.message.sender + ' left!';
            // }
        });
    }


    sendMessage = () => {
        var messageContent = this.state.message
        if (messageContent && stompClient) {
            console.log('sended');
            var chatMessage = {
                sender: this.state.username,
                // content: messageInput.value,
                content: messageContent,
                type: 'CHAT'
            };
            //console.log(chatMessage,"chatmessage")
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
            // messageInput.value = '';
            messageContent = ' ';
        }
        //event.preventDefault();
    }

    

    render() {
        // item.sender==localStorage.getItem(username)?<div>{item}</div>:<div>{item}</div>
        return (
            <div className="row">
                <div className="column side">
                    <h2>List</h2>
                    <div></div>
                </div>
                <div className="column side1">

                    <div id="chat-page" className="hidden">
                        <div className="chat-container">
                            <div className="chat-header">
                                <h2>WebSocket Chat Application</h2>
                            </div>

                            <div className="connecting">
                         
                               <div >{this.state.username} joined</div> 
                                {this.state.array.map((item) => {
                                    return (item.sender == localStorage.getItem('username')? 
                                (<div className="avtar">{item.sender}<br></br>{item.message}</div>):
                                     (<div className="avtarr">{item.sender}<br></br>{item.message} </div>) )
                          
                                    })
                                }

                              



                                {/* <div className="avtar">
                                    <Avatar>{this.state.username}</Avatar>
                                    {
                                        this.state.array.map((item,index) => (
                                            <div key={index}> <Avatar>{this.state.username}</Avatar>{item}</div>
                                        ))
                                    }
                                </div><br></br> 

                                 <div className="avtarr">
                                    <Avatar>{this.state.username}</Avatar>
                                    {
                                        this.state.array.map((item) => (
                                            // {item.sender==localStorage.getItem('username')?:}
                                            <div> <Avatar>{this.state.user}</Avatar>{item}</div>
                                        ))
                                    }
                                </div><br></br>  */}
                            </div>
                            
                            <ul id="messageArea">

                            </ul>
                            <input type="text" id="message" name="message"  value={this.state.Message} onChange={this.handleInputChange} />
                            <form id="messageForm" name="messageForm">
                                <div className="form-group">
                                    <div className="input-group clearfix">
                                       
                                        {/* <input type="text" id="message" placeholder="Type a message..." autoComplete="off" name="message" className="form-control" value={this.state.Message} onChange={this.handleInputChange} /> */}
                                        {/* <button type="submit" class="primary">Send</button> */}
                                        <Button variant="contained" color="primary" component="span" className="button" onClick={this.sendMessage} >
                                            Send
                                            </Button>
                                    </div>
                                </div>
                            </form>

                            <br></br>

                        </div>
                    </div>
                </div>


            </div>

        );
    }
}
export default Finalpage;