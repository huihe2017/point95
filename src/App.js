import React, { Component } from 'react';
import configureStore from './store/configureStore' 
import createRouter from './routes'
import { Provider } from 'react-redux';
import '../node_modules/antd/dist/antd.min.css';
import './common.css';


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


export default App;
