import React, { Component } from 'react';
// import './demo.css';
import './header.css'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
var stompClient = null
var messageInput = document.querySelector('message');


class Nextpage extends Component {
    constructor(props){
        super(props)
        this.state ={
            username:"",
            message:"",
            arr:[]
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


        stompClient.connect({}, (frame) =>{
            console.log('Connected: ' + frame);
            //subscribing path
            stompClient.subscribe('/topic/public',async(notification) =>{
                console.log("content",JSON.parse(notification.body).content);
                console.log("content",JSON.parse(notification.body).sender);
                let object={
                    sender:JSON.parse(notification.body).sender,
                    message:JSON.parse(notification.body).content
                }
                await this.setState(
                    {
                        arr:[...this.state.arr,object]
                    })
                    
                        console.log("information",this.state)
                                    
                
                //you can execute any function here
            });
            stompClient.send("/app/chat.addUser",
                {},
                JSON.stringify({ sender:this.username, type: 'JOIN' }) 
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
                {/* {localStorage.getItem('username')} */}
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
                            Connecting...<br></br>
                           <Avatar> {this.state.username}  </Avatar> joined

                                
                                {
                                    this.state.arr.map((item)=>{
                                        return(item.sender==localStorage.getItem('username')?
                                        (<div className=" ">{item.message}{item.sender}</div>):
                                        (<div className=" ">{item.message}{item.sender}</div>))
                                    })
                                       
                                }

                               
        </div>
                            <ul id="messageArea">

                            </ul>
                            <form id="messageForm" name="messageForm">
                                <div class="form-group">
                                    <div class="input-group clearfix">
                                    <input type="text" id="message" name="message" placeholder="Type a message..." autoComplete="off" className="form-control" value={this.state.message} onChange={this.handleInputChange} />
                                        {/* <button>send</button> */}
                                        <Button variant="contained"  color="primary" onClick={this.sendmessage}>Send</Button>
                                    </div>
                                </div>
                            </form>
                        </p>
                        <br></br>

                    </div>
                </div>
            </div>


        </div>
             // <div className="row">
            //     <div className="column side">
            //         <h2>List</h2>
            //         <div></div>
            //     </div>
            //     <div className="column side1">

            //         <div id="chat-page" className="hidden">
            //             <div className="chat-container">
            //                 <div className="chat-header">
            //                     <h2>WebSocket Chat Application</h2>
            //                 </div>

            //                 <div className="connecting">

            //                     Connecting...
            //                     </div>
            //                 <ul id="messageArea">

            //                 </ul>
            //                 <form id="messageForm" name="messageForm">
            //                     <div className="form-group">
            //                         <div className="input-group clearfix">
            //                             <input type="text" id="message" name="message" placeholder="Type a message..." autoComplete="off" className="form-control" value={this.state.message} onChange={this.handleInputChange} />
            //                             {/* <button type="submit" class="primary">Send</button> */}
            //                             <Button variant="contained" color="primary" component="span" className="button" onClick={this.sendMessage} >
            //                                 Send
            //                                 </Button>
            //                         </div>
            //                     </div>
            //                 </form>

            //                 <br></br>

            //             </div>
            //         </div>
            //     </div>


            // </div>

        );
    }
}

export default Nextpage;