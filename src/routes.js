import React from 'react'
import {Route, Router,IndexRoute, hashHistory} from 'react-router'
import Home from './containers/home/'


import PartnerReg from './containers/partnerReg/'
import UserCenter from './containers/userCenter/'
import Log from './components/header/components/loginBox/'
import Reg from './components/header/components/registerBox/'
import DolphinSchool from './containers/dolphinSchool/'
import AboutUs from './containers/aboutUs/'
import MT4Download from './containers/MT4Download/'
import ProductDeal from './containers/productDeal/'
import PartnerEntry from './containers/partnerEntry/'

export default () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={Home}/>
            <Route path="/partnerReg" component={PartnerReg}/>
            <Route path="/userCenter" component={UserCenter}/>
            <Route path="/log" component={Log}/>
            <Route path="/reg" component={Reg}/>
            <Route path="/aboutUs" component={AboutUs}/>
            <Route path="/DolphinSchool" component={DolphinSchool}/>
            <Route path="/MT4Download" component={MT4Download}/>
            <Route path="/ProductDeal" component={ProductDeal}/>
            <Route path="/partnerEntry" component={PartnerEntry}/>
        </Router>
    )
}