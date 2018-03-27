import React from 'react';
import { Button, Table,  Modal,Popconfirm,Radio  } from 'antd'
import style from './index.css';
import axios from  '../../../../common/axiosConf'
import Countdown from '../../../../components/countdown/index'
import Toast from 'antd-mobile/lib/toast';
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';
import {connect} from "react-redux";

const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;

class CheckHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            previewVisible: false,
            isBase:true,
            data:[],
            data1:[],
            data2:[],
            data3:[],
            rejectData:[],
            passData:[],
            visible:false,
            visible1:false,
            value: 1,
        }
    }


    componentWillMount(){

        // if(this.props.location.pathname=='/checkUser'){
        //     this.props.yinlist()
        // }



        var that=this;
        //获取自处资料的信息
        axios.get('http://192.168.100.105:8000/auditRecord', {params:{
                token:localStorage.getItem('token')
            }})
            .then(function (response) {
                that.setState({
                    data1:response.data.result,
                    data:response.data.result
                })
                for(var i in response.data.result){
                    response.data.result[i].key=i;
                    if(response.data.result[i].applyType==2){
                        response.data.result[i].createdAt=<FormattedMessage id='basicCheck' defaultMessage='初级审核'/>
                    }else {
                        response.data.result[i].createdAt=<FormattedMessage id='advancedCheck' defaultMessage='高级审核'/>
                    }
                }
                for(var i in response.data.result){
                    response.data.result[i].key=i;
                    if(response.data.result[i].pass==2){
                        response.data.result[i].operation=<FormattedMessage id='noPass' defaultMessage='不通过'/>
                    }else {
                        response.data.result[i].operation=<FormattedMessage id='pass' defaultMessage='通过'/>
                    }
                }
                for(let i in response.data.result){
                    response.data.result[i].key=i;
                    // console.log(response.data.result[i].applyer.email);
                    response.data.result[i].email=response.data.result[i].applyer.email
                }

                for(var i in that.state.data1){
                    if(that.state.data1[i].pass==2){
                        that.setState({
                            data2:[that.state.data1[i],...that.state.data2]
                        })
                    }else if(that.state.data1[i].pass==3){
                        that.setState({
                            data3:[that.state.data1[i],...that.state.data3]
                        })
                    }
                }
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
            return <FormattedMessage id='advancedVIPOption1' defaultMessage='收入'/>
        }else if(e==2){
            return <FormattedMessage id='advancedVIPOption2' defaultMessage='投资收益'/>
        }else if(e==3){
            return <FormattedMessage id='advancedVIPOption3' defaultMessage='退休金/退休积蓄'/>
        }else if(e==4){
            return <FormattedMessage id='basicVIPOption5' defaultMessage='其它'/>
        }
    }
    onChange = (e) => {
        var that=this
        console.log(e.target.value);
        if(e.target.value==1){
            that.setState({
                value: e.target.value,
                data:that.state.data1
            },()=>{
                console.log(that.state);
            });
        }else if(e.target.value==2){
            that.setState({
                value: e.target.value,
                data:that.state.data2
            },()=>{
                console.log(that.state);
            });
        }else if(e.target.value==3){
            that.setState({
                value: e.target.value,
                data:that.state.data3
            },()=>{
                console.log(that.state);
            });
        }

    }


    render() {
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
            { title: userCheck1, dataIndex: 'nickname', key: 'nickname',width:150},

            { title: userCheck2, dataIndex: 'email', key: 'email' ,width:250},
            { title: userCheck3, dataIndex: 'createdAt', key: 'createdAt' ,width:150},
            { title: userCheck4,dataIndex: 'operation', key: 'operation',width:250},
        ];
        const {  previewImage,previewVisible  } = this.state;

        return (
            <div className={style.wlop}>
                <div className={style.radioGroup}>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>全选</Radio>
                        <Radio value={2}>未通过</Radio>
                        <Radio value={3}>已通过</Radio>
                    </RadioGroup>
                </div>

                <Table className="components-table-demo-nested"
                       columns={columns}
                       expandedRowRender={

                           record => record.pass==2?'未通过理由：'+record.reason: null
                       }
                       dataSource={this.state.data}

                />
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        auth:state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}


CheckHistory = connect(mapStateToProps, mapDispatchToProps)(CheckHistory)
export default injectIntl(CheckHistory);


