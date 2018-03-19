import React from 'react';
import style from "./index.css"
import { Button, Table, Icon,Upload,Badge, Menu, Dropdown, Modal,Popconfirm} from 'antd'
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

const ButtonGroup = Button.Group;



const data = [
    {
        key: 1,
        nickname: 'Sakura',
        phone: 23,
        createdAt: '初级审核',
        frontCard:"https://wx2.sinaimg.cn/mw1024/6b8c14f8gy1forofhihkwj218q0s0n50.jpg",
        backCard:"https://wx3.sinaimg.cn/mw1024/6b8c14f8gy1fop2xf8jysj21b00w4afj.jpg"
        ,
        handCard:"https://wx3.sinaimg.cn/mw1024/6b8c14f8gy1fop2xf8jysj21b00w4afj.jpg"
    }
];

class PartnerEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            previewVisible: false,
            isBase:true,
            data:[],
            visible:false,
            visible1:false
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
                    response.data.result[i].createdAt='初级审核'
                }else if(response.data.result[i].seniorCertified==1){
                    response.data.result[i].createdAt='高级审核'
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
        console.log(111,a)
        return(
            <div className={style.imgshow}>
                <div className={style.imgl}>
                    <p><span>姓名：</span>{a.realName}</p>
                    <p><span>身份证号码：</span>{a.ID}</p>
                    <p><span>地址：</span>{a.address}</p>
                    <p>
                        <span>就业情况：</span>{this.showjob(a.employStatu)}
                    </p>
                    <p><span>是否代购：</span>{a.thirdParty==1?'是':'否'}</p>
                </div>
                <div className={style.imgr}>
                    <p>身份证正面照：</p>
                    <img onClick={this.cli.bind(this,a.backCard)} src={a.backCard} alt=""/>
                    <Modal
                        style={{position:'relative'}}
                        visible={this.state.visible}
                        onCancel={this.handlec}
                    >
                        <img className={style.bi} src={a.backCard} alt=""/>
                    </Modal>
                    <p>身份证反面照：</p>
                    <img onClick={this.cli1.bind(this,a.frontCard)} src={a.frontCard} alt=""/>
                    <Modal
                        style={{position:'relative'}}
                        visible={this.state.visible1}
                        onCancel={this.handlec1}
                    >
                        <img className={style.bi} src={a.frontCard} alt=""/>
                    </Modal>
                </div>

            </div>)

    }
    fore1(a){
        console.log(222,a)
        return(
            <div className={style.imgshow}>
                <div className={style.imgl}>
                    <p><span>护照号码：</span>{a.passportNo}</p>
                    <p><span>护照到期：</span>{a.passportTime}</p>
                    <p><span>年净值：</span>{a.netYearIncome}</p>
                    <p><span>年收入：</span>{a.yearIncome}</p>
                    <p><span>资金来源：</span>{this.showmony(a.fundsSource)}</p>
                </div>
                <div className={style.imgr}>
                    <p>护照：</p>
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
            return '工作中'
        }else if(e==2){
            return '学生'
        }else if(e==3){
            return '失业'
        }else if(e==4){
            return '退休'
        }else if(e==5){
            return '其他'
        }
    }
    showmony(e){
        if(e==1){
            return '收入'
        }else if(e==2){
            return '投资收益'
        }else if(e==3){
            return '退休金/退休积蓄'
        }else if(e==4){
            return '其他'
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
        const columns = [
            { title: '昵称', dataIndex: 'nickname', key: 'nickname' },

            { title: '账号', dataIndex: 'email', key: 'email' },

            { title: '审核等级', dataIndex: 'createdAt', key: 'createdAt' },
            { title: '审核操作', key: 'operation', render: (a,b,c) => <ButtonGroup >
                <Popconfirm title="是否确认通过审核？" onConfirm={this.tong.bind(this,3,c)}  okText="Yes" cancelText="No">
                    <Button>通过</Button>
                </Popconfirm>

                <Button onClick={this.tong.bind(this,2,c)}>不通过</Button>
            </ButtonGroup> },
        ];
        const {  previewImage,previewVisible  } = this.state;
        return (
            <div className={style.partnerEntry}>
                <Header/>
                <Crumb position={[{pos:'用户审核'}]}/>
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
        user: state.user
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
export default PartnerEntry;