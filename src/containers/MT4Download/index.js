import React from 'react';
import style from "./index.css"
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import Title from '../../components/title'
import ContentList from '../../components/contentList'
import { Button } from 'antd'
import Header from '../../components/header'
import Footer from '../../components/footer'
import ToolBar from '../../components/toolBar'
import Crumb from '../../components/crumbs'

let data= [
    {
        title:'Meta Trader4：',
        content:['海豚汇为您免费提供由迈达克公司研发的交易软件Meta Trader 4。MT4是全球最流行的交易软件，在行业内享有领导地位，为交易者提供24小时即时货币报价，让您随时掌握报价行情。','MT4提供几十种系统默认的技术指标，投资者亦可指定或加入自己的技术指标，配合完善的高级图标分析工具，对行情走势进行分析，有效的帮助投资者进行投资分析，并作出英明决策，掌握每一个交易时机。','海豚汇免费为您提供PC、安卓、ios多版本的MT4，随时随地连上网络即可交易。']
    }
]

class DealTerrace extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div className={style.aboutus}>
                <Header/>
                <Crumb position={[{pos:'MT4软件下载'}]}/>
                <div className={style.toolbar}>
                    <ToolBar/>
                </div>
                <div className={style.wlop}>
                    <div className={style.header}>
                        <Title content="/MT4软件下载" color="#5262ff" big={true} bold={true}/>
                    </div>
                    <div className={style.content}>
                        <ContentList data={data}/>
                        <div className={style.pc}>
                            <div className={style.title}>
                                <span>电脑版MT4下载：</span>
                            </div>
                            <div className={style.pcdown}>
                                <img src={require('./images/pcDownload.png')} alt=""/>
                                <div className={style.but}>
                                    <Button
                                        type="primary"
                                        ghost icon="windows"
                                        className={style.butt}
                                        style={{width: '220', height: '60', fontSize: '22'}}
                                        onClick={() => {
                                            window.location.href = 'http://ucml.oss-cn-shanghai.aliyuncs.com/downloads/market4setup.exe'
                                        }}
                                    >
                                        &nbsp;windows下载
                                    </Button>
                                </div>


                            </div>
                        </div>
                        <div className={style.mobile}>
                            <div className={style.title}>
                                <span>手机版MT4下载：</span>
                            </div>
                            <span className={style.mobiletitle}>温馨提示：目前Android版本只支持浏览器扫描器下载，以此造成的不便，请谅解</span>
                            <div className={style.mobiledown}>
                                <div className={style.iosdown}>
                                <span className={style.mtitlet}>
                                    扫一扫
                                </span>
                                    <span className={style.mtitleb}>
                                    iOS版本下载
                                </span>
                                    <div className={style.iosqcoad}>
                                        <img src={require('./images/ios.png')} alt=""/>
                                    </div>
                                </div>
                                <div className={style.andrioddown}>
                                <span className={style.mtitlet}>
                                    扫一扫
                                </span>
                                    <span className={style.mtitleb}>
                                    Android版本下载
                                </span>
                                    <div className={style.iosqcoad}>
                                        <img src={require('./images/android.png')} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

DealTerrace = connect(mapStateToProps, mapDispatchToProps)(DealTerrace)
export default DealTerrace;