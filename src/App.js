import React, { Component } from 'react';
import configureStore from './store/configureStore' 
import CreateRouter from './routes'
import {connect, Provider} from 'react-redux';
import '../node_modules/antd/dist/antd.min.css';
import './common.css';
import {IntlProvider} from 'react-intl';
import zh_CN from './common/zh_CN';
import en_US from './common/en_US';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en'
import {addLocaleData } from 'react-intl';
import IntlProviderWrap from './intlProviderWrap';


addLocaleData([...en,...zh]);

const store = configureStore(window.__initState__)
// console.log(store.getState())
let state=store.getState();
// console.log(state);


class App extends Component {
  render() {
    return (
            <Provider store={store} >

                <CreateRouter></CreateRouter>

            </Provider>
    );
  }
}



export default App;
