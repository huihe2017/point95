import React, { Component } from 'react';
import configureStore from './store/configureStore' 
import createRouter from './routes'
import {connect, Provider} from 'react-redux';
import '../node_modules/antd/dist/antd.min.css';
import './common.css';
import {IntlProvider} from 'react-intl';
import zh_CN from './common/zh_CN';
import en_US from './common/en_US';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en'
import {addLocaleData } from 'react-intl';



addLocaleData([...en,...zh]);

const store = configureStore(window.__initState__)
console.log(store.getState())
let state=store.getState();
console.log(state);


class App extends Component {
  render() {
    return (
        <IntlProvider locale={state.auth.isEnglish?'en':'zh'} messages={state.auth.isEnglish?en_US:zh_CN} >
            <Provider store={store} >
                {createRouter()}
            </Provider>
        </IntlProvider>
    );
  }
}



export default App;
