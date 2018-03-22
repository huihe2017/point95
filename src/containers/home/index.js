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
import HomeSwiper from './homeSwiper'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showRegister} from '../../actions/auth'
import io from 'socket.io-client'
import { IntlProvider,addLocaleData,FormattedMessage } from 'react-intl';

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
    cll(){
        console.log(window.socket)
        window.socket.emit('login',{"wgweg":5511})
    }
    render() {
        return (
            <div className={style.wrap}>
                <Header/>
                <div className={style.toolbar} >
                    <ToolBar/>
                </div>
                <div className={style.header} onClick={this.cll.bind(this)}>
                    <div className={style.button}>
                        <Button onClick={this.props.showRegister} type="primary"
                                style={localStorage.getItem('token')?{width: '200', height: '60', fontSize: '24px',display:'none'}:{width: '200', height: '60', fontSize: '24px',display:'block'}} ><FormattedMessage id='registerNow' defaultMessage='立即注册'/></Button>
                    </div>
                    <div style={{width: 420, top: 67, position: 'absolute', right: 0}} hidden={true}><PageTable/></div>
                </div>
                <div className="section">
                    <div className={style.superiority}>
                        <div className={style.suptitle}>
                            <FormattedMessage id='ourAdvantages' defaultMessage='我们的优势'/>
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
                        <HomeSwiper/>
                    </div>
                    <div className={style.vision}>
                        <div className={style.viscontent}>
                            <p className={style.vistitle}>
                                <FormattedMessage id='ourVision' defaultMessage='我们的愿景'/>
                            </p>
                            <p className={style.visdtitle}>
                                Our vision
                            </p>
                            <p className={style.visder}>
                                我们专注于通过交易和投资策略来产生绝对回报，<br/>
                                我们寻求利用机会，利用我们的最先进的专有技术和风险管理能力和经验
                            </p><p className={style.visdder}>
                            By leveraging extensive experience in risk management and trading strategies, in addition to having a state-of-the-art proprietary technology
                            <br/> and deep pools of liquidity, OSL offers high value, large volume block trades of Digital Assets while ensuring competitive pricing and premium
                            <br/>service.

                        </p>
                        </div>

                    </div>
                    <div className={style.conus}>
                        <p className={style.contitle}>
                            <FormattedMessage id='contactUsTitle' defaultMessage='联络我们'/>
                        </p>
                        <p className={style.condtitle}>
                            contact us
                        </p>
                        <div className={style.concontent}>
                            <img src={require('./images/userbg.png')} alt=""/>
                            info@point95global.com
                        </div>
                    </div>
                    {this.state.showQcode ? <Qcode path={this.state.QcodePath} onClose={()=>{this.setState({showQcode:false})}} /> : ''}
                </div>
                <Footer/>

            </div>
        )
    }
}

function mapStateToProps(state, props) {

}

function mapDispatchToProps(dispatch) {
    return {
        showRegister: bindActionCreators(showRegister, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home