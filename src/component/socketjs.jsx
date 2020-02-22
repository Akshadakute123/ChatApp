import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { TextField, Button } from '@material-ui/core';
import SockJS from 'sockjs-client'

class socketjs extends Component {
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
        // componentWillMount() {
        //     client.onopen = () => {
        //       console.log('WebSocket Client Connected');
        //     };
        //     client.onmessage = (message) => {
        //       console.log(message);
        //     };
        //   }
        componentDidMount(){
            // this is an "echo" websocket service
            console.log('didmount')
            var sock = new SockJS('http://localhost:8080/ws');
    
    
            sock.onopen = function()
             {
                console.log('open socket ');
                sock.send('test');
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
    render() {
        const{username} = this.state;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                    </Toolbar>
                </AppBar>
                <div className="username-page">
                    <div className="username-page-container">
                        <h1 className="title">Type your username</h1>
                        <form id="usernameForm" name="usernameForm" onSubmit={this.handlesubmit}>
                            <div className="form-group">
                                <TextField id="standard-basic" label="Username"  name="username" onChange={this.handleInputChange}/>
                                {/* <input type="text" id="name" placeholder="Username" autocomplete="off" class="form-control" /> */}
                            </div>
                            <div className="form-group">
                                <Button variant="contained" color="primary" component="span"  >
                                    Start Chatting
                                </Button>
                                {/* <button type="submit" class="accent username-submit">Start Chatting</button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default socketjs ;