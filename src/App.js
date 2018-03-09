import React, { Component } from 'react';
import configureStore from './store/configureStore' 
import createRouter from './routes'
import { Provider } from 'react-redux';
import '../node_modules/antd/dist/antd.min.css';
import './common.css';
import io from 'socket.io-client'


const store = configureStore(window.__initState__)
console.log(store.getState())


class App extends Component {
  render() {
    return (
		<Provider store={store} >
		    {createRouter()}
	    </Provider>
    );
  }
}

var socket=io.connect("ws://192.168.100.105:8000",{withCredentials:''});
//通知用户有用户登录
// socket.on('getData',(data)=>{
//     // console.log(data)
//     // console.log(this.state.btcPlatformData)
//     //
//
//     data.time=data.time.substr(11,5);
//     let btcPlatformData = this.state.btcPlatformData
//     if(btcPlatformData.length>100){
//         btcPlatformData.shift()
//     }
//     let newData = btcPlatformData.concat()
//     newData.push(data)
//     // this.setState({btcPlatformData})
//     //data.time=data.time.substr(11,5);
//     // console.log(this.state.btcPlatformData.push(data))
//     this.setState({btcPlatformData:newData})
// })
window.socket = socket
export default App;
