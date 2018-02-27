import React from 'react'
import style from './index.css'
import {Button} from 'antd';
import Header from '../../components/header'
import Footer from '../../components/footer'
import SideBar from '../../components/header/components/sideBar'
import ToolBar from '../../components/toolBar'
import {hashHistory} from 'react-router'
import PageTable from './components/pageTable'
import Qcode from '../../components/Qcode'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            showQcode: false,
            QcodePath: ''
        }
    }

    speedAccound() {
        hashHistory.push('/auth')
    }

    render() {
        return (
            <div className={style.wrap}>
                <Header/>
                <div className={style.toolbar} >
                    <ToolBar/>
                </div>
                <div className={style.header}>
                    <div className={style.button}>
                        <Button type="primary" style={{
                            width: '200',
                            height: '60',
                            fontSize: '24px'
                        }}>立即注册</Button>
                    </div>
                    <div style={{width: 420, top: 67, position: 'absolute', right: 0}} hidden={true}><PageTable/></div>
                </div>
                <div className="section">
                    <div className={style.superiority}>
                        <div className={style.suptitle}>
                            我们的优势
                            <p className={style.supdtitle}>
                                Our advantages
                            </p>
                        </div>
                        <div className={style.supcontent}>
                            <div className={style.supimg}>
                                <img src={require('./images/biandian1.png')} alt=""/>
                            </div>
                            <p className={style.supcontent1}>
                                我们结合了超过25年的金融行业经验与市场洞察力，
                                关系网络，交易敏锐，以及复杂的交易策略
                            </p>
                            <p className={style.supcontent2}>
                                The OSL team is led by industry veterans with comprehensive knowledge on Digital Assets and financial trading. The team is well structured with expertise in trading, infrastructure, onboarding support and security acumen, substantiating our position as the leading OTC trading desk for cryptocurrencies.
                            </p>
                        </div>
                    </div>
                    <div className={style.mt4}>
                        <div className={style.mt4title}>
                            MT4交易终端下载
                        </div>
                        <div className={style.mt4download}>
                            <a href="javascript:void (0);" className={style.mt4bg}>
                            </a>
                            <div className={style.downloadlist}>
                                <Button ghost icon="windows"
                                        style={{width: '220', height: '60', fontSize: '20', marginBottom: '30'}}
                                        onClick={() => {
                                            window.location.href = 'http://ucml.oss-cn-shanghai.aliyuncs.com/downloads/market4setup.exe'
                                        }}
                                >
                                    &nbsp;
                                    windows下载
                                </Button>
                                <Button
                                    ghost
                                    icon="apple"
                                    style={{
                                        width: '220',
                                        height: '60',
                                        fontSize: '20',
                                        marginBottom: '30'
                                    }}
                                    onClick={() => {
                                        this.setState({showQcode: true})
                                        this.setState({QcodePath: 'ios'})
                                    }}
                                >
                                    &nbsp;&nbsp;&nbsp;&nbsp;iOS下载&nbsp;&nbsp;&nbsp;&nbsp;
                                </Button>
                                <Button
                                    ghost
                                    icon="android"
                                    style={{width: '220', height: '60', fontSize: '20'}}
                                    onClick={() => {
                                        this.setState({showQcode: true})
                                        this.setState({QcodePath: 'android'})
                                    }}
                                >
                                    &nbsp;
                                    Android下载
                                </Button>

                            </div>
                        </div>
                    </div>
                    <div className={style.partner}>
                        <div className={style.partnercon}>
                            <div className={style.pctitle}>
                                合作伙伴 /
                            </div>
                            <div className={style.pccontent}>
                                <div className={style.buddy}>
                                    <img src={require('./images/WEB-02.png')} alt=""/>

                                </div>
                                <div className={style.buddy}>
                                    <img src={require('./images/WEB-03.png')} alt=""/>

                                </div>
                                <div className={style.buddy}>
                                    <img src={require('./images/WEB-04.png')} alt=""/>

                                </div>
                                <div className={style.buddy}>
                                    <img src={require('./images/WEB-05.png')} alt=""/>

                                </div>
                                <div className={style.buddy}>
                                    <img src={require('./images/WEB-06.png')} alt=""/>

                                </div>
                                <div className={style.buddy}>
                                    <img src={require('./images/WEB-07.png')} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.showQcode ? <Qcode path={this.state.QcodePath} onClose={()=>{this.setState({showQcode:false})}} /> : ''}
                </div>
                <Footer/>
            </div>
        )
    }
}


export default Home