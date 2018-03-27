import React from "react";
import io from 'socket.io-client'
import {Launcher} from 'react-chat-window'
import style from './index.css'

const messageHistory = [




];

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList : messageHistory
        }
    }

    componentDidMount(){
        let socket=io.connect("ws://192.168.100.105:8000");
        socket.on('connected',(data)=>{
            console.log(4444444555555)
            socket.emit('setAdmin',{name:55})
        })

        socket.on('message',(data)=>{
            console.log('message');
            //this.props.shenList()
        })

        window.socket = socket
    }

    _onMessageWasSent(message) {

        window.socket.emit('transfer',{name:55})
        // console.log(111);

        this.setState({
            messageList: [...this.state.messageList, message]
        })
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }
    }

    render(){
        return(
            <div className={style.wlop}>
                <Launcher
                    agentProfile={{
                        teamName: 'react-live-chat',
                        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                    }}
                    onMessageWasSent={this._onMessageWasSent.bind(this)}
                    messageList={this.state.messageList}
                    showEmoji
                />
            </div>

        );
    }

}

export default Chat;