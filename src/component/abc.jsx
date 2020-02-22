import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { TextField, Button } from '@material-ui/core';
import SockJS from 'sockjs-client'
import Stomp from 'react-stomp-client'
var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');
var username=null
var stompClient=null
class abc extends Component {
 
    constructor(props){
        super(props)
        this.state={
            username:""
        }
        this.handleInputChange =this.handleInputChange.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
    }
        handlesubmit = (event)=>{
            event.preventdefault()

        }
        handleInputChange=(event)=>{
            // event.preventdefault()
             console.log(event.target.username)
             console.log(event.target.value)
            this.setState=({
                [event.target.username]:event.target.value

            }
            )
        }
        componentDidMount(){
          // this is an "echo" websocket service
          console.log('didmount')
          var sock = new SockJS('http://localhost:8080/ws');
          let stompClient = Stomp.over(sock);
  
  
          sock.onopen = function()
           {
              console.log('open socket ');
              sock.send('test');
              console.log('hiii')
          
              
          };
  
          sock.onmessage = function(e) {
              console.log('message');
              console.log('message', e.data);
              sock.close();
          };
  
          sock.onclose = function() {
              console.log('close');
          };
      }
        connect(event) {
          username = document.querySelector('#name').value.trim();
      
          if(username) {
              usernamePage.classList.add('hidden');
              chatPage.classList.remove('hidden');
      
              var socket = new SockJS('/ws');
              stompClient = Stomp.over(socket);
      
              stompClient.connect({}, this.onConnected, this.onError);
          }
          event.preventDefault();
      }
      
      
     onConnected() {
          // Subscribe to the Public Topic
          stompClient.subscribe('/topic/public', this.onMessageReceived);
      
          // Tell your username to the server
          stompClient.send("/app/chat.addUser",
              {},
              JSON.stringify({sender: username, type: 'JOIN'})
          )
      
          connectingElement.classList.add('hidden');
      }
      
      
       onError(error) {
          connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
          connectingElement.style.color = 'red';
      }
      
      
       sendMessage(event) {
          var messageContent = messageInput.value.trim();
          if(messageContent && stompClient) {
              var chatMessage = {
                  sender: username,
                  content: messageInput.value,
                  type: 'CHAT'
              };
              stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
              messageInput.value = '';
          }
          event.preventDefault();
      }
      
      
       onMessageReceived(payload) {
          var message = JSON.parse(payload.body);
      
          var messageElement = document.createElement('li');
      
          if(message.type === 'JOIN') {
              messageElement.classList.add('event-message');
              message.content = message.sender + ' joined!';
          } else if (message.type === 'LEAVE') {
              messageElement.classList.add('event-message');
              message.content = message.sender + ' left!';
          } else {
              messageElement.classList.add('chat-message');
      
              var avatarElement = document.createElement('i');
              var avatarText = document.createTextNode(message.sender[0]);
              avatarElement.appendChild(avatarText);
              avatarElement.style['background-color'] =this.getAvatarColor(message.sender);
      
              messageElement.appendChild(avatarElement);
      
              var usernameElement = document.createElement('span');
              var usernameText = document.createTextNode(message.sender);
              usernameElement.appendChild(usernameText);
              messageElement.appendChild(usernameElement);
          }
      
          var textElement = document.createElement('p');
          var messageText = document.createTextNode(message.content);
          textElement.appendChild(messageText);
      
          messageElement.appendChild(textElement);
      
          messageArea.appendChild(messageElement);
          messageArea.scrollTop = messageArea.scrollHeight;
      }
      
      
    getAvatarColor(messageSender) {
          var hash = 0;
          for (var i = 0; i < messageSender.length; i++) {
              hash = 31 * hash + messageSender.charCodeAt(i);
          }
          // var index = Math.abs(hash % colors.length);
          // return this.colors[index];
      }
    
      // usernameForm.addEventListener('submit', connect, true)
      // messageForm.addEventListener('submit', sendMessage, true)


        // componentWillMount() {
        //     client.onopen = () => {
        //       console.log('WebSocket Client Connected');
        //     };
        //     client.onmessage = (message) => {
        //       console.log(message);
        //     };
        //   }
       



        render() {
          const { username} = this.state;
          return (
  
            
              // <div className="allign">
                  <div id="username-page">
                      <div></div>
                      <div class="username-page-container">
                          <h1 class="title">Type your username</h1>
                          <form id="usernameForm" name="usernameForm" onSubmit={this.handlesubmit}>
                              <div class="form-group">
                                  <input type="text" 
                                   name="username"
                                  onChange={this.handleInputChange}
                                  placeholder="Username" autocomplete="off" class="form-control"  value={this.username} />
                              </div><br></br>
  
                              <div class="form-group">
                                  {/* <Button variant="contained" color="primary" onClick={()=>this.connect(this.setState('#name'))}
                                  >Start chatting </Buttson> */}
                                     {/* <Button variant="contained" color="primary" onClick={()=>this.connect(this.setState('usernmae'))}
                                  >Start </Button> */}
                                  {/* <button onClick={()=>this.setData()}>starti</button> */}
                                  <button type="submit" class="accent username-submit" onClick={this.connect()}>Start Chatting</button>
                              </div>
                          </form>
                      </div>
                  </div> 
                      
              // </div >
          );
      }
  }
  

export default abc ;