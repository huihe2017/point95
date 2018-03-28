import React from "react";
import io from 'socket.io-client'
import {Launcher} from 'react-chat-window'
import style from './index.css'
import SideMenu from './sideMenu'
import axios from "../../../../common/axiosConf";

const messageHistory = [];

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList : messageHistory,
            userData:[]
        }
    }

    componentDidMount(){
        let that=this
        let socket=io.connect("ws://192.168.100.105:8000");
        socket.on('connected',(data)=>{

            socket.emit('setAdmin',{token:localStorage.getItem('token')})
        })

        socket.on('message',(data)=>{
            console.log('dda',data);
            let obj={}
            obj.author='them';
            obj.type='text';
            obj.data={}
            obj.data.text=data.content;
            obj.email=this.state.email;
            let arr=[]
            this.state.userData.map((v,i)=>{
                // console.log('lplp',v.id.email);
                // console.log('lplp',this.state);

                if(v.id.email==that.state.email){
                    let arr=[]
                    v.messages.map((v,i)=>{

                        arr[i]={}
                        arr[i].author=v._id==localStorage.getItem('id')?'me':'them';
                        arr[i].type='text';
                        arr[i].data={}
                        arr[i].data.text=v.content;
                        arr[i].email=that.state.email;
                    })
                    this.setState({
                        messageList:[...arr,obj],

                    })

                }
            })


        })

        window.socket = socket

        axios.get('http://192.168.100.105:8000/roomList', {
            params:{
                token:localStorage.getItem('token')
            }})
            .then(function (response) {
                that.setState({
                    userData:response.data.result
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    _onMessageWasSent(message) {

        window.socket.emit('transfer',{id:this.state.id,content:message.data.text, })

        // this.setState({
        //
        //
        //
        //     messageList: [...this.state.messageList, message]
        //
        //
        //
        // })
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

    ll(){
        this.state.userData.map((v,i)=>{
            let arr=[]
            if(v.id.email==this.state.email){


                v.messages.map((v,i)=>{

                    arr[i]={}
                    arr[i].author=v._id==localStorage.getItem('id')?'me':'them';
                    arr[i].type='text';
                    arr[i].data={}
                    arr[i].data.text=v.content;
                    arr[i].email=this.state.email;
                })
                console.log(654654,arr);
                return arr
            }
            console.log(654,arr);
            return arr
        })
        return
    }

    chatWho(e){
        console.log('dian',e);

        // this.ll()
        this.state.userData.map((v,i)=>{

            if(v.id.email==e.item.props.email){

                let arr=[]
                v.messages.map((v,i)=>{

                    arr[i]={}
                    arr[i].author=v._id==localStorage.getItem('id')?'me':'them';
                    arr[i].type='text';
                    arr[i].data={}
                    arr[i].data.text=v.content;
                    arr[i].email=e.item.props.email;
                })
                this.setState({
                    messageList:arr,
                    email:e.item.props.email,
                    id:e.item.props.id,
                })
            }
        })



    }

    xxx(alldata){
        alldata
        this.state.currId
        return
    }

    render(){
        console.log(999,this.state.userData);
        console.log(111111111,this.ll());
        return(
            <div className={style.wlop}>
                <div className={style.chatList}>
                    <SideMenu userData={this.state.userData} page={this.chatWho.bind(this)}/>
                </div>
                <div className={style.chatContent}>
                    <Launcher
                        agentProfile={{
                            teamName: 'react-live-chat',
                            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                        }}
                        onMessageWasSent={this._onMessageWasSent.bind(this)}
                        messageList={this.ll()}
                        showEmoji={false}
                    />
                </div>

            </div>

        );
    }

}

export default Chat;