import React from 'react';
import {connect} from 'react-redux'
import {IntlProvider} from 'react-intl';

import zh_CN from './common/zh_CN';
import en_US from './common/en_US';

class IntlProviderWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <IntlProvider locale={'zh'} messages={true?en_US:zh_CN} >

            </IntlProvider>

        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user,
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

 IntlProviderWrap = connect(mapStateToProps, mapDispatchToProps)(IntlProviderWrap)
export default IntlProviderWrap;