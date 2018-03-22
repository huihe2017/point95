import React from 'react';
import style from "./index.css"
import { Button, Table, Icon,Upload,Badge, Menu, Dropdown, Modal,Popconfirm,LocaleProvider } from 'antd'
import {browserHistory,hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import ContentList from '../../components/contentList'
import Header from '../../components/header'
import Footer from '../../components/footer'
import ToolBar from '../../components/toolBar'
import Crumb from '../../components/crumbs'
import axios from  '../../common/axiosConf';
import {showLogin,shenList,yinlist} from '../../actions/auth'
import {bindActionCreators} from 'redux'
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';


const ButtonGroup = Button.Group;

class PartnerEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            previewVisible: false,
            isBase:true,
            data:[],
            visible:false,
            visible1:false,

        }
    }

    componentWillMount(){

        if(this.props.location.pathname=='/checkUser'){
            this.props.yinlist()
        }



        var that=this;
        //获取自处资料的信息
        axios.get('http://192.168.100.105:8000/verifyList', {params:{
            token:localStorage.getItem('token')
        }})
            .then(function (response) {
            // console.log(response.data.result);
            for(var i in response.data.result){
                response.data.result[i].key=i;
                if(response.data.result[i].primaryCertified==1){
                    response.data.result[i].createdAt=<FormattedMessage id='basicCheck' defaultMessage='初级审核'/>
                }else if(response.data.result[i].seniorCertified==1){
                    response.data.result[i].createdAt=<FormattedMessage id='advancedCheck' defaultMessage='高级审核'/>
                }
            }

            that.setState({
                data:response.data.result
            })
        })
            .catch(function (error) {
            console.log(error);
        })

    }

    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handlec = (e) => {
        //console.log(e);
        this.setState({
            visible: false,
        });
    }
    handlec1 = (e) => {
        //console.log(e);
        this.setState({
            visible1: false,
        });
    }

    tong(e,i){
        var that=this;
        console.log(this.state.data[i])
        if(this.state.data["0"].primaryCertified==1){
            axios.post('http://192.168.100.105:8000/primaryVerify',
                {
                    email:this.state.data[i].email,
                    token:localStorage.getItem('token'),
                    primaryCertified:e
                })
                .then(function (response) {
                    console.log(response)
                    that.setState({
                        data: that.state.data.filter((_, a) => a !== i)
                    })
                })
                .catch(function (error) {
                    console.log(error)
                });
        }else if(this.state.data["0"].seniorCertified==1){
            axios.post('http://192.168.100.105:8000/seniorVerify',
                {
                    email:this.state.data[i].email,
                    token:localStorage.getItem('token'),
                    seniorCertified:e
                })
                .then(function (response) {
                    console.log(response);
                    that.setState({
                        data: that.state.data.filter((_, a) => a !== i)

                    })
                })
                .catch(function (error) {
                    console.log(error)
                });
        }

    }
    cli(e){
        this.setState({
            visible: true,
        });
        //console.log(e);
    }
    cli1(e){
        this.setState({
            visible1: true,
        });
        //console.log(e);
    }
    fore(a){
        return(
            <div className={style.imgshow}>
                <div className={style.imgl}>
                    <p><span><FormattedMessage id='basicVIPTip13' defaultMessage='姓名'/>：</span>{a.realName}</p>
                    <p><span><FormattedMessage id='basicVIPTip12' defaultMessage='身份证号'/>：</span>{a.ID}</p>
                    <p><span><FormattedMessage id='basicVIPTip14' defaultMessage='住址'/>：</span>{a.address}</p>
                    <p>
                        <span><FormattedMessage id='checkTip1' defaultMessage='就业情况'/>：</span>{this.showjob(a.employStatu)}
                    </p>
                    <p><span><FormattedMessage id='checkTip2' defaultMessage='是否为代购'/>：</span>{a.thirdParty==1?<FormattedMessage id='yes' defaultMessage='是'/>:<FormattedMessage id='no' defaultMessage='否'/>}</p>
                </div>
                <div className={style.imgr}>
                    <p><FormattedMessage id='checkTip3' defaultMessage='身份证正面照'/>：</p>
                    <img onClick={this.cli.bind(this,a.backCard)} src={a.backCard} alt=""/>
                    <Modal
                        style={{position:'relative'}}
                        visible={this.state.visible}
                        onCancel={this.handlec}
                    >
                        <img className={style.bi} src={a.backCard} alt=""/>
                    </Modal>
                    <p><FormattedMessage id='checkTip4' defaultMessage='身份证反面照'/>：</p>
                    <img onClick={this.cli1.bind(this,a.frontCard)} src={a.frontCard} alt=""/>
                    <Modal
                        style={{position:'relative'}}
                        visible={this.state.visible1}
                        onCancel={this.handlec1}
                    >
                        <img className={style.bi} src={a.frontCard} alt=""/>
                    </Modal>
                </div>

            </div>
        )

    }
    fore1(a){
        console.log(222,a)
        return(
            <div className={style.imgshow}>
                <div className={style.imgl}>
                    <p><span><FormattedMessage id='advancedVIPTip8' defaultMessage='护照号码'/>：</span>{a.passportNo}</p>
                    <p><span><FormattedMessage id='checkTip6' defaultMessage='护照到期'/>：</span>{a.passportTime}</p>
                    <p><span><FormattedMessage id='advancedVIPTip10' defaultMessage='净值'/>：</span>{a.netYearIncome}</p>
                    <p><span><FormattedMessage id='advancedVIPTip9' defaultMessage='预期年收入'/>：</span>{a.yearIncome}</p>
                    <p><span><FormattedMessage id='checkTip5' defaultMessage='资金来源'/>：</span>{this.showmony(a.fundsSource)}</p>
                </div>
                <div className={style.imgr}>
                    <p><FormattedMessage id='checkTip7' defaultMessage='护照'/>：</p>
                    <img onClick={this.cli.bind(this,a.passport)} src={a.passport} alt=""/>
                    <Modal
                        style={{position:'relative'}}
                        visible={this.state.visible}
                        onCancel={this.handlec}
                    >
                        <img className={style.bi} src={a.passport} alt=""/>
                    </Modal>
                </div>
            </div>)
    }

    showjob(e){
        if(e==1){
            return <FormattedMessage id='basicVIPOption1' defaultMessage='工作中'/>
        }else if(e==2){
            return <FormattedMessage id='basicVIPOption2' defaultMessage='学生'/>
        }else if(e==3){
            return <FormattedMessage id='basicVIPOption3' defaultMessage='失业'/>
        }else if(e==4){
            return <FormattedMessage id='basicVIPOption4' defaultMessage='退休'/>
        }else if(e==5){
            return <FormattedMessage id='basicVIPOption5' defaultMessage='其它'/>
        }
    }
    showmony(e){
        if(e==1){
            return <FormattedMessage id='advancedVIPOption1' defaultMessage='其它'/>
        }else if(e==2){
            return <FormattedMessage id='advancedVIPOption2' defaultMessage='其它'/>
        }else if(e==3){
            return <FormattedMessage id='advancedVIPOption3' defaultMessage='其它'/>
        }else if(e==4){
            return <FormattedMessage id='basicVIPOption5' defaultMessage='其它'/>
        }
    }

    render() {
        if (!localStorage.getItem('token')) {
            this.props.showLogin({}, (errorText) => {
                if (errorText) {
                } else {
                    hashHistory.push('/')
                }
            })
            return null
        }
        const { intl: { formatMessage } } = this.props
        const userCheck1 = formatMessage({id:'userCheck1'});
        const userCheck2 = formatMessage({id:'userCheck2'});
        const userCheck3 = formatMessage({id:'userCheck3'});
        const userCheck4 = formatMessage({id:'userCheck4'});
        const pass = formatMessage({id:'pass'});
        const noPass = formatMessage({id:'noPass'});
        const yes = formatMessage({id:'yes'});
        const no = formatMessage({id:'no'});
        const isSure = formatMessage({id:'isSure'});
        const basicCheck = formatMessage({id:'basicCheck'});
        const advancedCheck = formatMessage({id:'advancedCheck'});
        const userCheck = formatMessage({id:'userCheck'});

        const columns = [
            { title: userCheck1, dataIndex: 'nickname', key: 'nickname' },

            { title: userCheck2, dataIndex: 'email', key: 'email' },
            { title: userCheck3, dataIndex: 'createdAt', key: 'createdAt' },
            { title: userCheck4, key: 'operation', render: (a,b,c) => <ButtonGroup >
                <Popconfirm title={isSure} onConfirm={this.tong.bind(this,3,c)}  okText={yes} cancelText={no}>
                    <Button>{pass}</Button>
                </Popconfirm>

                <Button onClick={this.tong.bind(this,2,c)}>{noPass}</Button>
            </ButtonGroup> },
        ];
        const {  previewImage,previewVisible  } = this.state;
        return (

                <div className={style.partnerEntry}>
                    <Header/>
                    <Crumb position={[{pos:userCheck}]}/>
                    <div className={style.toolbar}>
                        <ToolBar/>
                    </div>
                    <div className={style.wlop}>
                        <Table className="components-table-demo-nested"
                            columns={columns}
                            expandedRowRender={
                                record => record.primaryCertified==1?this.fore(record):this.fore1(record)
                            }
                            dataSource={this.state.data}
                        />
                    </div>
                    <Footer/>
                </div>

        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user,
        auth:state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showLogin: bindActionCreators(showLogin, dispatch),
        shenList: bindActionCreators(shenList, dispatch),
        yinlist: bindActionCreators(yinlist, dispatch),
    }
}

PartnerEntry = connect(mapStateToProps, mapDispatchToProps)(PartnerEntry);
export default injectIntl(PartnerEntry);