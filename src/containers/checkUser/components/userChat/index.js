import React from "react";
import io from 'socket.io-client'
import {Launcher} from '../../../../components/chat'
import '../../../../components/styles3'
import style from './index.css'
import SideMenu from './sideMenu'
import axios from "../../../../common/axiosConf";
import webLink from "../../../../common/webLink";

const messageHistory = [];

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList : messageHistory,
            userData:[],
            id:''
        }
    }

    componentDidMount(){
        let that=this
        let socket=io.connect("ws://192.168.100.105:8000");
        socket.on('connected',(data)=>{

            socket.emit('setAdmin',{token:localStorage.getItem('token')})
        })

        socket.on('message',(data)=>{
            // console.log('dda',this.state.userData);
            // console.log('dda',data);
            data._id=data.roomId
            let meslist={}
            this.state.userData.map((v,i)=>{
                // console.log('lplp',v);
                // console.log('lplp',this.state.id);
                // console.log('lplp',data.socketId);
                this.setState({
                    socketId:data.socketId
                })

                if(v.id._id==data.roomId){
                    meslist.id={}
                    meslist.id._id=data.roomId;
                    meslist.id.email=v.id.email;

                    meslist.messages=[...v.messages,data];

                }

                if(meslist.messages!==undefined){
                    let newUserData= this.state.userData
                    newUserData.map((v,i)=>{
                        if(v.id._id==data.roomId){
                            v.messages = meslist.messages
                        }
                    })
                    this.setState({
                        userData:newUserData,

                    })
                }



            })






            // let newarr=this.state.userData.filter((item)=>{return item.id._id!==data.roomId})
            // // console.log('null',meslist);
            // let alllist=[meslist,...newarr]
            // // console.log('dda12323',alllist);
            //
            // this.setState({
            //     userData:alllist
            // })


        })

        window.socket = socket

        axios.get(`${webLink}/roomList`, {
            params:{
                token:localStorage.getItem('token')
            }})
            .then(function (response) {
                // console.log(1111,response.data.result[0].id._id);
                that.setState({
                    userData:response.data.result,
                    id:response.data.result[0].id._id
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    _onMessageWasSent(message) {


        window.socket.emit('transfer',{roomId:this.state.id,content:message.data.text, token:localStorage.getItem('token'),role:localStorage.getItem('role'),socketId:this.state.socketId?this.state.socketId:''})

        console.log(696,message);
        console.log(696,this.state.socketId);
        console.log(696,localStorage.getItem('id'));
        let newmes={}
        newmes.content=  message.data.text;
        newmes.sender=localStorage.getItem('id');
        newmes.receiver=this.state.id;
        let mes={};
        this.state.userData.map((v,i)=> {
            if(v.id._id==this.state.id) {
                mes.id = {}
                mes.id._id = this.state.id;
                mes.id.email = this.state.email;
                mes.messages = [...v.messages, newmes];
            }
            if(mes.messages!==undefined){
                let newUserData= this.state.userData
                newUserData.map((v,i)=>{
                    if(v.id._id==this.state.id){
                        v.messages = mes.messages
                    }
                })
                this.setState({
                    userData:newUserData
                })
            }
        })
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

    ll(e){
        let arr=[]
        if(!this.state.email){

            if(e.length>0){
                // console.log(659,e[0].id.email);
                e[0].messages.map((v,i)=>{
                    arr[i]={}
                    arr[i].author=v.sender==localStorage.getItem('id')?'me':'them';
                    arr[i].type='text';
                    arr[i].data={}
                    arr[i].data.text=v.content;
                    arr[i].email=e[0].id.email;
                })
            }
        }else {
            e.map((v,i)=>{
                // console.log(9898123,v);
                //console.log(9898321,this.state.email);
                if((v.id.email?v.id.email:v)==this.state.email){
                    // console.log(98981,v);

                    v.messages.map((v,i)=>{

                        arr[i]={}
                        arr[i].author=v.sender==localStorage.getItem('id')?'me':'them';
                        arr[i].type='text';
                        arr[i].data={}
                        arr[i].data.text=v.content;
                        arr[i].email=this.state.email;
                    })

                }


            })
        }


        return arr
    }

    chatWho(e){
        //console.log('dian',e);

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
                console.log(6666,e.item.props.id);
                this.setState({
                    messageList:arr,
                    email:e.item.props.email,
                    id:e.item.props.id,
                })
            }
        })



    }


    render(){
        // console.log(999,this.state.userData);
        // console.log(111111111,this.ll());
        return(
            <div className={style.wlop}>
                <div className={style.chatList}>
                    <SideMenu userData={this.state.userData} page={this.chatWho.bind(this)} active={this.state.active}/>
                </div>
                <div className={style.chatContent}>
                    <Launcher
                        agentProfile={{

                            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                        }}
                        onMessageWasSent={this._onMessageWasSent.bind(this)}
                        messageList={this.ll(this.state.userData)}
                        showEmoji={false}
                    />
                </div>

            </div>

        );
    }

}

export default Chat;