import React from "react";
import io from 'socket.io-client'
import {Launcher} from 'react-chat-window'
import style from './index.css'
import SideMenu from './sideMenu'

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

            socket.emit('setAdmin',{token:localStorage.getItem('token')})
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

    chatWho(e){
        console.log(e);
        let datal=e.item.props.message
        let arr=[]
        datal.map((v,i)=>{
            console.log(v.content)
            arr[i]={}

            arr[i].author=v._id==localStorage.getItem('id')?'me':'them';
            arr[i].type='text';
            arr[i].data={}
            arr[i].data.text=v.content;
            console.log(e.item.props.email)
            arr[i].email=e.item.props.email;

            this.setState({
                messageList:arr
            })
        })

    }

    render(){
        return(
            <div className={style.wlop}>
                <div className={style.chatList}>
                    <SideMenu page={this.chatWho.bind(this)}/>
                </div>
                <div className={style.chatContent}>
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

            </div>

        );
    }

}

export default Chat;