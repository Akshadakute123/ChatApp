import React, { Component } from 'react';
// import './demo.css';
import Button from '@material-ui/core/Button'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
var stompClient = null
var messageInput = document.querySelector('message');


class Message extends Component {
    constructor(props){
        super(props)
        this.state ={
            username:"",
            message:""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
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
    

    // componentWillMount()
    // {
      
    // }
    componentDidMount() {

          
       this.setState({ username:localStorage.getItem('username')},()=>{ 
        console.log(this.state)
    })
        var sock = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(sock);
        sock.onopen = function () {
            console.log('open');
            // const username = localStorage.getItem('username')
        }


        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            //subscribing path
            stompClient.subscribe('/topic/public',this.onMessageReceived=(payload)=>{
                var message = JSON.parse(payload.body);
        console.log('hellolllo')
        var messageElement = document.createElement('li');
    
        if(message.type === 'JOIN') {
            messageElement.classList.add('event-message');
            message.content = message.sender + ' joined!';
            console.log("kikik")
        } else if (message.type === 'LEAVE') {
            messageElement.classList.add('event-message');
            message.content = message.sender + ' left!';
        } else {
            messageElement.classList.add('chat-message');
    
           
    
           
        }
    
      
    }

            
                // console.log("destination" + greeting);
                //you can execute any function here
            );
            stompClient.send("/app/chat.addUser",
                {},
                JSON.stringify({ sender:localStorage.getItem('username'), type: 'JOIN' }) 
                )
        });
    }
   
    
    
    sendmessage=(e)=> {
        // sock.connect({}, this.onConnected ,this.onError);
        e.preventDefault()
        console.log('sendMessage')

        //var messageContent = messageInput.value.trim();
        var messageContent = this.state.message
        if (messageContent && stompClient) {
            console.log('sended');

            var chatMessage = {
                sender: localStorage.getItem('username'),
                //content: messageInput.value,
                content: messageContent,

                type: 'CHAT'
            };
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
            // messageInput.value = '';
            messageContent = ' ';
        }
        //event.preventDefault();
    }




    render() {
        return (

            <div class="row">
            <div class="column side">
                <h2>List</h2>
            
                    
                 {localStorage.getItem('username')}
                
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
                        {this.state.message}
                           
                            </ul>
                            <form id="messageForm" name="messageForm">
                                <div class="form-group">
                                    <div class="input-group clearfix">
                                    <input type="text" id="message" name="message" placeholder="Type a message..." autoComplete="off" className="form-control" value={this.state.message} onChange={this.handleInputChange} />
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

export default Message;